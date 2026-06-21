"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Menu,
  Package,
  ReceiptText,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useFlexpos } from "@/lib/flexpos-store";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Checkout",
    href: "/checkout",
    icon: ShoppingCart,
  },
  {
    label: "Catalog",
    href: "/catalog",
    icon: Package,
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: Boxes,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    label: "Sales",
    href: "/sales",
    icon: ReceiptText,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function FlexposSidebar() {
  const pathname = usePathname();
  const { businessName } = useFlexpos();
  const brandInitial = businessName.trim().charAt(0).toUpperCase() || "F";

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-black text-white">
            {brandInitial}
          </div>

          <div>
            <p className="text-base font-black text-slate-950">{businessName}</p>
            <p className="text-xs font-semibold text-slate-500">
              Mobile cashier
            </p>
          </div>
        </div>

        <button className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm">
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <nav className="sticky top-[65px] z-40 flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-black ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col bg-emerald-950 px-5 py-6 text-white lg:flex">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-black">
            {brandInitial}
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight">
              {businessName}
            </h1>
            <p className="text-xs font-medium text-emerald-200">
              Commerce platform
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "text-emerald-100 hover:bg-emerald-900 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-3xl bg-emerald-900 p-4">
          <p className="text-sm font-black">Main Branch</p>
          <p className="mt-1 text-xs text-emerald-200">Cashier: Salman</p>
          <p className="mt-3 rounded-full bg-emerald-500/20 px-3 py-2 text-xs font-bold text-emerald-200">
            Shift open • Online
          </p>
        </div>
      </aside>
    </>
  );
}
