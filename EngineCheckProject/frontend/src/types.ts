export interface Testing {
  id:string;
  phone:string;
}



export interface Employee {
  badgeNumber: number;
  firstName: string;
  lastName: string;
  password: string;
}

export interface Customer {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string; // se usiamo anche il prefisso 
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
  status: 'pending' | 'in progress' | 'completed' | 'cancelled'; // metti piu campi come boolean , così filtra meglio , es : isCompleted = true; ,  isInProgress = true;
  // se è cancellato , è poof andato e viene cancellato da sql
  startTime: string;
  endTime: string;
}