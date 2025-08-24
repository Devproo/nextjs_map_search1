// Services.ts (refined)

export interface Business {
  id: number;
  name: string;
  address: string;
  rating: number;
  image: string;
  lat: number;
  lng: number;
  categoryValue: string;
}

export const BusinessListData: Business[] = [
  // Gas station
  {
    id: 1,
    name: "Fuel Express",
    address: "123 Main Street",
    rating: 4.2,
    image: "/gas.png",
    lat: 40.7135,
    lng: -74.002,
    categoryValue: "gas_station",
  },

  // Restaurant
  {
    id: 2,
    name: "Pizza Place",
    address: "789 Oak Avenue",
    rating: 4.5,
    image: "/pizza.jpeg",
    lat: 40.705,
    lng: -74.008,
    categoryValue: "restaurant",
  },

  // Supermarket
  {
    id: 3,
    name: "Fresh Mart",
    address: "654 Pine Lane",
    rating: 4.6,
    image: "/supermarket.jpeg",
    lat: 40.708,
    lng: -74.01,
    categoryValue: "supermarket",
  },

  // Pharmacy
  {
    id: 4,
    name: "HealthCare Pharmacy",
    address: "963 Birch Boulevard",
    rating: 4.3,
    image: "/pharmacy.jpeg",
    lat: 40.71,
    lng: -74.012,
    categoryValue: "pharmacy",
  },

  // Cafe
  {
    id: 5,
    name: "Coffee Corner",
    address: "258 Walnut Way",
    rating: 4.8,
    image: "/cafee.jpeg",
    lat: 40.712,
    lng: -74.014,
    categoryValue: "cafe",
  },

  // Bookstore
  {
    id: 6,
    name: "The Reading Room",
    address: "951 Pinecrest Drive",
    rating: 4.9,
    image: "/bookstore.jpeg",
    lat: 40.714,
    lng: -74.016,
    categoryValue: "bookstore",
  },

  // Gym
  {
    id: 7,
    name: "Iron Paradise",
    address: "852 Workout Lane",
    rating: 4.5,
    image: "/gym.png",
    lat: 40.716,
    lng: -74.018,
    categoryValue: "gym",
  },

  // Flower Shop
  {
    id: 8,
    name: "Bloom & Co.",
    address: "147 Petal Place",
    rating: 4.8,
    image: "/flowers.jpeg",
    lat: 40.718,
    lng: -74.02,
    categoryValue: "flower_shop",
  },
];
