"use client";

import { useMemo, useState } from "react";
import { Search, ScanLine, Plus, CheckCircle2, X } from "lucide-react";
import {
  categories,
  type CatalogItem,
  type PaymentMethod,
} from "@/lib/flexpos-data";
import { useFlexpos } from "@/lib/flexpos-store";
import { BusinessModeSwitcher } from "@/components/pos/business-mode-switcher";
import { ItemCard } from "@/components/pos/item-card";
import { CartPanel } from "@/components/pos/cart-panel";
import { PaymentButtons } from "@/components/pos/payment-buttons";
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposButton } from "@/components/flexpos-button";

function money(value: number) {
  return `KES ${Math.round(value).toLocaleString()}`;
}

type SaleNotice = {
  tone: "success" | "info";
  text: string;
};

export default function CheckoutPage() {
  const {
    catalog,
    cart,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartVat,
    cartTotal,
    customers,
    selectedCustomerId,
    selectCustomer,
    recordSale,
  } = useFlexpos();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [payment, setPayment] = useState<PaymentMethod | null>(null);
  const [notice, setNotice] = useState<SaleNotice | null>(null);

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();

    return catalog.filter((item) => {
      const categoryMatch =
        activeCategory === "All" || item.category === activeCategory;

      const searchMatch =
        term === "" ||
        item.name.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term);

      return categoryMatch && searchMatch;
    });
  }, [catalog, search, activeCategory]);

  function handleAdd(item: CatalogItem) {
    setNotice(null);
    addToCart(item);
  }

  function newSale() {
    clearCart();
    setPayment(null);
    selectCustomer(null);
    setNotice(null);
  }

  function holdSale() {
    if (cart.length === 0) return;

    const heldTotal = cartTotal;
    const heldCount = cart.length;

    clearCart();
    setPayment(null);
    setNotice({
      tone: "info",
      text: `Sale held · ${money(heldTotal)} (${heldCount} item${
        heldCount > 1 ? "s" : ""
      })`,
    });
  }

  function completeSale() {
    if (cart.length === 0 || !payment) return;

    const sale = recordSale(payment);
    if (!sale) return;

    setPayment(null);
    setNotice({
      tone: "success",
      text: `Sale ${sale.id} completed · ${money(sale.total)} paid via ${
        sale.payment
      }`,
    });
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
                <ItemCard key={item.id} item={item} onAdd={handleAdd} />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <CartPanel
            items={cart}
            subtotal={cartSubtotal}
            vat={cartVat}
            total={cartTotal}
            customers={customers}
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={selectCustomer}
            onIncrease={(id) => changeQuantity(id, 1)}
            onDecrease={(id) => changeQuantity(id, -1)}
            onRemove={removeFromCart}
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
