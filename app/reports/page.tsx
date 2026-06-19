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
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-700">
              FlexPOS
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              Reports & Analytics
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Analyze sales, inventory, payments, staff performance, taxes,
              products, and business growth.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm">
            <Download className="h-5 w-5" />
            Export Reports
          </button>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reportCards.map((report) => {
            const Icon = report.icon;

            return (
              <article
                key={report.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
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
              </article>
            );
          })}
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
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
              <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm">
                <FileSpreadsheet className="h-5 w-5" />
                Excel
              </button>

              <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-sm">
                PDF Summary
              </button>
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
        </section>
      </div>
    </main>
  );
}
