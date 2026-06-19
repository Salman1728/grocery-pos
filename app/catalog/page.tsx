import { Plus, Search } from "lucide-react";
import { catalogItems } from "@/lib/flexpos-data";
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposCard } from "@/components/flexpos-card";
import { FlexposButton } from "@/components/flexpos-button";

export default function CatalogPage() {
  return (
    <FlexposPageShell
      title="Catalog Management"
      description="Manage products, food items, medicines, services, variants, prices, and business categories."
      action={
        <FlexposButton>
          <span className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Item
          </span>
        </FlexposButton>
      }
    >
      <FlexposCard className="mb-6 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 lg:w-[520px]">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              placeholder="Search catalog item, SKU, barcode, category..."
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Products", "Food", "Medicine", "Services", "Low Stock"].map(
              (filter, index) => (
                <button
                  key={filter}
                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                    index === 0
                      ? "bg-emerald-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>
      </FlexposCard>

      <FlexposCard className="overflow-hidden">
        <div className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.7fr_0.9fr_0.7fr] border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500">
          <span>Item</span>
          <span>Type</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock / Duration</span>
          <span>Status</span>
        </div>

        {catalogItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.7fr_0.9fr_0.7fr] items-center border-b border-slate-100 px-6 py-5 text-sm last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.color} font-black text-white`}
              >
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="font-black text-slate-950">{item.name}</p>
                <p className="text-xs font-medium text-slate-500">
                  {item.mode} mode
                </p>
              </div>
            </div>

            <span className="font-bold text-slate-600">{item.type}</span>
            <span className="font-bold text-slate-600">{item.category}</span>
            <span className="font-black text-emerald-700">
              KES {item.price.toLocaleString()}
            </span>
            <span className="font-bold text-slate-500">{item.stockLabel}</span>
            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              Active
            </span>
          </div>
        ))}
      </FlexposCard>
    </FlexposPageShell>
  );
}
