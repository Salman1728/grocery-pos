import { Search, ScanLine, Plus } from "lucide-react";
import {
  catalogItems,
  categories,
  starterCart,
} from "@/lib/flexpos-data";
import { BusinessModeSwitcher } from "@/components/pos/business-mode-switcher";
import { ItemCard } from "@/components/pos/item-card";
import { CartPanel } from "@/components/pos/cart-panel";
import { PaymentButtons } from "@/components/pos/payment-buttons";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-700">
              FlexPOS
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              Universal Checkout
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              A multi-purpose POS for grocery, café, retail, pharmacy, salon,
              and service businesses.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm">
              Hold Sale
            </button>
            <button className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm">
              New Sale
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <section className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                  placeholder="Search item, scan barcode, enter SKU, or add custom sale..."
                />
              </div>

              <button className="flex items-center justify-center gap-2 rounded-3xl bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-sm">
                <ScanLine className="h-5 w-5" />
                Scan
              </button>

              <button className="flex items-center justify-center gap-2 rounded-3xl bg-emerald-600 px-6 py-4 text-sm font-black text-white shadow-sm">
                <Plus className="h-5 w-5" />
                Custom Item
              </button>
            </div>

            <BusinessModeSwitcher activeMode="Grocery" />

            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    index === 0
                      ? "bg-emerald-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {catalogItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <CartPanel items={starterCart} />
            <PaymentButtons />
          </section>
        </div>
      </div>
    </main>
  );
}
