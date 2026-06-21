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

type ToggleItem = { key: string; label: string };

const settingsSections: {
  title: string;
  description: string;
  icon: typeof CreditCard;
  items: ToggleItem[];
}[] = [
  {
    title: "Payments",
    description: "Enabled methods appear at checkout.",
    icon: CreditCard,
    items: [
      { key: "pay.cash", label: "Cash" },
      { key: "pay.mpesa", label: "M-Pesa" },
      { key: "pay.card", label: "Card" },
      { key: "pay.split", label: "Split payments" },
    ],
  },
  {
    title: "Receipts",
    description: "Receipt channels offered to customers.",
    icon: ReceiptText,
    items: [
      { key: "rcpt.print", label: "Print receipts" },
      { key: "rcpt.whatsapp", label: "WhatsApp receipts" },
      { key: "rcpt.sms", label: "SMS receipts" },
      { key: "rcpt.email", label: "Email receipts" },
    ],
  },
  {
    title: "Notifications",
    description: "Alerts shown around the app.",
    icon: Bell,
    items: [
      { key: "notif.lowstock", label: "Low stock alerts" },
      { key: "notif.expiry", label: "Expiry alerts" },
      { key: "notif.daily", label: "Daily summary email" },
      { key: "notif.manager", label: "Manager alerts" },
    ],
  },
  {
    title: "Security",
    description: "Login and approval controls.",
    icon: ShieldCheck,
    items: [
      { key: "sec.pin", label: "Require PIN login" },
      { key: "sec.refundapproval", label: "Approve refunds" },
      { key: "sec.audit", label: "Audit logging" },
      { key: "sec.autoshift", label: "Auto-close shift" },
    ],
  },
  {
    title: "Staff & Access",
    description: "Cashier permissions and roles.",
    icon: Users,
    items: [
      { key: "access.cashierrefunds", label: "Allow cashier refunds" },
      { key: "access.managervoid", label: "Manager approval for voids" },
      { key: "access.multilogin", label: "Multiple cashier logins" },
      { key: "access.selfcheckout", label: "Self-checkout mode" },
    ],
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
  const { businessName, setBusinessName, vatRate, setVatRate, settings, toggleSetting } =
    useFlexpos();

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
                {section.items.map((item) => {
                  const on = settings[item.key];

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleSetting(item.key)}
                      aria-pressed={on}
                      className="flex w-full items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-left transition hover:bg-slate-100"
                    >
                      <span className="text-sm font-bold text-slate-600">
                        {item.label}
                      </span>
                      <span
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          on ? "bg-emerald-600" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
                            on ? "left-[1.375rem]" : "left-0.5"
                          }`}
                        />
                      </span>
                    </button>
                  );
                })}
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
