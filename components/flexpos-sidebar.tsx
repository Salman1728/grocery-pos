"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  CreditCard,
  LayoutDashboard,
  Package,
  ReceiptText,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

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

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col bg-emerald-950 px-5 py-6 text-white lg:flex">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-black">
          F
        </div>

        <div>
          <h1 className="text-2xl font-black tracking-tight">FlexPOS</h1>
          <p className="text-xs font-medium text-emerald-200">
            Commerce platform
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

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
  );
}
