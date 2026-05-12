import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Database mein admin ko dhoondna
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // Password check (Note: Real project mein yahan bcrypt.compare use karein)
    if (admin.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Success response
    return NextResponse.json({ 
      message: "Login successful", 
      user: { id: admin.id, email: admin.email } 
    });

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}