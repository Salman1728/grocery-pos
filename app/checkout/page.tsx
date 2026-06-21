"use client";

import { useMemo, useRef, useState } from "react";
import { Search, ScanLine, Plus, CheckCircle2, X } from "lucide-react";
import {
  categories,
  paymentMethods,
  paymentSettingKey,
  type CatalogItem,
  type PaymentMethod,
} from "@/lib/flexpos-data";
import { useFlexpos, type Sale } from "@/lib/flexpos-store";
import { ReceiptModal } from "@/components/receipt-modal";
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
    heldSales,
    holdCurrentSale,
    resumeHeldSale,
    discardHeldSale,
    cartSubtotal,
    cartVat,
    cartTotal,
    customers,
    selectedCustomerId,
    selectCustomer,
    businessMode,
    setBusinessMode,
    settings,
    businessName,
    recordSale,
  } = useFlexpos();

  const enabledPaymentMethods = paymentMethods.filter(
    (method) => settings[paymentSettingKey[method]]
  );
  // Never leave checkout with zero ways to pay.
  const paymentOptions =
    enabledPaymentMethods.length > 0 ? enabledPaymentMethods : paymentMethods;

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [payment, setPayment] = useState<PaymentMethod | null>(null);
  const [notice, setNotice] = useState<SaleNotice | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [receiptSale, setReceiptSale] = useState<Sale | null>(null);

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

  function handleScan() {
    // Hardware barcode scanners type into the focused field.
    searchRef.current?.focus();
  }

  const customPriceValue = Number(customPrice);
  const canAddCustom = customName.trim() !== "" && customPriceValue > 0;

  function addCustomItem() {
    if (!canAddCustom) return;

    const item: CatalogItem = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      type: "Custom",
      category: "Custom",
      price: customPriceValue,
      stock: null,
      stockLabel: "Custom sale",
      mode: businessMode,
      color: "bg-slate-500",
    };

    handleAdd(item);
    setCustomName("");
    setCustomPrice("");
    setShowCustom(false);
  }

  function newSale() {
    clearCart();
    setPayment(null);
    selectCustomer(null);
    setNotice(null);
  }

  function holdSale() {
    const held = holdCurrentSale();
    if (!held) return;

    setPayment(null);
    setNotice({
      tone: "info",
      text: `Sale held · ${money(held.total)} (${held.count} item${
        held.count > 1 ? "s" : ""
      })`,
    });
  }

  function resume(id: string) {
    resumeHeldSale(id);
    setNotice(null);
  }

  function completeSale() {
    if (cart.length === 0 || !payment) return;

    const sale = recordSale(payment);
    if (!sale) return;

    setPayment(null);
    setReceiptSale(sale);
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
      {receiptSale ? (
        <ReceiptModal
          sale={receiptSale}
          businessName={businessName}
          onClose={() => setReceiptSale(null)}
        />
      ) : null}

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
                ref={searchRef}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                placeholder="Search item, scan barcode, enter SKU, or add custom sale..."
              />
            </div>

            <button
              type="button"
              onClick={handleScan}
              className="flex items-center justify-center gap-2 rounded-3xl bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-sm transition hover:bg-slate-800"
            >
              <ScanLine className="h-5 w-5" />
              Scan
            </button>

            <button
              type="button"
              onClick={() => setShowCustom((open) => !open)}
              className="flex items-center justify-center gap-2 rounded-3xl bg-emerald-600 px-6 py-4 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700"
            >
              <Plus className="h-5 w-5" />
              Custom Item
            </button>
          </div>

          {showCustom ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <label className="block flex-1">
                  <span className="mb-1 block text-xs font-bold text-slate-600">
                    Custom item name
                  </span>
                  <input
                    value={customName}
                    onChange={(event) => setCustomName(event.target.value)}
                    placeholder="e.g. Repair service"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400"
                  />
                </label>

                <label className="block sm:w-40">
                  <span className="mb-1 block text-xs font-bold text-slate-600">
                    Price (KES)
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={customPrice}
                    onChange={(event) => setCustomPrice(event.target.value)}
                    placeholder="0"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400"
                  />
                </label>

                <FlexposButton onClick={addCustomItem} disabled={!canAddCustom}>
                  Add to Cart
                </FlexposButton>
              </div>
            </div>
          ) : null}

          {heldSales.length > 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-bold text-slate-950">
                Held sales ({heldSales.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {heldSales.map((held) => (
                  <div
                    key={held.id}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2"
                  >
                    <div>
                      <p className="text-xs font-black text-slate-950">
                        {money(held.total)}
                      </p>
                      <p className="text-[11px] font-medium text-slate-500">
                        {held.count} item{held.count > 1 ? "s" : ""} · {held.time}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => resume(held.id)}
                      className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-black text-white transition hover:bg-emerald-700"
                    >
                      Resume
                    </button>
                    <button
                      type="button"
                      aria-label="Discard held sale"
                      onClick={() => discardHeldSale(held.id)}
                      className="rounded-xl border border-slate-200 bg-white p-1.5 text-slate-400 transition hover:border-red-200 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <BusinessModeSwitcher
            activeMode={businessMode}
            onSelect={setBusinessMode}
          />

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
            methods={paymentOptions}
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
