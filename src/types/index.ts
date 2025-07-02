export interface Project {
  id: string;
  name: string;
  description: string;
  clientName: string;
  startDate: string;
  expectedEndDate: string;
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed';
  totalBudget: number;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: string;
  projectId: string;
  category: 'materials' | 'labor' | 'equipment' | 'transport' | 'other';
  description: string;
  amount: number;
  date: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  projectId: string;
  type: 'received' | 'given';
  to: string; // client name or supplier/labor name
  amount: number;
  description: string;
  date: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

export interface Labor {
  id: string;
  name: string;
  phone: string;
  address: string;
  dailyRate: number;
  skills: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  category: 'cement' | 'steel' | 'sand' | 'aggregates' | 'bricks' | 'electrical' | 'plumbing' | 'hardware' | 'other';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface LaborAssignment {
  id: string;
  projectId: string;
  laborId: string;
  startDate: string;
  endDate?: string;
  daysWorked: number;
  totalAmount: number;
  status: 'active' | 'completed';
  createdAt: string;
}