import { AlertTriangle, Boxes, PackageCheck, Truck } from "lucide-react";
import { inventoryRows } from "@/lib/flexpos-data";
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposCard } from "@/components/flexpos-card";
import { FlexposButton } from "@/components/flexpos-button";

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
    <FlexposPageShell
      title="Inventory Control"
      description="Track stock, expiry dates, suppliers, purchase orders, branch transfers, and reorder alerts."
      action={
        <div className="flex gap-3">
          <FlexposButton variant="secondary">Transfer Stock</FlexposButton>
          <FlexposButton>Receive Stock</FlexposButton>
        </div>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {inventoryStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <FlexposCard key={stat.label} className="p-5">
              <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
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
            </FlexposCard>
          );
        })}
      </section>

      <FlexposCard className="mt-6 overflow-hidden">
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
      </FlexposCard>
    </FlexposPageShell>
  );
}
