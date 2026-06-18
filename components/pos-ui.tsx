"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  CreditCard,
  Minus,
  Plus,
  Search,
  Smartphone,
  Trash2,
  Wallet,
} from "lucide-react";
import { categories, products } from "@/lib/mock-data";

type Product = (typeof products)[number];
type CartItem = Product & { qty: number };

function money(value: number) {
  return `KES ${Math.round(value).toLocaleString()}`;
}

export function PosUI() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [discount, setDiscount] = useState(0);

  const [cart, setCart] = useState<CartItem[]>([
    { ...products[0], qty: 2 },
    { ...products[1], qty: 1 },
    { ...products[2], qty: 1 },
  ]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        activeCategory === "All" || product.category === activeCategory;

      const searchMatch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  function addToCart(product: Product) {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);

      if (existing) {
        return items.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...items, { ...product, qty: 1 }];
    });
  }

  function updateQty(id: number, change: number) {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + change) } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = Math.max(0, subtotal - discount) * 0.16;
  const total = Math.max(0, subtotal - discount) + vat;

  return (
    <main className="flex min-h-screen flex-1 flex-col bg-[#faf6ee]">
      <header className="flex items-center justify-between border-b border-black/5 bg-white/80 px-6 py-5 backdrop-blur">
        <div className="relative w-full max-w-2xl">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={22}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product by name or scan barcode..."
            className="h-14 w-full rounded-2xl border border-black/10 bg-white px-12 text-sm font-medium outline-none transition focus:ring-4 focus:ring-green-100"
          />
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <button className="relative rounded-full bg-white p-3 shadow-sm">
            <Bell size={22} />
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-green-600 text-xs font-bold text-white">
              3
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-green-100 text-green-800">
              👤
            </div>
            <div>
              <p className="font-bold">John M.</p>
              <p className="text-sm text-gray-500">Cashier</p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid flex-1 gap-5 p-5 xl:grid-cols-[1fr_400px]">
        <div>
          <div className="mb-5 flex gap-3 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-2xl px-5 py-3 font-bold shadow-sm transition ${
                  activeCategory === category
                    ? "bg-[#006b3c] text-white"
                    : "bg-white text-gray-700 hover:bg-green-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="rounded-3xl border border-black/5 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative mb-4 grid h-36 place-items-center rounded-2xl bg-[#f5efe4] text-6xl">
                  {product.emoji}

                  <span className="absolute right-3 top-3 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                    {product.stock} in stock
                  </span>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.unit}</p>
                    <p className="mt-2 font-black text-[#006b3c]">
                      {money(product.price)}
                    </p>
                  </div>

                  <div className="grid h-10 w-10 place-items-center rounded-full bg-green-100 text-green-800">
                    <Plus size={20} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-black/5 p-5">
            <h2 className="text-xl font-black">Cart ({cart.length})</h2>
            <button onClick={clearCart} className="rounded-xl bg-gray-100 p-3">
              <Trash2 size={18} />
            </button>
          </div>

          <div className="max-h-[360px] overflow-y-auto">
            {cart.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Cart is empty. Add products to start a sale.
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-black/5 p-5"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#f5efe4] text-2xl">
                    {item.emoji}
                  </div>

                  <div className="flex-1">
                    <p className="font-black">{item.name}</p>
                    <p className="text-sm text-gray-500">{money(item.price)}</p>
                  </div>

                  <div className="flex items-center rounded-xl border border-black/10">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="p-2"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="p-2"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="w-24 text-right font-black text-[#006b3c]">
                    {money(item.price * item.qty)}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="space-y-4 p-5">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <strong>{money(subtotal)}</strong>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span>Discount</span>
              <div className="flex overflow-hidden rounded-xl border border-black/10">
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-24 px-3 py-2 outline-none"
                />
                <span className="bg-gray-50 px-3 py-2 text-gray-500">KES</span>
              </div>
            </div>

            <div className="flex justify-between">
              <span>VAT (16%)</span>
              <strong>{money(vat)}</strong>
            </div>

            <div className="flex items-center justify-between border-t pt-5">
              <span className="text-lg font-black">TOTAL</span>
              <strong className="text-3xl font-black text-[#006b3c]">
                {money(total)}
              </strong>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button className="rounded-2xl bg-green-50 p-4 font-bold text-green-800">
                <Wallet className="mx-auto mb-2" />
                Cash
              </button>
              <button className="rounded-2xl bg-green-50 p-4 font-bold text-green-800">
                <Smartphone className="mx-auto mb-2" />
                M-Pesa
              </button>
              <button className="rounded-2xl bg-green-50 p-4 font-bold text-green-800">
                <CreditCard className="mx-auto mb-2" />
                Card
              </button>
            </div>

            <button className="h-16 w-full rounded-2xl bg-[#006b3c] text-lg font-black text-white shadow-lg transition hover:bg-[#00522f]">
              Complete Sale
            </button>

            <div className="flex justify-between rounded-2xl bg-green-50 p-4 text-sm text-green-800">
              <span>Secure transaction</span>
              <strong>Today: KES 12,450</strong>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
