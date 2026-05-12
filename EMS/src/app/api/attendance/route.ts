import { prisma } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { employeeId, status } = await req.json();
    const record = await prisma.attendance.create({
      data: { employeeId, status, date: new Date() }
    });
    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}