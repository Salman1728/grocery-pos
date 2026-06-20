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
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposCard } from "@/components/flexpos-card";
import { FlexposButton } from "@/components/flexpos-button";

const reportCards = [
  {
    title: "Sales Report",
    description: "Daily, weekly, and monthly revenue performance.",
    icon: TrendingUp,
  },
  {
    title: "Payment Report",
    description: "Cash, M-Pesa, card, and split payment summaries.",
    icon: CreditCard,
  },
  {
    title: "Inventory Report",
    description: "Stock value, low stock, expiry, and movement reports.",
    icon: PackageSearch,
  },
  {
    title: "Staff Report",
    description: "Cashier sales, shifts, refunds, and performance.",
    icon: Users,
  },
  {
    title: "Tax Report",
    description: "VAT summaries, tax exports, and accountant files.",
    icon: ReceiptText,
  },
  {
    title: "Product Report",
    description: "Best sellers, slow movers, margins, and categories.",
    icon: BarChart3,
  },
];

export default function ReportsPage() {
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
              <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <Icon className="h-6 w-6" />
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
          {[
            ["Gross Sales", "KES 1.42M"],
            ["Net Sales", "KES 1.18M"],
            ["VAT Collected", "KES 188,800"],
            ["Refunds", "KES 12,400"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-bold text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-black text-slate-950">
                {value}
              </p>
            </div>
          ))}
        </div>
      </FlexposCard>
    </FlexposPageShell>
  );
}
