"use client";

import {
  BarChart3,
  CreditCard,
  Download,
  FileSpreadsheet,
  PackageSearch,
  ReceiptText,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  paymentMethods,
  stockCount,
  type PaymentMethod,
} from "@/lib/flexpos-data";
import { useFlexpos } from "@/lib/flexpos-store";
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposCard } from "@/components/flexpos-card";
import { FlexposButton } from "@/components/flexpos-button";

function money(value: number) {
  return `KES ${Math.round(value).toLocaleString()}`;
}

export default function ReportsPage() {
  const { sales, salesSummary, catalog } = useFlexpos();

  const vatCollected = sales.reduce((sum, sale) => sum + sale.vat, 0);
  const netSales = sales.reduce((sum, sale) => sum + sale.subtotal, 0);
  const inventoryValue = catalog.reduce(
    (sum, item) => sum + item.price * (stockCount(item) ?? 0),
    0
  );

  const byMethod = paymentMethods.map((method) => {
    const total = sales
      .filter((sale) => sale.payment === method)
      .reduce((sum, sale) => sum + sale.total, 0);
    const share =
      salesSummary.gross > 0
        ? Math.round((total / salesSummary.gross) * 100)
        : 0;
    return { method, total, share };
  });

  const topMethod = byMethod.reduce<{ method: PaymentMethod; total: number }>(
    (best, current) => (current.total > best.total ? current : best),
    { method: "Cash", total: 0 }
  );

  const reportCards = [
    {
      title: "Sales Report",
      description: "Daily, weekly, and monthly revenue performance.",
      value: money(salesSummary.gross),
      icon: TrendingUp,
    },
    {
      title: "Payment Report",
      description: "Cash, M-Pesa, card, and split payment summaries.",
      value: `${topMethod.method} leads · ${money(topMethod.total)}`,
      icon: CreditCard,
    },
    {
      title: "Inventory Report",
      description: "Stock value, low stock, expiry, and movement reports.",
      value: money(inventoryValue),
      icon: PackageSearch,
    },
    {
      title: "Staff Report",
      description: "Cashier sales, shifts, refunds, and performance.",
      value: `${salesSummary.count} transactions`,
      icon: Users,
    },
    {
      title: "Tax Report",
      description: "VAT summaries, tax exports, and accountant files.",
      value: money(vatCollected),
      icon: ReceiptText,
    },
    {
      title: "Product Report",
      description: "Best sellers, slow movers, margins, and categories.",
      value: `${catalog.length} catalog items`,
      icon: BarChart3,
    },
  ];

  const summary: [string, string][] = [
    ["Gross Sales", money(salesSummary.gross)],
    ["Net Sales", money(netSales)],
    ["VAT Collected", money(vatCollected)],
    ["M-Pesa Collected", money(salesSummary.mpesa)],
  ];

  return (
    <FlexposPageShell
      title="Reports & Analytics"
      description="Analyze sales, inventory, payments, staff performance, taxes, products, and business growth."
      action={
        <FlexposButton>
          <span className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Reports
          </span>
        </FlexposButton>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reportCards.map((report) => {
          const Icon = report.icon;

          return (
            <FlexposCard key={report.title} className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                  {report.value}
                </span>
              </div>

              <h2 className="mt-6 text-xl font-black text-slate-950">
                {report.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {report.description}
              </p>

              <button className="mt-6 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white">
                Open Report
              </button>
            </FlexposCard>
          );
        })}
      </section>

      <FlexposCard className="mt-6 p-6">
        <h2 className="text-2xl font-black text-slate-950">Payments by Method</h2>
        <p className="mt-1 text-sm text-slate-500">
          Share of gross sales across each payment type.
        </p>

        <div className="mt-6 space-y-5">
          {byMethod.map((row) => (
            <div key={row.method}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-bold text-slate-700">{row.method}</span>
                <span className="font-black text-emerald-700">
                  {money(row.total)} · {row.share}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-emerald-600"
                  style={{ width: `${row.share}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </FlexposCard>

      <FlexposCard className="mt-6 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-950">
              Accounting & Export Workflow
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-500">
              Export sales summaries, VAT totals, payment settlements,
              inventory valuation, and product performance for accountants,
              managers, and branch owners.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <FlexposButton variant="secondary">
              <span className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Excel
              </span>
            </FlexposButton>

            <FlexposButton variant="dark">PDF Summary</FlexposButton>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summary.map(([label, value]) => (
            <div key={label} className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-bold text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
            </div>
          ))}
        </div>
      </FlexposCard>
    </FlexposPageShell>
  );
}
