// Driver interface
export interface Driver {
  id: number;
  name: string;
  carModel: string;
  carType: string; // Sedan, SUV, Truck, etc.
  lat: number;
  lng: number;
  rating: number; // already added
  distance?: number; // in kilometers
  estimatedTime?: number; // in minutes
}

// Mock driver dataset
export const DriverListData: Driver[] = [
  {
    id: 1,
    name: "Ahmed Ali",
    carModel: "Toyota Corolla",
    carType: "Sedan",
    lat: 30.0444,
    lng: 31.2357, // Cairo
    rating: 4.5,
    distance: 2.3,
    estimatedTime: 6,
  },
  {
    id: 2,
    name: "Sara Youssef",
    carModel: "Hyundai Tucson",
    carType: "SUV",
    lat: 29.9753,
    lng: 31.1376, // Giza
    rating: 4.8,
    distance: 5.1,
    estimatedTime: 12,
  },
  {
    id: 3,
    name: "Mohamed Hassan",
    carModel: "Chevrolet Lanos",
    carType: "Sedan",
    lat: 31.2001,
    lng: 29.9187, // Alexandria
    rating: 4.2,
    distance: 220, // mock Cairo → Alexandria
    estimatedTime: 180,
  },
  {
    id: 4,
    name: "Nour El-Din",
    carModel: "Kia Sportage",
    carType: "SUV",
    lat: 30.0131,
    lng: 31.2089, // Nasr City
    rating: 4.7,
    distance: 4.4,
    estimatedTime: 10,
  },
  {
    id: 5,
    name: "Layla Ibrahim",
    carModel: "Mitsubishi L200",
    carType: "Truck",
    lat: 30.0626,
    lng: 31.2497, // Downtown Cairo
    rating: 4.3,
    distance: 1.5,
    estimatedTime: 5,
  },
];
