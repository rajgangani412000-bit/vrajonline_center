import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { uploadToCloudinary } from "@/lib/storage/cloudinary";
import { rateLimit } from "@/lib/security/rate-limit";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const limited = rateLimit(`upload:${session.user.id}`, 10, 60_000);
  if (!limited.ok) return NextResponse.json({ error: "Too many uploads." }, { status: 429 });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  const uploaded = await uploadToCloudinary(file);
  return NextResponse.json({
    url: uploaded.secure_url,
    publicId: uploaded.public_id,
    width: uploaded.width,
    height: uploaded.height
  });
}
