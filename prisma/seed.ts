import { PrismaClient, Role, BlogStatus, CustomerStatus, PaymentMethod, ExpenseCategory, PvcStatus, ReminderType, ApplicationStep } from "@prisma/client";
import bcrypt from "bcryptjs";
import { servicesSeed, blogSeed } from "../lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  const owner = await prisma.user.upsert({
    where: { email: "admin@vrajonlinecenter.in" },
    update: {},
    create: {
      name: "Vraj Online Center Owner",
      email: "admin@vrajonlinecenter.in",
      passwordHash: await bcrypt.hash("Admin@123456", 12),
      role: Role.OWNER,
      forcePasswordChange: true
    }
  });

  const createdServices = new Map<string, string>();
  for (const item of servicesSeed) {
    const service = await prisma.service.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        description: item.description,
        charges: item.charges,
        documents: [...item.documents],
        processingTime: item.processingTime,
        category: item.category
      },
      create: {
        ...item,
        documents: [...item.documents]
      }
    });
    createdServices.set(service.slug, service.id);
  }

  const panServiceId = createdServices.get("pan-card");
  const pvcServiceId = createdServices.get("pvc-card-printing");
  if (!panServiceId || !pvcServiceId) {
    throw new Error("Required seed services were not created.");
  }

  const customer = await prisma.customer.upsert({
    where: { customerCode: "VOC-0001" },
    update: {},
    create: {
      customerCode: "VOC-0001",
      name: "Ramesh Patel",
      mobile: "9876543210",
      address: "Tarsadi, Kosamba, Gujarat",
      documents: ["Aadhaar Card", "Photo", "Mobile Number"],
      notes: "PAN correction application with follow-up required.",
      followUpDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      status: CustomerStatus.IN_PROCESS,
      serviceId: panServiceId,
      createdById: owner.id
    }
  });

  const application = await prisma.serviceApplication.upsert({
    where: { applicationNo: "APP-0001" },
    update: {},
    create: {
      applicationNo: "APP-0001",
      customerId: customer.id,
      serviceId: panServiceId,
      currentStep: ApplicationStep.PROCESSING,
      status: CustomerStatus.IN_PROCESS,
      notes: "Application submitted through official portal.",
      timeline: {
        create: [
          { step: ApplicationStep.SUBMITTED, note: "Documents verified and form submitted." },
          { step: ApplicationStep.PROCESSING, note: "Awaiting department approval." }
        ]
      }
    }
  });

  await prisma.payment.upsert({
    where: { id: "seed-payment-1" },
    update: {},
    create: {
      id: "seed-payment-1",
      customerId: customer.id,
      serviceId: panServiceId,
      amount: 150,
      method: PaymentMethod.UPI,
      notes: "PAN card service charge."
    }
  });

  await prisma.expense.upsert({
    where: { id: "seed-expense-1" },
    update: {},
    create: {
      id: "seed-expense-1",
      category: ExpenseCategory.INTERNET,
      amount: 900,
      vendor: "Broadband Provider",
      notes: "Monthly internet bill."
    }
  });

  await prisma.pvcOrder.upsert({
    where: { orderNo: "PVC-0001" },
    update: {},
    create: {
      orderNo: "PVC-0001",
      customerId: customer.id,
      cardType: "Ayushman PVC Card",
      status: PvcStatus.PRINT_QUEUE,
      quantity: 2,
      notes: `Linked to application ${application.applicationNo}.`
    }
  });

  await prisma.reminder.upsert({
    where: { id: "seed-reminder-1" },
    update: {},
    create: {
      id: "seed-reminder-1",
      customerId: customer.id,
      type: ReminderType.DOCUMENT_COLLECTION,
      title: "Collect signed PAN declaration",
      dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      notes: "Call customer before evening."
    }
  });

  for (const post of blogSeed) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        ...post,
        tags: [...post.tags]
      },
      create: {
        ...post,
        tags: [...post.tags],
        status: BlogStatus.PUBLISHED,
        publishedAt: new Date(),
        authorId: owner.id
      }
    });
  }

  await prisma.systemSetting.upsert({
    where: { key: "businessProfile" },
    update: {},
    create: {
      key: "businessProfile",
      value: {
        name: "Vraj Online Center",
        phone: "7874467775",
        location: "Tarsadi, Kosamba, Gujarat, India",
        whatsapp: "917874467775"
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
