import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  PackageSearch,
  Settings,
  ShoppingCart,
} from "lucide-react";

const nav = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "POS", icon: ShoppingCart, active: true },
  { name: "Products", icon: Boxes },
  { name: "Inventory", icon: PackageSearch },
  { name: "Sales", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 bg-[#063d29] p-5 text-white lg:flex lg:flex-col">
      <div className="mb-10 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#7ac943] text-2xl">
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

          return (
            <button
              key={item.name}
              className={`flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left font-semibold transition ${
                item.active
                  ? "bg-[#075f3b] text-white shadow-lg"
                  : "text-white/75 hover:bg-white/10"
              }`}
            >
              <Icon size={22} />
              {item.name}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl bg-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[#7ac943] font-bold">
            JM
          </div>
          <div>
            <p className="font-bold">John M.</p>
            <p className="text-sm text-white/60">Cashier</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
