import { CalendarDays, Download, ReceiptText, RefreshCw, Search } from "lucide-react";

const sales = [
  {
    id: "SALE-1001",
    customer: "Walk-in Customer",
    channel: "Checkout",
    payment: "M-Pesa",
    amount: "KES 2,100",
    status: "Completed",
    time: "Today, 10:42 AM",
  },
  {
    id: "SALE-1002",
    customer: "Amina Ali",
    channel: "Checkout",
    payment: "Cash",
    amount: "KES 840",
    status: "Completed",
    time: "Today, 11:18 AM",
  },
  {
    id: "SALE-1003",
    customer: "John Mwangi",
    channel: "Cafe Order",
    payment: "Card",
    amount: "KES 1,450",
    status: "Completed",
    time: "Today, 12:05 PM",
  },
  {
    id: "SALE-1004",
    customer: "Walk-in Customer",
    channel: "Retail",
    payment: "Split",
    amount: "KES 3,250",
    status: "Completed",
    time: "Today, 1:22 PM",
  },
];

const salesStats = [
  {
    label: "Gross Sales",
    value: "KES 84,230",
    note: "+12.4% today",
  },
  {
    label: "Transactions",
    value: "312",
    note: "Across all modes",
  },
  {
    label: "Average Sale",
    value: "KES 270",
    note: "Per transaction",
  },
  {
    label: "Refunds",
    value: "KES 2,400",
    note: "3 refunds",
  },
];

export default function SalesPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-700">
              FlexPOS
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              Sales History
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              View completed transactions, payment methods, refunds, receipts,
              and sales activity across all business modes.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm">
              <CalendarDays className="h-5 w-5" />
              Today
            </button>

            <button className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm">
              <Download className="h-5 w-5" />
              Export
            </button>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {salesStats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <ReceiptText className="h-6 w-6" />
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
          ))}
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 lg:w-[520px]">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                placeholder="Search sale ID, customer, payment, or receipt..."
              />
            </div>

            <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm">
              <RefreshCw className="h-5 w-5" />
              Refresh
            </button>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-[0.8fr_1.1fr_0.9fr_0.8fr_0.8fr_0.8fr_1fr] border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500">
            <span>Sale ID</span>
            <span>Customer</span>
            <span>Channel</span>
            <span>Payment</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Time</span>
          </div>

          {sales.map((sale) => (
            <div
              key={sale.id}
              className="grid grid-cols-[0.8fr_1.1fr_0.9fr_0.8fr_0.8fr_0.8fr_1fr] items-center border-b border-slate-100 px-6 py-5 text-sm last:border-b-0"
            >
              <span className="font-black text-slate-950">{sale.id}</span>
              <span className="font-bold text-slate-600">{sale.customer}</span>
              <span className="font-bold text-slate-500">{sale.channel}</span>
              <span className="font-bold text-slate-600">{sale.payment}</span>
              <span className="font-black text-emerald-700">{sale.amount}</span>
              <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                {sale.status}
              </span>
              <span className="font-bold text-slate-500">{sale.time}</span>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
