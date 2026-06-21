"use client";

import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Boxes,
  CreditCard,
  ReceiptText,
} from "lucide-react";
import { businessModes, isLowStock } from "@/lib/flexpos-data";
import { useFlexpos } from "@/lib/flexpos-store";
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposCard } from "@/components/flexpos-card";
import { FlexposButton } from "@/components/flexpos-button";

function money(value: number) {
  return `KES ${Math.round(value).toLocaleString()}`;
}

const quickActions = [
  {
    title: "Open Checkout",
    description: "Start a new sale for any business type.",
    href: "/checkout",
  },
  {
    title: "Add Catalog Item",
    description: "Create a product, service, food item, or medicine.",
    href: "/catalog",
  },
  {
    title: "Receive Stock",
    description: "Update inventory and supplier deliveries.",
    href: "/inventory",
  },
  {
    title: "Add Customer",
    description: "Register loyalty, credit, or WhatsApp receipt customer.",
    href: "/customers",
  },
];

export default function DashboardPage() {
  const { sales, salesSummary, catalog, settings } = useFlexpos();
  const lowStockCount = catalog.filter(isLowStock).length;
  const showLowStockAlert = settings["notif.lowstock"] && lowStockCount > 0;

  const businessMix = businessModes.map((mode) => {
    const total = sales
      .filter((sale) => !sale.refunded && sale.mode === mode)
      .reduce((sum, sale) => sum + sale.total, 0);
    const share =
      salesSummary.gross > 0
        ? Math.round((total / salesSummary.gross) * 100)
        : 0;
    return { label: mode, value: `${share}%` };
  });

  const dashboardStats = [
    {
      label: "Today Sales",
      value: money(salesSummary.gross),
      change: "Live",
    },
    {
      label: "Transactions",
      value: String(salesSummary.count),
      change: "All modes",
    },
    {
      label: "Low Stock",
      value: `${lowStockCount} item${lowStockCount === 1 ? "" : "s"}`,
      change: "Needs review",
    },
    {
      label: "M-Pesa Collected",
      value: money(salesSummary.mpesa),
      change:
        salesSummary.gross > 0
          ? `${Math.round((salesSummary.mpesa / salesSummary.gross) * 100)}% of sales`
          : "0% of sales",
    },
  ];

  return (
    <FlexposPageShell
      title="Business Dashboard"
      description="Multi-branch sales, inventory, payments, staff, and customer performance from one commerce platform."
      action={
        <Link href="/checkout">
          <FlexposButton>Open Checkout</FlexposButton>
        </Link>
      }
    >
      {showLowStockAlert ? (
        <div className="mb-6 flex items-center gap-3 rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-800">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-bold">
            {lowStockCount} item{lowStockCount === 1 ? "" : "s"} low on stock —
            review inventory and reorder.
          </p>
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => {
          const icons = [ReceiptText, CreditCard, Boxes, BarChart3];
          const Icon = icons[index];

          return (
            <FlexposCard key={stat.label} className="p-5">
              <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                  <Icon className="h-6 w-6" />
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                  {stat.change}
                </span>
              </div>

              <p className="mt-6 text-sm font-semibold text-slate-500">
                {stat.label}
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">
                {stat.value}
              </h2>
            </FlexposCard>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <FlexposCard className="p-6">
          <div>
            <h2 className="text-xl font-black text-slate-950">Sales Trend</h2>
            <p className="mt-1 text-sm text-slate-500">
              Illustrative 7-day trend (sample data).
            </p>
          </div>

          <div className="mt-8 flex h-72 items-end gap-5">
            {[90, 150, 120, 210, 170, 240, 195].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-3">
                <div
                  className="w-full rounded-t-2xl bg-emerald-600"
                  style={{ height }}
                />
                <span className="text-xs font-bold text-slate-400">
                  D{index + 1}
                </span>
              </div>
            ))}
          </div>
        </FlexposCard>

        <FlexposCard className="p-6">
          <h2 className="text-xl font-black text-slate-950">
            Business Mode Performance
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sales split across different business types.
          </p>

          <div className="mt-8 space-y-5">
            {businessMix.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-bold text-slate-700">{item.label}</span>
                  <span className="font-black text-emerald-700">
                    {item.value}
                  </span>
                </div>

                <div className="h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-emerald-600"
                    style={{ width: item.value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </FlexposCard>
      </section>

      <FlexposCard className="mt-6 p-6">
        <h2 className="text-xl font-black text-slate-950">Quick Actions</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
            >
              <h3 className="font-black text-slate-950">{action.title}</h3>
              <p className="mt-2 text-sm text-slate-500">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </FlexposCard>
    </FlexposPageShell>
  );
}
