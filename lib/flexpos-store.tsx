"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  catalogItems,
  customers as seedCustomers,
  defaultSettings,
  type AppSettings,
  type BusinessMode,
  type CartItem,
  type CatalogItem,
  type Customer,
  type PaymentMethod,
} from "./flexpos-data";

const DEFAULT_VAT_RATE = 0.16;
const DEFAULT_BUSINESS_NAME = "FlexPOS";

export type Sale = {
  id: string;
  customer: string;
  channel: string;
  mode: BusinessMode;
  payment: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  vat: number;
  total: number;
  time: string;
};

// Seeded history so the Sales and Dashboard screens are populated before any
// live sale is recorded. Totals are internally consistent (sum = KES 7,640).
const seedSales: Sale[] = [
  {
    id: "SALE-1001",
    customer: "Walk-in Customer",
    channel: "Checkout",
    mode: "Grocery",
    payment: "M-Pesa",
    items: [],
    subtotal: 1810,
    vat: 290,
    total: 2100,
    time: "Today, 10:42 AM",
  },
  {
    id: "SALE-1002",
    customer: "Amina Ali",
    channel: "Checkout",
    mode: "Grocery",
    payment: "Cash",
    items: [],
    subtotal: 724,
    vat: 116,
    total: 840,
    time: "Today, 11:18 AM",
  },
  {
    id: "SALE-1003",
    customer: "John Mwangi",
    channel: "Cafe Order",
    mode: "Cafe",
    payment: "Card",
    items: [],
    subtotal: 1250,
    vat: 200,
    total: 1450,
    time: "Today, 12:05 PM",
  },
  {
    id: "SALE-1004",
    customer: "Walk-in Customer",
    channel: "Retail",
    mode: "Retail",
    payment: "Split",
    items: [],
    subtotal: 2802,
    vat: 448,
    total: 3250,
    time: "Today, 1:22 PM",
  },
];

export type SalesSummary = {
  gross: number;
  count: number;
  average: number;
  mpesa: number;
};

type FlexposContextValue = {
  catalog: CatalogItem[];
  addCatalogItem: (item: CatalogItem) => void;
  cart: CartItem[];
  addToCart: (item: CatalogItem) => void;
  changeQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartVat: number;
  cartTotal: number;
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  selectedCustomerId: string | null;
  selectedCustomer: Customer | null;
  selectCustomer: (id: string | null) => void;
  businessMode: BusinessMode;
  setBusinessMode: (mode: BusinessMode) => void;
  vatRate: number;
  setVatRate: (rate: number) => void;
  businessName: string;
  setBusinessName: (name: string) => void;
  settings: AppSettings;
  toggleSetting: (key: string) => void;
  sales: Sale[];
  recordSale: (
    payment: PaymentMethod,
    customer?: string,
    channel?: string
  ) => Sale | null;
  salesSummary: SalesSummary;
};

const FlexposContext = createContext<FlexposContextValue | null>(null);

function formatNow(): string {
  // Runs only inside click handlers (client-side), never during render.
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `Today, ${time}`;
}

// Customer spend is stored as a display string like "KES 8,400".
function parseKes(value: string): number {
  return Number(value.replace(/[^0-9.]/g, "")) || 0;
}

function formatKes(value: number): string {
  return `KES ${Math.round(value).toLocaleString()}`;
}

// Loyalty rule: 1 point per KES 10 spent (matches the seeded customers).
function pointsEarned(total: number): number {
  return Math.round(total / 10);
}

const STORAGE_KEY = "flexpos-state-v3";

export function FlexposProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<CatalogItem[]>(catalogItems);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sales, setSales] = useState<Sale[]>(seedSales);
  const [customers, setCustomers] = useState<Customer[]>(seedCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const [businessMode, setBusinessMode] = useState<BusinessMode>("Grocery");
  const [vatRate, setVatRate] = useState<number>(DEFAULT_VAT_RATE);
  const [businessName, setBusinessName] = useState<string>(
    DEFAULT_BUSINESS_NAME
  );
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const selectedCustomer =
    customers.find((customer) => customer.id === selectedCustomerId) ?? null;

  // localStorage is only touched inside effects — never during render or in a
  // useState initializer — so server render and first client render match.
  const hydrated = useRef(false);

  // Load persisted state once, after mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as {
          catalog?: CatalogItem[];
          cart?: CartItem[];
          sales?: Sale[];
          customers?: Customer[];
          selectedCustomerId?: string | null;
          businessMode?: BusinessMode;
          vatRate?: number;
          businessName?: string;
          settings?: AppSettings;
        };
        if (Array.isArray(saved.catalog)) setCatalog(saved.catalog);
        if (Array.isArray(saved.cart)) setCart(saved.cart);
        if (Array.isArray(saved.sales)) setSales(saved.sales);
        if (Array.isArray(saved.customers)) setCustomers(saved.customers);
        if ("selectedCustomerId" in saved) {
          setSelectedCustomerId(saved.selectedCustomerId ?? null);
        }
        if (saved.businessMode) setBusinessMode(saved.businessMode);
        if (typeof saved.vatRate === "number") setVatRate(saved.vatRate);
        if (typeof saved.businessName === "string") {
          setBusinessName(saved.businessName);
        }
        if (saved.settings) {
          // Merge so newly-added keys keep their defaults.
          setSettings({ ...defaultSettings, ...saved.settings });
        }
      }
    } catch {
      // Corrupt or unavailable storage — fall back to seed state.
    }
  }, []);

  // Persist on change. Skip the first run so the seed values can't overwrite
  // freshly loaded data before the load effect's setState has committed.
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          catalog,
          cart,
          sales,
          customers,
          selectedCustomerId,
          businessMode,
          vatRate,
          businessName,
          settings,
        })
      );
    } catch {
      // Ignore quota / unavailable storage errors.
    }
  }, [
    catalog,
    cart,
    sales,
    customers,
    selectedCustomerId,
    businessMode,
    vatRate,
    businessName,
    settings,
  ]);

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );
  const cartVat = Math.round(cartSubtotal * vatRate);
  const cartTotal = cartSubtotal + cartVat;

  const salesSummary = useMemo<SalesSummary>(() => {
    const gross = sales.reduce((sum, sale) => sum + sale.total, 0);
    const count = sales.length;
    const mpesa = sales
      .filter((sale) => sale.payment === "M-Pesa")
      .reduce((sum, sale) => sum + sale.total, 0);

    return {
      gross,
      count,
      average: count > 0 ? Math.round(gross / count) : 0,
      mpesa,
    };
  }, [sales]);

  function addCatalogItem(item: CatalogItem) {
    setCatalog((current) => [item, ...current]);
  }

  function addToCart(item: CatalogItem) {
    setCart((items) => {
      const existing = items.find((line) => line.id === item.id);

      if (existing) {
        return items.map((line) =>
          line.id === item.id
            ? { ...line, quantity: line.quantity + 1 }
            : line
        );
      }

      return [
        ...items,
        { id: item.id, name: item.name, price: item.price, quantity: 1 },
      ];
    });
  }

  function changeQuantity(id: string, delta: number) {
    setCart((items) =>
      items
        .map((line) =>
          line.id === id ? { ...line, quantity: line.quantity + delta } : line
        )
        .filter((line) => line.quantity > 0)
    );
  }

  function removeFromCart(id: string) {
    setCart((items) => items.filter((line) => line.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  function toggleSetting(key: string) {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  }

  function addCustomer(customer: Customer) {
    setCustomers((current) => [customer, ...current]);
  }

  function selectCustomer(id: string | null) {
    setSelectedCustomerId(id);
  }

  function recordSale(
    payment: PaymentMethod,
    customer?: string,
    channel = "Checkout"
  ): Sale | null {
    if (cart.length === 0) return null;

    const buyer = customer ?? selectedCustomer?.name ?? "Walk-in Customer";

    const sale: Sale = {
      id: `SALE-${1000 + sales.length + 1}`,
      customer: buyer,
      channel,
      mode: businessMode,
      payment,
      items: cart,
      subtotal: cartSubtotal,
      vat: cartVat,
      total: cartTotal,
      time: formatNow(),
    };

    setSales((current) => [sale, ...current]);

    // Close the inventory loop: decrement stock for tracked items that sold.
    setCatalog((current) =>
      current.map((item) => {
        if (item.stock === null) return item;
        const line = cart.find((entry) => entry.id === item.id);
        if (!line) return item;
        return { ...item, stock: Math.max(0, item.stock - line.quantity) };
      })
    );

    // Close the loyalty loop: credit the selected customer's points and spend.
    if (selectedCustomerId) {
      const earned = pointsEarned(sale.total);
      setCustomers((current) =>
        current.map((existing) =>
          existing.id === selectedCustomerId
            ? {
                ...existing,
                points: existing.points + earned,
                spend: formatKes(parseKes(existing.spend) + sale.total),
                lastVisit: "Today",
              }
            : existing
        )
      );
    }

    clearCart();
    return sale;
  }

  const value: FlexposContextValue = {
    catalog,
    addCatalogItem,
    cart,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartVat,
    cartTotal,
    customers,
    addCustomer,
    selectedCustomerId,
    selectedCustomer,
    selectCustomer,
    businessMode,
    setBusinessMode,
    vatRate,
    setVatRate,
    businessName,
    setBusinessName,
    settings,
    toggleSetting,
    sales,
    recordSale,
    salesSummary,
  };

  return (
    <FlexposContext.Provider value={value}>{children}</FlexposContext.Provider>
  );
}

export function useFlexpos(): FlexposContextValue {
  const context = useContext(FlexposContext);

  if (!context) {
    throw new Error("useFlexpos must be used within a FlexposProvider");
  }

  return context;
}
