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
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposButton } from "@/components/flexpos-button";

export default function CheckoutPage() {
  return (
    <FlexposPageShell
      title="Universal Checkout"
      description="A multi-purpose POS for grocery, café, retail, pharmacy, salon, and service businesses."
      action={
        <div className="flex gap-3">
          <FlexposButton variant="secondary">Hold Sale</FlexposButton>
          <FlexposButton>New Sale</FlexposButton>
        </div>
      }
    >
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
    </FlexposPageShell>
  );
}
