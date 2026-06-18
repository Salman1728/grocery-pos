"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Product = (typeof products)[number];
type CartItem = Product & { qty: number };

const productImages: Record<string, string> = {
  Milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=600",
  Bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600",
  Eggs: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?q=80&w=600",
  Rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600",
  Sugar: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?q=80&w=600",
  Apples: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=600",
  Tomatoes: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=600",
  "Cooking Oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600",
  Water: "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=600",
  Soap: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=600",
};

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

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = Math.max(0, subtotal - discount) * 0.16;
  const total = Math.max(0, subtotal - discount) + vat;

  return (
    <main className="min-h-screen flex-1 bg-[#f6f8f5]">
      <section className="grid min-h-screen gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="min-w-0">
          <header className="mb-5 rounded-[2rem] border bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm font-bold text-emerald-700">
                  GreenMart Grocery POS
                </p>
                <h1 className="text-3xl font-black tracking-tight text-[#0f3d2e]">
                  Checkout Counter
                </h1>
              </div>

              <div className="flex flex-1 items-center gap-3 xl:max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search product or scan barcode..."
                    className="h-14 rounded-2xl bg-[#f8faf7] pl-12 text-base"
                  />
                </div>

                <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl">
                  <Bell size={20} />
                </Button>
              </div>
            </div>
          </header>

          <div className="mb-5 grid gap-4 md:grid-cols-4">
            {[
              ["Today Sales", "KES 48,250"],
              ["Orders", "126"],
              ["Items Sold", "342"],
              ["Low Stock", "3"],
            ].map(([label, value]) => (
              <Card key={label} className="rounded-3xl border-0 bg-white shadow-sm">
                <CardContent className="p-5">
                  <p className="text-sm font-medium text-muted-foreground">{label}</p>
                  <p className="mt-2 text-2xl font-black text-[#0f3d2e]">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mb-5 h-auto flex-wrap justify-start rounded-3xl bg-white p-2 shadow-sm">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-2xl px-5 py-3 font-bold data-[state=active]:bg-[#0f3d2e] data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.035 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product)}
                className="text-left"
              >
                <Card className="overflow-hidden rounded-[2rem] border-0 bg-white shadow-sm transition hover:shadow-xl">
                  <div
                    className="relative h-40 bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0.25)), url(${productImages[product.name]})`,
                    }}
                  >
                    <Badge className="absolute right-3 top-3 rounded-full bg-white text-[#0f3d2e] hover:bg-white">
                      {product.stock} stock
                    </Badge>
                  </div>

                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black text-[#0f3d2e]">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {product.category} · {product.unit}
                        </p>
                        <p className="mt-4 text-2xl font-black">
                          {money(product.price)}
                        </p>
                      </div>

                      <Button size="icon" className="rounded-2xl bg-[#0f3d2e] hover:bg-[#0b2e23]">
                        <Plus size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-5 h-[calc(100vh-2.5rem)] overflow-hidden rounded-[2rem] border bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-bold text-emerald-700">Current Order</p>
              <h2 className="text-2xl font-black text-[#0f3d2e]">
                Cart ({cart.length})
              </h2>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-2xl"
              onClick={() => setCart([])}
            >
              <Trash2 size={18} />
            </Button>
          </div>

          <Separator />

          <ScrollArea className="h-[38vh] px-5 py-4">
            <div className="space-y-3">
              {cart.length === 0 ? (
                <div className="rounded-3xl bg-[#f6f8f5] p-8 text-center text-muted-foreground">
                  Cart is empty.
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex items-center gap-3 rounded-3xl bg-[#f6f8f5] p-3"
                  >
                    <div
                      className="h-14 w-14 shrink-0 rounded-2xl bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${productImages[item.name]})`,
                      }}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-black text-[#0f3d2e]">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {money(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center rounded-2xl bg-white shadow-sm">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-2xl"
                        onClick={() => updateQty(item.id, -1)}
                      >
                        <Minus size={15} />
                      </Button>
                      <span className="w-7 text-center font-black">{item.qty}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-2xl"
                        onClick={() => updateQty(item.id, 1)}
                      >
                        <Plus size={15} />
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </ScrollArea>

          <div className="p-5">
            <div className="rounded-3xl bg-[#0f3d2e] p-5 text-white">
              <div className="mb-3 flex justify-between text-sm">
                <span className="text-white/60">Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>

              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-sm text-white/60">Discount</span>
                <Input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="h-10 w-28 rounded-xl border-white/10 bg-white/10 text-white"
                />
              </div>

              <div className="mb-4 flex justify-between text-sm">
                <span className="text-white/60">VAT 16%</span>
                <strong>{money(vat)}</strong>
              </div>

              <Separator className="bg-white/10" />

              <div className="mt-5 flex items-end justify-between">
                <span className="text-white/70">Total</span>
                <strong className="text-3xl">{money(total)}</strong>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <Button variant="outline" className="h-14 rounded-2xl text-xs">
                <Wallet className="mr-1" size={16} /> Cash
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl text-xs">
                <Smartphone className="mr-1" size={16} /> M-Pesa
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl text-xs">
                <CreditCard className="mr-1" size={16} /> Card
              </Button>
            </div>

            <Button className="mt-4 h-16 w-full rounded-3xl bg-[#22c55e] text-lg font-black text-[#052e16] hover:bg-[#16a34a]">
              Complete Sale
            </Button>
          </div>
        </motion.aside>
      </section>
    </main>
  );
}
