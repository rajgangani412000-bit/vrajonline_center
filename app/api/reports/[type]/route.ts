import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { makeCsv, makePdfReport } from "@/lib/reports";
import { auth } from "@/auth";

async function getRows(type: string) {
  if (type === "customers") {
    const rows = await prisma.customer.findMany({
      include: { service: true },
      orderBy: { createdAt: "desc" },
      take: 500
    });
    return rows.map((row) => ({
      code: row.customerCode,
      name: row.name,
      mobile: row.mobile,
      service: row.service.name,
      status: row.status,
      created: row.createdAt.toISOString().slice(0, 10)
    }));
  }
  if (type === "income") {
    const rows = await prisma.payment.findMany({
      include: { customer: true, service: true },
      orderBy: { paidAt: "desc" },
      take: 500
    });
    return rows.map((row) => ({
      customer: row.customer.name,
      service: row.service.name,
      amount: row.amount.toString(),
      method: row.method,
      date: row.paidAt.toISOString().slice(0, 10)
    }));
  }
  if (type === "expenses") {
    const rows = await prisma.expense.findMany({ orderBy: { spentAt: "desc" }, take: 500 });
    return rows.map((row) => ({
      category: row.category,
      amount: row.amount.toString(),
      vendor: row.vendor || "",
      date: row.spentAt.toISOString().slice(0, 10)
    }));
  }
  if (type === "services") {
    const rows = await prisma.service.findMany({ orderBy: { name: "asc" } });
    return rows.map((row) => ({
      name: row.name,
      category: row.category,
      charges: row.charges.toString(),
      processing: row.processingTime
    }));
  }
  const [income, expenses] = await Promise.all([
    prisma.payment.findMany(),
    prisma.expense.findMany()
  ]);
  const totalIncome = income.reduce((sum, row) => sum + Number(row.amount), 0);
  const totalExpense = expenses.reduce((sum, row) => sum + Number(row.amount), 0);
  return [
    {
      income: totalIncome,
      expense: totalExpense,
      profit: totalIncome - totalExpense,
      generated: new Date().toISOString().slice(0, 10)
    }
  ];
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { type } = await params;
  if (["income", "expenses", "profit"].includes(type) && session.user.role !== Role.OWNER) {
    return NextResponse.json({ error: "Owner access required" }, { status: 403 });
  }
  const format = request.nextUrl.searchParams.get("format") || "csv";
  const rows = await getRows(type);

  if (format === "pdf") {
    const pdf = await makePdfReport(
      `${type.toUpperCase()} Report`,
      rows
    );

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${type}-report.pdf"`
      }
    });
  }

  return new NextResponse(makeCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${type}-report.csv"`
    }
  });
}
