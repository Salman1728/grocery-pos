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
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposCard } from "@/components/flexpos-card";
import { FlexposButton } from "@/components/flexpos-button";

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

const hardwareSections = [
  {
    title: "Hardware Setup",
    description:
      "Connect barcode scanners, receipt printers, cash drawers, and weighing scales.",
    icon: Printer,
  },
  {
    title: "Mobile POS",
    description:
      "Tablet and phone cashier mode for restaurants, salons, and pop-up shops.",
    icon: Smartphone,
  },
  {
    title: "Offline Mode",
    description:
      "Keep selling even when internet is unstable, then sync later.",
    icon: Lock,
  },
];

export default function SettingsPage() {
  return (
    <FlexposPageShell
      title="Settings"
      description="Configure your multi-purpose POS for grocery, café, retail, pharmacy, salon, and service businesses."
      action={
        <FlexposButton>
          <span className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Save Settings
          </span>
        </FlexposButton>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {settingsSections.map((section) => {
          const Icon = section.icon;

          return (
            <FlexposCard key={section.title} className="p-6">
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
            </FlexposCard>
          );
        })}
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-3">
        {hardwareSections.map((section) => {
          const Icon = section.icon;

          return (
            <FlexposCard key={section.title} className="p-6">
              <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <Icon className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-xl font-black text-slate-950">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {section.description}
              </p>
            </FlexposCard>
          );
        })}
      </section>
    </FlexposPageShell>
  );
}
