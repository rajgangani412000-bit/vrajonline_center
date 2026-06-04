import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { business, servicesSeed } from "@/lib/seed-data";
import { rateLimit } from "@/lib/security/rate-limit";
import { enquirySchema } from "@/lib/validation";

function answerQuestion(question: string) {
  const normalized = question.toLowerCase();
  const service = servicesSeed.find((item) =>
    [item.name, item.slug, item.category].some((value) => normalized.includes(value.toLowerCase()))
  );

  if (normalized.includes("contact") || normalized.includes("whatsapp") || normalized.includes("phone")) {
    return `You can call Vraj Online Center at ${business.phone} or WhatsApp at https://wa.me/${business.whatsapp}. We are located at ${business.location}.`;
  }

  if (service) {
    return `${service.name}: ${service.description} Charges start at Rs. ${service.charges}. Required documents: ${service.documents.join(", ")}. Processing time: ${service.processingTime}. For quick help, WhatsApp us at https://wa.me/${business.whatsapp}.`;
  }

  return `Vraj Online Assistant can help with Aadhaar, PAN Card, Voter ID, Ayushman Card, certificates, admissions, job forms, PVC printing, xerox, printing, and scanning. Share your service name and mobile number, or WhatsApp ${business.phone} for direct guidance.`;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  const limited = rateLimit(`chat:${ip}`, 30, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many messages. Please try again soon." }, { status: 429 });
  }

  const body = await request.json();
  const question = String(body.question || "");
  const answer = answerQuestion(question);

  if (body.name && body.mobile) {
    const parsed = enquirySchema.safeParse({
      name: body.name,
      mobile: body.mobile,
      question,
      service: body.service
    });
    if (parsed.success) {
      await prisma.enquiry.create({ data: parsed.data });
    }
  }

  return NextResponse.json({ answer });
}
