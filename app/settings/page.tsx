import {
  Bell,
  Building2,
  CreditCard,
  Lock,
  Printer,
  ReceiptText,
  Settings,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";

const settingsSections = [
  {
    title: "Business Profile",
    description: "Business name, branches, tax details, and operating hours.",
    icon: Building2,
    items: ["Business name", "Branch setup", "KRA / VAT details", "Opening hours"],
  },
  {
    title: "Payments",
    description: "Configure Cash, M-Pesa, Card, and split payment methods.",
    icon: CreditCard,
    items: ["M-Pesa Till / Paybill", "Card terminal", "Cash drawer", "Split payments"],
  },
  {
    title: "Receipts",
    description: "Receipt printing, PDF receipts, WhatsApp, and SMS settings.",
    icon: ReceiptText,
    items: ["Receipt template", "Printer setup", "WhatsApp receipts", "SMS receipts"],
  },
  {
    title: "Users & Roles",
    description: "Manage cashiers, managers, admins, and permissions.",
    icon: Users,
    items: ["Cashiers", "Managers", "Admin access", "Role permissions"],
  },
  {
    title: "Security",
    description: "PIN login, refunds approval, shift controls, and audit logs.",
    icon: ShieldCheck,
    items: ["PIN login", "Refund approval", "Audit logs", "Shift close rules"],
  },
  {
    title: "Notifications",
    description: "Low stock alerts, expiry alerts, sales summaries, and reminders.",
    icon: Bell,
    items: ["Low stock alerts", "Expiry alerts", "Daily reports", "Manager alerts"],
  },
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-700">
              FlexPOS
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              Settings
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Configure your multi-purpose POS for grocery, café, retail,
              pharmacy, salon, and service businesses.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm">
            <Settings className="h-5 w-5" />
            Save Settings
          </button>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {settingsSections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="mt-6 text-xl font-black text-slate-950">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {section.description}
                </p>

                <div className="mt-5 space-y-2">
                  {section.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                    >
                      <span className="text-sm font-bold text-slate-600">
                        {item}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500">
                        Edit
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-6 grid gap-4 xl:grid-cols-3">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
              <Printer className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-xl font-black text-slate-950">
              Hardware Setup
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Connect barcode scanners, receipt printers, cash drawers, and
              weighing scales.
            </p>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
              <Smartphone className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-xl font-black text-slate-950">
              Mobile POS
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Tablet and phone cashier mode for restaurants, salons, and pop-up
              shops.
            </p>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-xl font-black text-slate-950">
              Offline Mode
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Keep selling even when internet is unstable, then sync later.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
