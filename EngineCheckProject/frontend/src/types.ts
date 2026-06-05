export interface Testing {
 message: string;
}

export interface Employee {
  ID_Badge_Number: number;
  First_Name: string;
  Last_Name: string;
}

export interface Customer {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string; 
}

export interface Service {
  serviceId: number;
  estimatedDuration: number;
  title: string;
  description: string;
  price: number;
  vehicleType: 'car' | 'motorcycle';
}

export interface Job {
  jobId: number;
  customerId: number;
  serviceId: number;
  employeeId: number;
  status: 'pending' | 'in progress' | 'completed' | 'cancelled';
  startTime: string;
  endTime: string;
}