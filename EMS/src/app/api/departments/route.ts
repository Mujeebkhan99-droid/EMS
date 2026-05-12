import { NextResponse } from "next/server";

// Mock Departments List
let departments = [
  { id: "1", name: "Information Technology", count: 4 },
  { id: "2", name: "Human Resources", count: 2 },
  { id: "3", name: "Sales & Marketing", count: 5 },
];

export async function GET() {
  return NextResponse.json(departments);
}

export async function POST(req: Request) {
  const { name } = await req.json();
  const newDept = { 
    id: Math.random().toString(36).substr(2, 9), 
    name, 
    count: 0 
  };
  departments.push(newDept);
  return NextResponse.json(newDept);
}