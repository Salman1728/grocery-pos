import { AlertTriangle, Boxes, PackageCheck, Truck } from "lucide-react";
import { inventoryRows } from "@/lib/flexpos-data";

const inventoryStats = [
  {
    label: "Low Stock",
    value: "18",
    note: "Needs reorder",
    icon: AlertTriangle,
  },
  {
    label: "Expiring Soon",
    value: "7",
    note: "Food & pharmacy",
    icon: PackageCheck,
  },
  {
    label: "Inventory Value",
    value: "KES 1.8M",
    note: "Across branches",
    icon: Boxes,
  },
  {
    label: "Suppliers",
    value: "42",
    note: "Active suppliers",
    icon: Truck,
  },
];

export default function InventoryPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-700">
              FlexPOS
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              Inventory Control
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Track stock, expiry dates, suppliers, purchase orders, branch
              transfers, and reorder alerts.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm">
              Transfer Stock
            </button>
            <button className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm">
              Receive Stock
            </button>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {inventoryStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700 w-fit">
                  <Icon className="h-6 w-6" />
                </div>

                <p className="mt-6 text-sm font-semibold text-slate-500">
                  {stat.label}
                </p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">
                  {stat.value}
                </h2>
                <p className="mt-2 text-xs font-bold text-emerald-700">
                  {stat.note}
                </p>
              </article>
            );
          })}
        </section>

        <section className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-[1.2fr_0.7fr_1fr_0.8fr_0.8fr_0.9fr_0.7fr] border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500">
            <span>Product</span>
            <span>SKU</span>
            <span>Branch</span>
            <span>Available</span>
            <span>Reorder</span>
            <span>Expiry</span>
            <span>Action</span>
          </div>

          {inventoryRows.map((row) => (
            <div
              key={row.sku}
              className="grid grid-cols-[1.2fr_0.7fr_1fr_0.8fr_0.8fr_0.9fr_0.7fr] items-center border-b border-slate-100 px-6 py-5 text-sm last:border-b-0"
            >
              <span className="font-black text-slate-950">{row.product}</span>
              <span className="font-bold text-slate-500">{row.sku}</span>
              <span className="font-bold text-slate-600">{row.branch}</span>
              <span className="font-black text-emerald-700">{row.available}</span>
              <span className="font-bold text-slate-600">{row.reorder}</span>
              <span className="font-bold text-slate-600">{row.expiry}</span>
              <button className="w-fit rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
                Adjust
              </button>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
