import { Plus, Search } from "lucide-react";
import { catalogItems } from "@/lib/flexpos-data";

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-700">
              FlexPOS
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              Catalog Management
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Manage products, food items, medicines, services, variants, prices,
              and business categories.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm">
            <Plus className="h-5 w-5" />
            Add Item
          </button>
        </div>

        <section className="mb-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
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
        </section>

        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
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
        </section>
      </div>
    </main>
  );
}
