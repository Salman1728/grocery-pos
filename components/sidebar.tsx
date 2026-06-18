"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  PackageSearch,
  Settings,
  ShoppingCart,
} from "lucide-react";

const nav = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "POS", href: "/", icon: ShoppingCart },
  { name: "Products", href: "/products", icon: Boxes },
  { name: "Inventory", href: "/inventory", icon: PackageSearch },
  { name: "Sales", href: "/sales", icon: BarChart3 },
  { name: "Settings", href: "#", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 bg-[#0f3d2e] p-5 text-white lg:flex lg:flex-col">
      <div className="mb-10 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#22c55e] text-2xl shadow-lg">
          🛒
        </div>

        <div>
          <h1 className="text-xl font-black">GreenMart</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
            Grocery POS
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left font-semibold transition ${
                isActive
                  ? "bg-white text-[#0f3d2e] shadow-lg"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#22c55e]" />
              )}
              <Icon size={22} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="rounded-3xl bg-white/10 p-4">
          <p className="text-sm font-bold">Today Sales</p>
          <p className="mt-1 text-2xl font-black">KES 48,250</p>
          <p className="mt-1 text-xs text-white/60">Counter 01 · Active</p>
        </div>

        <div className="flex items-center gap-3 rounded-3xl bg-white/10 p-4">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[#22c55e] font-black text-[#052e16]">
            SY
          </div>
          <div>
            <p className="font-bold">Salman</p>
            <p className="text-sm text-white/60">Admin cashier</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
