"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { enquirySchema } from "@/lib/validation";

export async function createEnquiryAction(formData: FormData) {
  const parsed = enquirySchema.parse({
    name: formData.get("name"),
    mobile: formData.get("mobile"),
    question: formData.get("question"),
    service: formData.get("service") || undefined
  });

  await prisma.enquiry.create({
    data: {
      ...parsed,
      source: "CONTACT_FORM"
    }
  });

  revalidatePath("/dashboard");
}
