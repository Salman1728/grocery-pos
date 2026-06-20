export type BusinessMode =
  | "Grocery"
  | "Cafe"
  | "Retail"
  | "Pharmacy"
  | "Salon";

export type CatalogItem = {
  id: string;
  name: string;
  type: "Product" | "Food" | "Medicine" | "Service" | "Custom";
  category: string;
  price: number;
  stockLabel: string;
  mode: BusinessMode;
  color: string;
};

export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type PaymentMethod = "Cash" | "M-Pesa" | "Card" | "Split";

export const LOW_STOCK_THRESHOLD = 20;

// Only "Stock: N" labels carry a real stock count; service/food durations
// (e.g. "30 minutes", "Prepared fresh") do not.
export function stockCount(item: CatalogItem): number | null {
  if (!/stock/i.test(item.stockLabel)) return null;
  const match = item.stockLabel.match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

export function isLowStock(item: CatalogItem): boolean {
  const count = stockCount(item);
  return count !== null && count < LOW_STOCK_THRESHOLD;
}

export const businessModes: BusinessMode[] = [
  "Grocery",
  "Cafe",
  "Retail",
  "Pharmacy",
  "Salon",
];

export const paymentMethods: PaymentMethod[] = [
  "Cash",
  "M-Pesa",
  "Card",
  "Split",
];

export const categories = [
  "All",
  "Popular",
  "Groceries",
  "Food",
  "Services",
  "Medicine",
  "Beauty",
  "Custom",
];

export const catalogItems: CatalogItem[] = [
  {
    id: "milk-500ml",
    name: "Milk 500ml",
    type: "Product",
    category: "Groceries",
    price: 120,
    stockLabel: "Stock: 20",
    mode: "Grocery",
    color: "bg-blue-500",
  },
  {
    id: "rice-2kg",
    name: "Rice 2kg",
    type: "Product",
    category: "Groceries",
    price: 420,
    stockLabel: "Stock: 35",
    mode: "Grocery",
    color: "bg-amber-500",
  },
  {
    id: "water-1l",
    name: "Water 1L",
    type: "Product",
    category: "Groceries",
    price: 70,
    stockLabel: "Stock: 100",
    mode: "Grocery",
    color: "bg-cyan-500",
  },
  {
    id: "burger",
    name: "Chicken Burger",
    type: "Food",
    category: "Food",
    price: 650,
    stockLabel: "Kitchen item",
    mode: "Cafe",
    color: "bg-orange-500",
  },
  {
    id: "coffee",
    name: "Latte Coffee",
    type: "Food",
    category: "Food",
    price: 350,
    stockLabel: "Prepared fresh",
    mode: "Cafe",
    color: "bg-stone-600",
  },
  {
    id: "shirt",
    name: "T-Shirt",
    type: "Product",
    category: "Retail",
    price: 1200,
    stockLabel: "Size variants",
    mode: "Retail",
    color: "bg-indigo-500",
  },
  {
    id: "painkillers",
    name: "Painkillers",
    type: "Medicine",
    category: "Medicine",
    price: 180,
    stockLabel: "Stock: 44",
    mode: "Pharmacy",
    color: "bg-red-500",
  },
  {
    id: "face-cream",
    name: "Face Cream",
    type: "Product",
    category: "Beauty",
    price: 850,
    stockLabel: "Stock: 15",
    mode: "Salon",
    color: "bg-purple-500",
  },
  {
    id: "haircut",
    name: "Haircut",
    type: "Service",
    category: "Services",
    price: 500,
    stockLabel: "30 minutes",
    mode: "Salon",
    color: "bg-emerald-500",
  },
];

export const starterCart: CartItem[] = [
  {
    id: "milk-500ml",
    name: "Milk 500ml",
    quantity: 2,
    price: 120,
  },
  {
    id: "burger",
    name: "Chicken Burger",
    quantity: 1,
    price: 650,
  },
  {
    id: "haircut",
    name: "Haircut",
    quantity: 1,
    price: 500,
  },
];

export const dashboardStats = [
  {
    label: "Today Sales",
    value: "KES 84,230",
    change: "+12.4%",
  },
  {
    label: "Transactions",
    value: "312",
    change: "+8.1%",
  },
  {
    label: "Low Stock",
    value: "18 items",
    change: "Needs review",
  },
  {
    label: "M-Pesa Collected",
    value: "KES 52,400",
    change: "62% of sales",
  },
];

export const inventoryRows = [
  {
    product: "Milk 500ml",
    sku: "GR-001",
    branch: "Main Branch",
    available: "20 units",
    reorder: "10 units",
    expiry: "2026-08-12",
  },
  {
    product: "Painkillers",
    sku: "PH-104",
    branch: "Main Branch",
    available: "44 units",
    reorder: "20 units",
    expiry: "2027-01-20",
  },
  {
    product: "Rice 2kg",
    sku: "GR-022",
    branch: "Westlands",
    available: "35 packs",
    reorder: "15 packs",
    expiry: "2026-11-02",
  },
];

export type Customer = {
  id: string;
  name: string;
  phone: string;
  lastVisit: string;
  spend: string;
  points: number;
};

export const customers: Customer[] = [
  {
    id: "amina-ali",
    name: "Amina Ali",
    phone: "0712 000 111",
    lastVisit: "Today",
    spend: "KES 8,400",
    points: 840,
  },
  {
    id: "john-mwangi",
    name: "John Mwangi",
    phone: "0722 444 100",
    lastVisit: "Yesterday",
    spend: "KES 14,200",
    points: 1420,
  },
  {
    id: "fatima-noor",
    name: "Fatima Noor",
    phone: "0790 101 222",
    lastVisit: "Jun 12",
    spend: "KES 3,850",
    points: 385,
  },
];
