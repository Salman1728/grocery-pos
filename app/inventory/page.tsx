"use client";

import { AlertTriangle, Boxes, Layers, PackageCheck } from "lucide-react";
import {
  LOW_STOCK_THRESHOLD,
  isLowStock,
  stockCount,
  type CatalogItem,
} from "@/lib/flexpos-data";
import { useFlexpos } from "@/lib/flexpos-store";
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposCard } from "@/components/flexpos-card";
import { FlexposButton } from "@/components/flexpos-button";

function money(value: number) {
  return `KES ${Math.round(value).toLocaleString()}`;
}

type StockStatus = {
  label: string;
  className: string;
};

function stockStatus(item: CatalogItem): StockStatus {
  const count = stockCount(item);

  if (count === null) {
    return {
      label: "Not tracked",
      className: "bg-slate-100 text-slate-500",
    };
  }

  if (isLowStock(item)) {
    return { label: "Low stock", className: "bg-amber-50 text-amber-700" };
  }

  return { label: "In stock", className: "bg-emerald-50 text-emerald-700" };
}

export default function InventoryPage() {
  const { catalog } = useFlexpos();

  const tracked = catalog.filter((item) => stockCount(item) !== null);
  const lowStockCount = catalog.filter(isLowStock).length;
  const inventoryValue = tracked.reduce(
    (sum, item) => sum + item.price * (stockCount(item) ?? 0),
    0
  );

  const inventoryStats = [
    {
      label: "Low Stock",
      value: String(lowStockCount),
      note: "Needs reorder",
      icon: AlertTriangle,
    },
    {
      label: "Tracked Items",
      value: String(tracked.length),
      note: "With stock counts",
      icon: PackageCheck,
    },
    {
      label: "Inventory Value",
      value: money(inventoryValue),
      note: "At current stock",
      icon: Boxes,
    },
    {
      label: "Catalog Items",
      value: String(catalog.length),
      note: "All product types",
      icon: Layers,
    },
  ];

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
        <div className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.9fr_0.9fr_0.8fr] border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500">
          <span>Product</span>
          <span>Category</span>
          <span>Mode</span>
          <span>Available</span>
          <span>Reorder Level</span>
          <span>Status</span>
        </div>

        {catalog.map((item) => {
          const count = stockCount(item);
          const status = stockStatus(item);

          return (
            <div
              key={item.id}
              className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.9fr_0.9fr_0.8fr] items-center border-b border-slate-100 px-6 py-5 text-sm last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${item.color} font-black text-white`}
                >
                  {item.name.charAt(0)}
                </div>
                <span className="font-black text-slate-950">{item.name}</span>
              </div>

              <span className="font-bold text-slate-600">{item.category}</span>
              <span className="font-bold text-slate-500">{item.mode}</span>
              <span className="font-black text-emerald-700">
                {count !== null ? `${count} units` : item.stockLabel}
              </span>
              <span className="font-bold text-slate-600">
                {count !== null ? `${LOW_STOCK_THRESHOLD} units` : "—"}
              </span>
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-black ${status.className}`}
              >
                {status.label}
              </span>
            </div>
          );
        })}
      </FlexposCard>
    </FlexposPageShell>
  );
}
