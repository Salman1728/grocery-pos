"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Download,
  ReceiptText,
  RefreshCw,
  Search,
} from "lucide-react";
import { useFlexpos } from "@/lib/flexpos-store";
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposCard } from "@/components/flexpos-card";
import { FlexposButton } from "@/components/flexpos-button";

function money(value: number) {
  return `KES ${Math.round(value).toLocaleString()}`;
}

export default function SalesPage() {
  const { sales, salesSummary } = useFlexpos();
  const [search, setSearch] = useState("");

  const salesStats: [string, string, string][] = [
    ["Gross Sales", money(salesSummary.gross), "All recorded sales"],
    ["Transactions", String(salesSummary.count), "Across all modes"],
    ["Average Sale", money(salesSummary.average), "Per transaction"],
    ["M-Pesa Collected", money(salesSummary.mpesa), "Mobile payments"],
  ];

  const filteredSales = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (term === "") return sales;

    return sales.filter((sale) =>
      [sale.id, sale.customer, sale.payment, sale.channel]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [sales, search]);

  return (
    <FlexposPageShell
      title="Sales History"
      description="View completed transactions, payment methods, refunds, receipts, and sales activity across all business modes."
      action={
        <div className="flex gap-3">
          <FlexposButton variant="secondary">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Today
            </span>
          </FlexposButton>

          <FlexposButton>
            <span className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export
            </span>
          </FlexposButton>
        </div>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {salesStats.map(([label, value, note]) => (
          <FlexposCard key={label} className="p-5">
            <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
              <ReceiptText className="h-6 w-6" />
            </div>

            <p className="mt-6 text-sm font-semibold text-slate-500">{label}</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">{value}</h2>
            <p className="mt-2 text-xs font-bold text-emerald-700">{note}</p>
          </FlexposCard>
        ))}
      </section>

      <FlexposCard className="mt-6 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 lg:w-[520px]">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              placeholder="Search sale ID, customer, payment, or receipt..."
            />
          </div>

          <FlexposButton variant="secondary" onClick={() => setSearch("")}>
            <span className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Reset
            </span>
          </FlexposButton>
        </div>
      </FlexposCard>

      <FlexposCard className="mt-6 overflow-hidden">
        <div className="grid grid-cols-[0.8fr_1.1fr_0.9fr_0.8fr_0.8fr_0.8fr_1fr] border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500">
          <span>Sale ID</span>
          <span>Customer</span>
          <span>Channel</span>
          <span>Payment</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Time</span>
        </div>

        {filteredSales.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-bold text-slate-600">No sales found</p>
            <p className="mt-1 text-xs text-slate-400">
              Complete a sale at checkout or adjust your search.
            </p>
          </div>
        ) : (
          filteredSales.map((sale) => (
            <div
              key={sale.id}
              className="grid grid-cols-[0.8fr_1.1fr_0.9fr_0.8fr_0.8fr_0.8fr_1fr] items-center border-b border-slate-100 px-6 py-5 text-sm last:border-b-0"
            >
              <span className="font-black text-slate-950">{sale.id}</span>
              <span className="font-bold text-slate-600">{sale.customer}</span>
              <span className="font-bold text-slate-500">{sale.channel}</span>
              <span className="font-bold text-slate-600">{sale.payment}</span>
              <span className="font-black text-emerald-700">
                {money(sale.total)}
              </span>
              <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                Completed
              </span>
              <span className="font-bold text-slate-500">{sale.time}</span>
            </div>
          ))
        )}
      </FlexposCard>
    </FlexposPageShell>
  );
}
