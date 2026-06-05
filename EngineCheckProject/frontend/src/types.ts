export interface Testing {
 message: string;
}

export interface Employee {
  ID_Badge_Number: number;
  First_Name: string;
  Last_Name: string;
}

//Da rifare-completare assieme a CreateProfile
export interface Customer {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string; 
}

export interface Service {
  Service_ID: number;
  Minutes: number;
  Title: string;
  Description: string;
  Price: number;
  Vehicle_Type: 'car' | 'motorcycle';
  Category: 'maintenance' | 'repair' | 'tyres';
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