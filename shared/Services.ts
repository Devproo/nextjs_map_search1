// Services.ts

export interface Service {
  id: number;
  name: string;
  address: string;
  rating: number;
  image: string;
  lat: number;
  lng: number;
  categoryValue: string;
}

// Full list of businesses and service providers
export const ServiceListData: Service[] = [
  // Gas stations
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
  {
    id: 2,
    name: "QuickFuel",
    address: "456 Elm Road",
    rating: 4.0,
    image: "/gas.png",
    lat: 40.7105,
    lng: -74.01,
    categoryValue: "gas_station",
  },

  // Restaurants
  {
    id: 3,
    name: "Pizza Place",
    address: "789 Oak Avenue",
    rating: 4.5,
    image: "/pizza.jpeg",
    lat: 40.705,
    lng: -74.008,
    categoryValue: "restaurant",
  },
  {
    id: 4,
    name: "Sushi World",
    address: "321 Maple Drive",
    rating: 4.7,
    image: "/rest.png",
    lat: 40.707,
    lng: -74.009,
    categoryValue: "restaurant",
  },

  // Supermarkets
  {
    id: 5,
    name: "Fresh Mart",
    address: "654 Pine Lane",
    rating: 4.6,
    image: "/supermarket.jpeg",
    lat: 40.708,
    lng: -74.01,
    categoryValue: "supermarket",
  },
  {
    id: 6,
    name: "Budget Foods",
    address: "852 Cedar Street",
    rating: 4.1,
    image: "/supermarket.jpeg",
    lat: 40.709,
    lng: -74.011,
    categoryValue: "supermarket",
  },

  // Pharmacies
  {
    id: 7,
    name: "HealthCare Pharmacy",
    address: "963 Birch Boulevard",
    rating: 4.3,
    image: "/pharmacy.jpeg",
    lat: 40.71,
    lng: -74.012,
    categoryValue: "pharmacy",
  },
  {
    id: 8,
    name: "MediQuick",
    address: "147 Spruce Court",
    rating: 4.4,
    image: "/pharmacy.jpeg",
    lat: 40.711,
    lng: -74.013,
    categoryValue: "pharmacy",
  },

  // Cafes
  {
    id: 9,
    name: "Coffee Corner",
    address: "258 Walnut Way",
    rating: 4.8,
    image: "/cafee.jpeg",
    lat: 40.712,
    lng: -74.014,
    categoryValue: "cafe",
  },
  {
    id: 10,
    name: "Latte Love",
    address: "369 Chestnut Street",
    rating: 4.6,
    image: "/cafee.jpeg",
    lat: 40.713,
    lng: -74.015,
    categoryValue: "cafe",
  },

  // Bookstores
  {
    id: 11,
    name: "The Reading Room",
    address: "951 Pinecrest Drive",
    rating: 4.9,
    image: "/bookstore.jpeg",
    lat: 40.714,
    lng: -74.016,
    categoryValue: "bookstore",
  },
  {
    id: 12,
    name: "Pages & Coffee",
    address: "753 Willow Avenue",
    rating: 4.7,
    image: "/bookstore.jpeg",
    lat: 40.715,
    lng: -74.017,
    categoryValue: "bookstore",
  },

  // Gyms
  {
    id: 13,
    name: "Iron Paradise",
    address: "852 Workout Lane",
    rating: 4.5,
    image: "/gym.png",
    lat: 40.716,
    lng: -74.018,
    categoryValue: "gym",
  },
  {
    id: 14,
    name: "FitHub",
    address: "963 Fitness Street",
    rating: 4.4,
    image: "/gym.png",
    lat: 40.717,
    lng: -74.019,
    categoryValue: "gym",
  },

  // Flower Shops
  {
    id: 15,
    name: "Bloom & Co.",
    address: "147 Petal Place",
    rating: 4.8,
    image: "/flowers.jpeg",
    lat: 40.718,
    lng: -74.02,
    categoryValue: "flower_shop",
  },
  {
    id: 16,
    name: "Petals & Stems",
    address: "258 Blossom Road",
    rating: 4.7,
    image: "/flowers.jpeg",
    lat: 40.719,
    lng: -74.021,
    categoryValue: "flower_shop",
  },

  // Plumbers
  {
    id: 17,
    name: "QuickFix Plumbing",
    address: "123 Water Street",
    rating: 4.6,
    image: "/plumber.png",
    lat: 40.72,
    lng: -74.022,
    categoryValue: "plumber",
  },
  {
    id: 18,
    name: "FlowRight Plumbing",
    address: "456 River Road",
    rating: 4.4,
    image: "/plumber.png",
    lat: 40.721,
    lng: -74.023,
    categoryValue: "plumber",
  },

  // Roofers
  {
    id: 19,
    name: "TopRoof Solutions",
    address: "789 Sky Avenue",
    rating: 4.7,
    image: "/roofer.png",
    lat: 40.722,
    lng: -74.024,
    categoryValue: "roofer",
  },
  {
    id: 20,
    name: "Peak Roofing Co.",
    address: "321 Summit Drive",
    rating: 4.5,
    image: "/roofer.png",
    lat: 40.723,
    lng: -74.025,
    categoryValue: "roofer",
  },

  // Electricians
  {
    id: 21,
    name: "Bright Electricians",
    address: "258 Power Lane",
    rating: 4.6,
    image: "/electrician.png",
    lat: 40.724,
    lng: -74.026,
    categoryValue: "electrician",
  },
  {
    id: 22,
    name: "Spark Electric",
    address: "369 Circuit Street",
    rating: 4.5,
    image: "/electrician.png",
    lat: 40.725,
    lng: -74.027,
    categoryValue: "electrician",
  },

  // Painters
  {
    id: 23,
    name: "Perfect Painters",
    address: "147 Color Road",
    rating: 4.7,
    image: "/painter.png",
    lat: 40.726,
    lng: -74.028,
    categoryValue: "painter",
  },
  {
    id: 24,
    name: "Pro Painters Co.",
    address: "258 Brush Avenue",
    rating: 4.6,
    image: "/painter.png",
    lat: 40.727,
    lng: -74.029,
    categoryValue: "painter",
  },

  // Cleaners
  {
    id: 25,
    name: "Sparkle Cleaning",
    address: "852 Shine Street",
    rating: 4.8,
    image: "/cleaner.png",
    lat: 40.728,
    lng: -74.03,
    categoryValue: "cleaner",
  },
  {
    id: 26,
    name: "FreshClean Co.",
    address: "963 Dust Avenue",
    rating: 4.6,
    image: "/cleaner.png",
    lat: 40.729,
    lng: -74.031,
    categoryValue: "cleaner",
  },

  // Carpenters
  {
    id: 27,
    name: "Master Carpentry",
    address: "741 Wood Street",
    rating: 4.7,
    image: "/carpenter.png",
    lat: 40.73,
    lng: -74.032,
    categoryValue: "carpenter",
  },
  {
    id: 28,
    name: "TimberWorks",
    address: "852 Oak Avenue",
    rating: 4.5,
    image: "/carpenter.png",
    lat: 40.731,
    lng: -74.033,
    categoryValue: "carpenter",
  },

  // HVAC
  {
    id: 29,
    name: "CoolAir HVAC",
    address: "963 Breeze Blvd",
    rating: 4.6,
    image: "/hvac.png",
    lat: 40.732,
    lng: -74.034,
    categoryValue: "hvac",
  },
  {
    id: 30,
    name: "ProClimate HVAC",
    address: "147 Wind Lane",
    rating: 4.7,
    image: "/hvac.png",
    lat: 40.733,
    lng: -74.035,
    categoryValue: "hvac",
  },

  // Security
  {
    id: 31,
    name: "Tech Security",
    address: "258 Guard Street",
    rating: 4.6,
    image: "/security.png",
    lat: 40.734,
    lng: -74.036,
    categoryValue: "security",
  },
  {
    id: 32,
    name: "SafeHome Security",
    address: "369 Lock Avenue",
    rating: 4.5,
    image: "/security.png",
    lat: 40.735,
    lng: -74.037,
    categoryValue: "security",
  },
];
