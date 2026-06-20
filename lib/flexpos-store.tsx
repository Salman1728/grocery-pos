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
  type CartItem,
  type CatalogItem,
  type PaymentMethod,
} from "./flexpos-data";

const VAT_RATE = 0.16;

export type Sale = {
  id: string;
  customer: string;
  channel: string;
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

const STORAGE_KEY = "flexpos-state-v1";

export function FlexposProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<CatalogItem[]>(catalogItems);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sales, setSales] = useState<Sale[]>(seedSales);

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
        };
        if (Array.isArray(saved.catalog)) setCatalog(saved.catalog);
        if (Array.isArray(saved.cart)) setCart(saved.cart);
        if (Array.isArray(saved.sales)) setSales(saved.sales);
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
        JSON.stringify({ catalog, cart, sales })
      );
    } catch {
      // Ignore quota / unavailable storage errors.
    }
  }, [catalog, cart, sales]);

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );
  const cartVat = Math.round(cartSubtotal * VAT_RATE);
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

  function recordSale(
    payment: PaymentMethod,
    customer = "Walk-in Customer",
    channel = "Checkout"
  ): Sale | null {
    if (cart.length === 0) return null;

    const sale: Sale = {
      id: `SALE-${1000 + sales.length + 1}`,
      customer,
      channel,
      payment,
      items: cart,
      subtotal: cartSubtotal,
      vat: cartVat,
      total: cartTotal,
      time: formatNow(),
    };

    setSales((current) => [sale, ...current]);
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
