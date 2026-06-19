import { BarChart3, Boxes, CreditCard, ReceiptText } from "lucide-react";
import { dashboardStats } from "@/lib/flexpos-data";

const quickActions = [
  {
    title: "Open Checkout",
    description: "Start a new sale for any business type.",
  },
  {
    title: "Add Catalog Item",
    description: "Create a product, service, food item, or medicine.",
  },
  {
    title: "Receive Stock",
    description: "Update inventory and supplier deliveries.",
  },
  {
    title: "Add Customer",
    description: "Register loyalty, credit, or WhatsApp receipt customer.",
  },
];

const businessMix = [
  { label: "Grocery", value: "43%" },
  { label: "Cafe", value: "24%" },
  { label: "Retail", value: "17%" },
  { label: "Pharmacy", value: "9%" },
  { label: "Salon", value: "7%" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-700">
              FlexPOS
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              Business Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Multi-branch sales, inventory, payments, staff, and customer
              performance from one commerce platform.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/checkout"
              className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm"
            >
              Open Checkout
            </a>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat, index) => {
            const icons = [ReceiptText, CreditCard, Boxes, BarChart3];
            const Icon = icons[index];

            return (
              <article
                key={stat.label}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
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
              </article>
            );
          })}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-black text-slate-950">
                Sales Trend
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Last 7 days across Cash, M-Pesa, Card, and Split payments.
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
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
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
                    <span className="font-bold text-slate-700">
                      {item.label}
                    </span>
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
          </article>
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">Quick Actions</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => (
              <article
                key={action.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="font-black text-slate-950">{action.title}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  {action.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
