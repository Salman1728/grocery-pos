"use client";

import { useMemo, useState } from "react";
import { Search, ScanLine, Plus, CheckCircle2, X } from "lucide-react";
import {
  catalogItems,
  categories,
  starterCart,
  type CartItem,
  type CatalogItem,
  type PaymentMethod,
} from "@/lib/flexpos-data";
import { BusinessModeSwitcher } from "@/components/pos/business-mode-switcher";
import { ItemCard } from "@/components/pos/item-card";
import { CartPanel } from "@/components/pos/cart-panel";
import { PaymentButtons } from "@/components/pos/payment-buttons";
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposButton } from "@/components/flexpos-button";

const VAT_RATE = 0.16;

function money(value: number) {
  return `KES ${Math.round(value).toLocaleString()}`;
}

type SaleNotice = {
  tone: "success" | "info";
  text: string;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>(starterCart);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [payment, setPayment] = useState<PaymentMethod | null>(null);
  const [notice, setNotice] = useState<SaleNotice | null>(null);

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();

    return catalogItems.filter((item) => {
      const categoryMatch =
        activeCategory === "All" || item.category === activeCategory;

      const searchMatch =
        term === "" ||
        item.name.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term);

      return categoryMatch && searchMatch;
    });
  }, [search, activeCategory]);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );
  const vat = Math.round(subtotal * VAT_RATE);
  const total = subtotal + vat;

  function addToCart(item: CatalogItem) {
    setNotice(null);
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

  function removeItem(id: string) {
    setCart((items) => items.filter((line) => line.id !== id));
  }

  function newSale() {
    setCart([]);
    setPayment(null);
    setNotice(null);
  }

  function holdSale() {
    if (cart.length === 0) return;

    setNotice({
      tone: "info",
      text: `Sale held · ${money(total)} (${cart.length} item${
        cart.length > 1 ? "s" : ""
      })`,
    });
    setCart([]);
    setPayment(null);
  }

  function completeSale() {
    if (cart.length === 0 || !payment) return;

    setNotice({
      tone: "success",
      text: `Sale completed · ${money(total)} paid via ${payment}`,
    });
    setCart([]);
    setPayment(null);
  }

  return (
    <FlexposPageShell
      title="Universal Checkout"
      description="A multi-purpose POS for grocery, café, retail, pharmacy, salon, and service businesses."
      action={
        <div className="flex gap-3">
          <FlexposButton
            variant="secondary"
            onClick={holdSale}
            disabled={cart.length === 0}
          >
            Hold Sale
          </FlexposButton>
          <FlexposButton onClick={newSale}>New Sale</FlexposButton>
        </div>
      }
    >
      {notice ? (
        <div
          className={`mb-6 flex items-center justify-between gap-3 rounded-3xl border px-5 py-4 ${
            notice.tone === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-slate-200 bg-white text-slate-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <p className="text-sm font-bold">{notice.text}</p>
          </div>

          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setNotice(null)}
            className="rounded-full p-1 opacity-70 transition hover:bg-black/5 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <section className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                placeholder="Search item, scan barcode, enter SKU, or add custom sale..."
              />
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-3xl bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-sm"
            >
              <ScanLine className="h-5 w-5" />
              Scan
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-3xl bg-emerald-600 px-6 py-4 text-sm font-black text-white shadow-sm"
            >
              <Plus className="h-5 w-5" />
              Custom Item
            </button>
          </div>

          <BusinessModeSwitcher activeMode="Grocery" />

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = category === activeCategory;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {filteredItems.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <p className="text-sm font-bold text-slate-600">
                No items match your search
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Try a different category or search term.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} onAdd={addToCart} />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <CartPanel
            items={cart}
            subtotal={subtotal}
            vat={vat}
            total={total}
            onIncrease={(id) => changeQuantity(id, 1)}
            onDecrease={(id) => changeQuantity(id, -1)}
            onRemove={removeItem}
          />
          <PaymentButtons
            selected={payment}
            onSelect={setPayment}
            onComplete={completeSale}
            canComplete={cart.length > 0 && payment !== null}
          />
        </section>
      </div>
    </FlexposPageShell>
  );
}
