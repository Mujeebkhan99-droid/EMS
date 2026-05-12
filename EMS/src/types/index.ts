export interface Employee {
  id: string;
  name: string;
  email: string;
  salary: number;
  role: string;
  departmentId: string;
  createdAt: Date;
}

export interface Department {
  id: string;
  name: string;
  employees?: Employee[];
}