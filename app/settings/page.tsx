"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Building2,
  CheckCircle2,
  CreditCard,
  Lock,
  Printer,
  ReceiptText,
  Settings,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";
import { useFlexpos } from "@/lib/flexpos-store";
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposCard } from "@/components/flexpos-card";
import { FlexposButton } from "@/components/flexpos-button";

const settingsSections = [
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
  const { businessName, setBusinessName, vatRate, setVatRate } = useFlexpos();

  const [nameDraft, setNameDraft] = useState(businessName);
  const [vatDraft, setVatDraft] = useState(String(Math.round(vatRate * 100)));
  const [saved, setSaved] = useState(false);

  // Keep drafts in sync with the store (e.g. after localStorage hydration).
  useEffect(() => {
    setNameDraft(businessName);
    setVatDraft(String(Math.round(vatRate * 100)));
  }, [businessName, vatRate]);

  function saveProfile() {
    const cleanName = nameDraft.trim() || "FlexPOS";
    const parsed = Number(vatDraft);
    const cleanVat = Number.isFinite(parsed)
      ? Math.min(100, Math.max(0, parsed))
      : 0;

    setBusinessName(cleanName);
    setVatRate(cleanVat / 100);
    setSaved(true);
  }

  return (
    <FlexposPageShell
      title="Settings"
      description="Configure your multi-purpose POS for grocery, café, retail, pharmacy, salon, and service businesses."
      action={
        <FlexposButton onClick={saveProfile}>
          <span className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Save Settings
          </span>
        </FlexposButton>
      }
    >
      <FlexposCard className="mb-6 p-6">
        <div className="flex items-start gap-3">
          <div className="w-fit rounded-2xl bg-emerald-50 p-3 text-emerald-700">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-950">
              Business Profile
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Business name and VAT rate used across checkout and reports.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-slate-600">
              Business name
            </span>
            <input
              value={nameDraft}
              onChange={(event) => {
                setNameDraft(event.target.value);
                setSaved(false);
              }}
              placeholder="e.g. Mama Grocers"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-bold text-slate-600">
              VAT rate (%)
            </span>
            <input
              type="number"
              min={0}
              max={100}
              value={vatDraft}
              onChange={(event) => {
                setVatDraft(event.target.value);
                setSaved(false);
              }}
              placeholder="16"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400"
            />
          </label>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <FlexposButton onClick={saveProfile}>Save Profile</FlexposButton>
          {saved ? (
            <span className="flex items-center gap-2 text-sm font-bold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Saved
            </span>
          ) : null}
        </div>
      </FlexposCard>

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
