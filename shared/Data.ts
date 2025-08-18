// // shared/Data.ts

// Category interface & data
export interface Category {
  id: number;
  name: string;
  value: string;
  icon: string;
}

export const CategoryListData: Category[] = [
  {
    id: 1,
    name: "Gas station",
    value: "gas_station",
    icon: "/gas.png",
  },
  {
    id: 2,
    name: "Restaurant",
    value: "restaurant",
    icon: "/rest.png",
  },
  {
    id: 3,
    name: "Supermarket",
    value: "supermarket",
    icon: "/supermarket.jpeg",
  },
  {
    id: 4,
    name: "Pharmacy",
    value: "pharmacy",
    icon: "/pharmacy.jpeg",
  },
  {
    id: 5,
    name: "Cafe",
    value: "cafe",
    icon: "/cafee.jpeg",
  },
  {
    id: 6,
    name: "Bookstore",
    value: "bookstore",
    icon: "/bookstore.jpeg",
  },
  {
    id: 7,
    name: "Gym",
    value: "gym",
    icon: "/gym.png",
  },
  {
    id: 8,
    name: "Flower Shop",
    value: "flower_shop",
    icon: "/flowers.jpeg",
  },
];

// Business interface & data
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
    lng: -44.002,
    categoryValue: "gas_station",
  },
  {
    id: 2,
    name: "QuickFuel",
    address: "456 Elm Road",
    rating: 4.0,
    image: "/gas.png",
    lat: 40.7105,
    lng: -24.01,
    categoryValue: "gas_station",
  },

  // Restaurant
  {
    id: 3,
    name: "Pizza Place",
    address: "789 Oak Avenue",
    rating: 4.5,
    image: "/pizza.jpeg",
    lat: 94.0505,
    lng: -118.245,
    categoryValue: "restaurant",
  },
  {
    id: 4,
    name: "Sushi World",
    address: "321 Maple Drive",
    rating: 4.7,
    image: "/rest.png",
    lat: 34.054,
    lng: -118.25,
    categoryValue: "restaurant",
  },

  // Supermarket
  {
    id: 5,
    name: "Fresh Mart",
    address: "654 Pine Lane",
    rating: 4.6,
    image: "/supermarket.jpeg",
    lat: 41.88,
    lng: -87.6305,
    categoryValue: "supermarket",
  },
  {
    id: 6,
    name: "Budget Foods",
    address: "852 Cedar Street",
    rating: 4.1,
    image: "/supermarket.jpeg",
    lat: 41.877,
    lng: -87.628,
    categoryValue: "supermarket",
  },

  // Pharmacy
  {
    id: 7,
    name: "HealthCare Pharmacy",
    address: "963 Birch Boulevard",
    rating: 4.3,
    image: "/pharmacy.jpeg",
    lat: 29.761,
    lng: -95.368,
    categoryValue: "pharmacy",
  },
  {
    id: 8,
    name: "MediQuick",
    address: "147 Spruce Court",
    rating: 4.4,
    image: "/pharmacy.jpeg",
    lat: 29.759,
    lng: -95.37,
    categoryValue: "pharmacy",
  },

  // Cafe
  {
    id: 9,
    name: "Coffee Corner",
    address: "258 Walnut Way",
    rating: 4.8,
    image: "/cafee.jpeg",
    lat: 37.775,
    lng: -122.418,
    categoryValue: "cafe",
  },
  {
    id: 10,
    name: "Latte Love",
    address: "369 Chestnut Street",
    rating: 4.6,
    image: "/cafee.jpeg",
    lat: 37.773,
    lng: -122.4205,
    categoryValue: "cafe",
  },

  // Bookstore
  {
    id: 11,
    name: "The Reading Room",
    address: "951 Pinecrest Drive",
    rating: 4.9,
    image: "/bookstore.jpeg",
    lat: 47.607,
    lng: -122.333,
    categoryValue: "bookstore",
  },
  {
    id: 12,
    name: "Pages & Coffee",
    address: "753 Willow Avenue",
    rating: 4.7,
    image: "/bookstore.jpeg",
    lat: 47.6055,
    lng: -122.3315,
    categoryValue: "bookstore",
  },

  // Gym
  {
    id: 13,
    name: "Iron Paradise",
    address: "852 Workout Lane",
    rating: 4.5,
    image: "/gym.png",
    lat: 39.74,
    lng: -104.991,
    categoryValue: "gym",
  },
  {
    id: 14,
    name: "FitHub",
    address: "963 Fitness Street",
    rating: 4.4,
    image: "/gym.png",
    lat: 39.7385,
    lng: -104.989,
    categoryValue: "gym",
  },

  // Flower Shop
  {
    id: 15,
    name: "Bloom & Co.",
    address: "147 Petal Place",
    rating: 4.8,
    image: "/flowers.jpeg",
    lat: 25.762,
    lng: -80.1925,
    categoryValue: "flower_shop",
  },
  {
    id: 16,
    name: "Petals & Stems",
    address: "258 Blossom Road",
    rating: 4.7,
    image: "/flowers.jpeg",
    lat: 25.76,
    lng: -80.19,
    categoryValue: "flower_shop",
  },
];
