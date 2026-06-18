import Image from "next/image";
import { Sidebar } from "@/components/sidebar";
import { products } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen bg-[#f6f8f5]">
      <Sidebar />

      <main className="flex-1 p-6">
        <header className="mb-6 flex items-center justify-between rounded-[2rem] bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-bold text-emerald-700">Catalogue</p>
            <h1 className="text-3xl font-black text-[#0f3d2e]">Products</h1>
          </div>

          <Button className="rounded-2xl bg-[#22c55e] font-black text-[#052e16] hover:bg-[#16a34a]">
            <Plus size={18} />
            Add Product
          </Button>
        </header>

        <div className="mb-6 flex gap-3">
          <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <Search className="text-gray-400" size={20} />
            <input
              placeholder="Search products..."
              className="w-full bg-transparent outline-none"
            />
          </div>

          <Button variant="outline" className="h-14 rounded-2xl">
            <SlidersHorizontal size={18} />
            Filter
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden rounded-[2rem] border-0 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="p-5">
                <div className="relative h-40 overflow-hidden rounded-3xl bg-[#edf7ef]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-black text-[#0f3d2e]">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {product.category} · {product.unit}
                    </p>
                  </div>

                  <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                    Active
                  </Badge>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-2xl font-black">KES {product.price}</p>
                  <p className="text-sm font-bold text-gray-500">
                    {product.stock} stock
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
