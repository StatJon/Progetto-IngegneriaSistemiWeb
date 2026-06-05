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

export interface Booking {
  Job_ID: number,
  Date: string,
  Time: string,
  Model: string,
  License_Plate: string,
  Services: string,
}

export interface Job {
  Job_ID: number;
  Service_ID: number;
  JobService_Status: string;
  Model: string;
  Vehicle_Type: string;
  License_Plate: string;
  Date_Time: string;
  Title: string;
  Description: string;
  Minutes: number;
  Worker_Name: string;
  Worker_Last_Name: string;
  CustomerEmail: string;
  CustomerPhone: string;
}