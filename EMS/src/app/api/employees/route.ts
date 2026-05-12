import { prisma } from "../../../lib/db";
import { NextResponse } from "next/server";

// --- PROFESSIONAL MOCK DATA ---
// Jab tak database connect nahi hota, ye data use hoga
let mockEmployees = [
  { id: "1", name: "Mujeeb", email: "mujeeb@pulsehr.com", designation: "Full Stack Developer", createdAt: new Date() },
  { id: "2", name: "Ali Ahmed", email: "ali@pulsehr.com", designation: "UI/UX Designer", createdAt: new Date() },
];

// 💡 Switch: .env set karne ke baad isay true kar dena
const IS_DATABASE_CONNECTED = false; 

// 1. GET: Live Dashboard Stats & Employee List
export async function GET() {
  try {
    if (!IS_DATABASE_CONNECTED) {
      return NextResponse.json({
        todayEmployeesCount: mockEmployees.length,
        thisMonthHiredEmployeesCount: mockEmployees.length,
        employees: mockEmployees
      });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [employees, thisMonthCount] = await Promise.all([
      prisma.employee.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.employee.count({
        where: { createdAt: { gte: startOfMonth } }
      })
    ]);

    return NextResponse.json({
      todayEmployeesCount: employees.length,
      thisMonthHiredEmployeesCount: thisMonthCount,
      employees: employees
    });
  } catch (error) {
    console.error("GET Error:", error);
    // Professional Fallback: Crash hone par HTML ke bajaye JSON error bhej rahe hain
    return NextResponse.json({ error: "Database error", employees: [] }, { status: 500 });
  }
}

// 2. POST: Naya Employee Save karna
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, designation } = body;

    if (!name || !email || !designation) {
      return NextResponse.json({ error: "Details missing" }, { status: 400 });
    }

    if (!IS_DATABASE_CONNECTED) {
      const newMock = { 
        id: Math.random().toString(36).substr(2, 9), 
        name, email, designation, 
        createdAt: new Date() 
      };
      mockEmployees.push(newMock);
      return NextResponse.json(newMock);
    }

    const existing = await prisma.employee.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Email already exists" }, { status: 400 });

    const newEmployee = await prisma.employee.create({
      data: { name, email, designation },
    });

    return NextResponse.json(newEmployee);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

// 🗑️ 3. DELETE: Employee remove karna
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID missing" }, { status: 400 });

    if (!IS_DATABASE_CONNECTED) {
      mockEmployees = mockEmployees.filter(emp => emp.id !== id);
      return NextResponse.json({ message: "Deleted from memory" });
    }

    await prisma.employee.delete({ where: { id: id } });
    return NextResponse.json({ message: "Successfully deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}