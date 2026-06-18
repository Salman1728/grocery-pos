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
    <main className="min-h-screen flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_left,#dff7e8,transparent_35%),linear-gradient(135deg,#fbf7ef,#fffaf3)]">
      <header className="sticky top-0 z-20 border-b bg-white/70 px-6 py-5 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-5">
          <div>
            <p className="text-sm font-bold text-emerald-700">
              Premium Grocery POS
            </p>
            <h1 className="text-3xl font-black tracking-tight text-[#063d29]">
              Checkout Counter
            </h1>
          </div>

          <div className="relative hidden w-full max-w-xl md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product or scan barcode..."
              className="h-14 rounded-2xl bg-white pl-12 text-base shadow-sm"
            />
          </div>

          <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl">
            <Bell size={20} />
          </Button>
        </div>
      </header>

      <section className="grid gap-6 p-6 xl:grid-cols-[1fr_430px]">
        <div>
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            {[
              ["Today Sales", "KES 48,250"],
              ["Orders", "126"],
              ["Items Sold", "342"],
              ["Low Stock", "3"],
            ].map(([label, value]) => (
              <Card key={label} className="rounded-3xl border-0 bg-white/80 shadow-sm backdrop-blur">
                <CardContent className="p-5">
                  <p className="text-sm font-medium text-muted-foreground">{label}</p>
                  <p className="mt-2 text-2xl font-black text-[#063d29]">{value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mb-6 h-auto flex-wrap justify-start rounded-3xl bg-white/80 p-2 shadow-sm">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-2xl px-5 py-3 font-bold data-[state=active]:bg-[#063d29] data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product)}
                className="text-left"
              >
                <Card className="overflow-hidden rounded-[2rem] border-0 bg-white shadow-sm transition hover:shadow-2xl">
                  <div
                    className="relative h-44 bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.25)), url(${productImages[product.name]})`,
                    }}
                  >
                    <Badge className="absolute right-4 top-4 rounded-full bg-white text-[#063d29] hover:bg-white">
                      {product.stock} stock
                    </Badge>
                    <div className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/90 text-2xl shadow">
                      {product.emoji}
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-xl font-black text-[#063d29]">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {product.category} · {product.unit}
                        </p>
                      </div>

                      <Button size="icon" className="rounded-2xl bg-[#063d29]">
                        <Plus size={18} />
                      </Button>
                    </div>

                    <p className="mt-5 text-2xl font-black">
                      {money(product.price)}
                    </p>
                  </CardContent>
                </Card>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-28 h-[calc(100vh-8rem)] rounded-[2rem] border bg-white/85 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-bold text-emerald-700">Current Order</p>
              <h2 className="text-2xl font-black text-[#063d29]">
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

          <ScrollArea className="h-[330px] px-6 py-4">
            <div className="space-y-4">
              {cart.length === 0 ? (
                <div className="rounded-3xl bg-[#faf6ee] p-8 text-center text-muted-foreground">
                  Cart is empty.
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex items-center gap-4 rounded-3xl bg-[#faf6ee] p-3"
                  >
                    <div
                      className="h-16 w-16 rounded-2xl bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${productImages[item.name]})`,
                      }}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-black text-[#063d29]">
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

          <div className="p-6">
            <div className="rounded-3xl bg-[#063d29] p-5 text-white">
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

            <div className="mt-4 grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-16 rounded-2xl">
                <Wallet className="mr-1" size={18} /> Cash
              </Button>
              <Button variant="outline" className="h-16 rounded-2xl">
                <Smartphone className="mr-1" size={18} /> M-Pesa
              </Button>
              <Button variant="outline" className="h-16 rounded-2xl">
                <CreditCard className="mr-1" size={18} /> Card
              </Button>
            </div>

            <Button className="mt-4 h-16 w-full rounded-3xl bg-[#7ac943] text-lg font-black text-[#063d29] hover:bg-[#6bbb38]">
              Complete Sale
            </Button>
          </div>
        </motion.aside>
      </section>
    </main>
  );
}
