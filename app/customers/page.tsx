"use client";

import { useMemo, useState } from "react";
import { MessageCircle, Plus, Search, Star, Users, Wallet, X } from "lucide-react";
import { type Customer } from "@/lib/flexpos-data";
import { useFlexpos } from "@/lib/flexpos-store";
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposCard } from "@/components/flexpos-card";
import { FlexposButton } from "@/components/flexpos-button";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CustomersPage() {
  const { customers, addCustomer, selectedCustomer, selectCustomer, settings } =
    useFlexpos();
  const whatsappEnabled = settings["rcpt.whatsapp"];

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const filteredCustomers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (term === "") return customers;

    return customers.filter((customer) =>
      [customer.name, customer.phone, String(customer.points), customer.spend]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [customers, search]);

  const profile: Customer | null = selectedCustomer ?? customers[0] ?? null;

  const totalPoints = customers.reduce(
    (sum, customer) => sum + customer.points,
    0
  );

  const customerStats = [
    {
      label: "Customers",
      value: customers.length.toLocaleString(),
      note: "Registered",
      icon: Users,
    },
    {
      label: "Loyalty Points",
      value: totalPoints.toLocaleString(),
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

  const canSave = name.trim() !== "";

  function resetForm() {
    setName("");
    setPhone("");
    setShowForm(false);
  }

  function saveCustomer() {
    if (!canSave) return;

    const customer: Customer = {
      id: `${slugify(name) || "customer"}-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim() || "—",
      lastVisit: "New",
      spend: "KES 0",
      points: 0,
    };

    addCustomer(customer);
    selectCustomer(customer.id);
    resetForm();
  }

  return (
    <FlexposPageShell
      title="Customers & Loyalty"
      description="Manage customer profiles, loyalty points, credit sales, purchase history, and WhatsApp receipts."
      action={
        <FlexposButton onClick={() => setShowForm((open) => !open)}>
          <span className="flex items-center gap-2">
            {showForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            {showForm ? "Close" : "Add Customer"}
          </span>
        </FlexposButton>
      }
    >
      {showForm ? (
        <FlexposCard className="mb-6 p-6">
          <h2 className="text-lg font-black text-slate-950">New customer</h2>
          <p className="mt-1 text-sm text-slate-500">
            Register a customer for loyalty, credit sales, and WhatsApp receipts.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-bold text-slate-600">
                Name
              </span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Grace Wanjiku"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-bold text-slate-600">
                Phone
              </span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="e.g. 0712 345 678"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400"
              />
            </label>
          </div>

          <div className="mt-5 flex gap-3">
            <FlexposButton onClick={saveCustomer} disabled={!canSave}>
              Save Customer
            </FlexposButton>
            <FlexposButton variant="secondary" onClick={resetForm}>
              Cancel
            </FlexposButton>
          </div>
        </FlexposCard>
      ) : null}

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
              value={search}
              onChange={(event) => setSearch(event.target.value)}
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

            {filteredCustomers.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <p className="text-sm font-bold text-slate-600">
                  No customers found
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Adjust your search or add a new customer.
                </p>
              </div>
            ) : (
              filteredCustomers.map((customer) => {
                const isSelected = profile?.id === customer.id;

                return (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => selectCustomer(customer.id)}
                    className={`grid w-full grid-cols-[1.2fr_1fr_0.8fr_0.8fr_0.6fr] items-center border-t border-slate-100 px-5 py-5 text-left text-sm transition hover:bg-slate-50 ${
                      isSelected ? "bg-emerald-50/60" : ""
                    }`}
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
                  </button>
                );
              })
            )}
          </div>
        </FlexposCard>

        <FlexposCard className="p-6">
          {profile ? (
            <>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-600 text-2xl font-black text-white">
                  {profile.name.charAt(0)}
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-950">
                    {profile.name}
                  </h2>
                  <p className="text-sm font-medium text-slate-500">
                    {profile.phone}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {(
                  [
                    ["Lifetime Spend", profile.spend],
                    ["Loyalty Points", String(profile.points)],
                    ["Last Purchase", profile.lastVisit],
                    ["Preferred Receipt", "WhatsApp"],
                    ["Credit Balance", "KES 0"],
                  ] as [string, string][]
                ).map(([label, value]) => (
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

              <button
                disabled={!whatsappEnabled}
                className="mt-6 w-full rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-black text-white shadow-sm transition disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                {whatsappEnabled
                  ? "Send WhatsApp Receipt"
                  : "WhatsApp receipts off"}
              </button>
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm font-bold text-slate-600">
                No customer selected
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Add a customer to see their profile here.
              </p>
            </div>
          )}
        </FlexposCard>
      </section>
    </FlexposPageShell>
  );
}
