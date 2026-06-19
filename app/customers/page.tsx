import { MessageCircle, Plus, Search, Star, Users, Wallet } from "lucide-react";
import { customers } from "@/lib/flexpos-data";
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposCard } from "@/components/flexpos-card";
import { FlexposButton } from "@/components/flexpos-button";

const customerStats = [
  {
    label: "Customers",
    value: "1,284",
    note: "+64 this month",
    icon: Users,
  },
  {
    label: "Loyalty Points",
    value: "96,500",
    note: "Issued total",
    icon: Star,
  },
  {
    label: "Credit Sales",
    value: "KES 48,200",
    note: "Outstanding",
    icon: Wallet,
  },
  {
    label: "WhatsApp Receipts",
    value: "72%",
    note: "Preferred channel",
    icon: MessageCircle,
  },
];

export default function CustomersPage() {
  return (
    <FlexposPageShell
      title="Customers & Loyalty"
      description="Manage customer profiles, loyalty points, credit sales, purchase history, and WhatsApp receipts."
      action={
        <FlexposButton>
          <span className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Customer
          </span>
        </FlexposButton>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {customerStats.map((stat) => {
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

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <FlexposCard className="p-6">
          <div className="mb-5 flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              placeholder="Search customer by name, phone, points, or credit balance..."
            />
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <div className="grid grid-cols-[1.2fr_1fr_0.8fr_0.8fr_0.6fr] bg-slate-50 px-5 py-4 text-xs font-black uppercase tracking-wide text-slate-500">
              <span>Customer</span>
              <span>Phone</span>
              <span>Last Visit</span>
              <span>Spend</span>
              <span>Points</span>
            </div>

            {customers.map((customer) => (
              <div
                key={customer.phone}
                className="grid grid-cols-[1.2fr_1fr_0.8fr_0.8fr_0.6fr] items-center border-t border-slate-100 px-5 py-5 text-sm"
              >
                <span className="font-black text-slate-950">
                  {customer.name}
                </span>
                <span className="font-bold text-slate-500">
                  {customer.phone}
                </span>
                <span className="font-bold text-slate-600">
                  {customer.lastVisit}
                </span>
                <span className="font-black text-emerald-700">
                  {customer.spend}
                </span>
                <span className="font-black text-slate-950">
                  {customer.points}
                </span>
              </div>
            ))}
          </div>
        </FlexposCard>

        <FlexposCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-600 text-2xl font-black text-white">
              A
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-950">
                Amina Ali
              </h2>
              <p className="text-sm font-medium text-slate-500">
                0712 000 111
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {[
              ["Lifetime Spend", "KES 8,400"],
              ["Loyalty Points", "840"],
              ["Last Purchase", "Today"],
              ["Preferred Receipt", "WhatsApp"],
              ["Credit Balance", "KES 0"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
              >
                <span className="text-sm font-bold text-slate-500">
                  {label}
                </span>
                <span className="text-sm font-black text-slate-950">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-black text-white shadow-sm">
            Send WhatsApp Receipt
          </button>
        </FlexposCard>
      </section>
    </FlexposPageShell>
  );
}
