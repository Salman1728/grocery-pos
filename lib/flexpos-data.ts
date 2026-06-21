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
  // Numeric stock for tracked goods; null for services / made-to-order items
  // (which use stockLabel for their descriptive text instead).
  stock: number | null;
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

// Tracked goods have a numeric stock; services / made-to-order items are null.
export function stockCount(item: CatalogItem): number | null {
  return item.stock;
}

export function isLowStock(item: CatalogItem): boolean {
  return item.stock !== null && item.stock < LOW_STOCK_THRESHOLD;
}

// Display text for the stock column: live count for tracked goods, otherwise
// the descriptive label.
export function stockDisplay(item: CatalogItem): string {
  return item.stock !== null ? `Stock: ${item.stock}` : item.stockLabel;
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

export const paymentSettingKey: Record<PaymentMethod, string> = {
  Cash: "pay.cash",
  "M-Pesa": "pay.mpesa",
  Card: "pay.card",
  Split: "pay.split",
};

export type AppSettings = Record<string, boolean>;

export const defaultSettings: AppSettings = {
  // Payments — drive which methods appear at checkout.
  "pay.cash": true,
  "pay.mpesa": true,
  "pay.card": true,
  "pay.split": true,
  // Receipts — "rcpt.whatsapp" gates the WhatsApp button on customer profiles.
  "rcpt.print": true,
  "rcpt.whatsapp": true,
  "rcpt.sms": false,
  "rcpt.email": false,
  // Notifications — "notif.lowstock" drives the dashboard low-stock banner.
  "notif.lowstock": true,
  "notif.expiry": true,
  "notif.daily": false,
  "notif.manager": true,
  // Security — saved preferences.
  "sec.pin": true,
  "sec.refundapproval": true,
  "sec.audit": true,
  "sec.autoshift": false,
  // Staff & access — saved preferences.
  "access.cashierrefunds": false,
  "access.managervoid": true,
  "access.multilogin": true,
  "access.selfcheckout": false,
};

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
    stock: 20,
    stockLabel: "",
    mode: "Grocery",
    color: "bg-blue-500",
  },
  {
    id: "rice-2kg",
    name: "Rice 2kg",
    type: "Product",
    category: "Groceries",
    price: 420,
    stock: 35,
    stockLabel: "",
    mode: "Grocery",
    color: "bg-amber-500",
  },
  {
    id: "water-1l",
    name: "Water 1L",
    type: "Product",
    category: "Groceries",
    price: 70,
    stock: 100,
    stockLabel: "",
    mode: "Grocery",
    color: "bg-cyan-500",
  },
  {
    id: "burger",
    name: "Chicken Burger",
    type: "Food",
    category: "Food",
    price: 650,
    stock: null,
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
    stock: null,
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
    stock: null,
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
    stock: 44,
    stockLabel: "",
    mode: "Pharmacy",
    color: "bg-red-500",
  },
  {
    id: "face-cream",
    name: "Face Cream",
    type: "Product",
    category: "Beauty",
    price: 850,
    stock: 15,
    stockLabel: "",
    mode: "Salon",
    color: "bg-purple-500",
  },
  {
    id: "haircut",
    name: "Haircut",
    type: "Service",
    category: "Services",
    price: 500,
    stock: null,
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
