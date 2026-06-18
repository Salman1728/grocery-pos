import Image from "next/image";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { products } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

export default function ProductsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Catalogue"
        title="Products"
        description="Manage grocery products, prices, units, and stock visibility."
        action={
          <Button className="rounded-2xl bg-[#22c55e] font-black text-[#052e16] hover:bg-[#16a34a]">
            <Plus size={18} />
            Add Product
          </Button>
        }
      />

      <div className="mb-5 grid gap-4 md:grid-cols-4">
        <StatCard label="Total Products" value={`${products.length}`} />
        <StatCard label="Active Items" value="10" />
        <StatCard label="Low Stock" value="3" />
        <StatCard label="Categories" value="7" />
      </div>

      <Card className="mb-5 rounded-[2rem] border-0 bg-white shadow-sm">
        <CardContent className="flex gap-3 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search products by name, barcode, or category..."
              className="h-14 rounded-2xl bg-[#f6f8f5] pl-12"
            />
          </div>

          <Button variant="outline" className="h-14 rounded-2xl">
            <SlidersHorizontal size={18} />
            Filter
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden rounded-[2rem] border-0 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <CardContent className="p-5">
              <div className="relative h-44 overflow-hidden rounded-3xl bg-[#edf7ef]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <Badge className="absolute right-3 top-3 rounded-full bg-white text-[#0f3d2e] hover:bg-white">
                  {product.stock} stock
                </Badge>
              </div>

              <div className="mt-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black text-[#0f3d2e]">
                      {product.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {product.category} · {product.unit}
                    </p>
                  </div>

                  <Badge className="rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                    Active
                  </Badge>
                </div>

                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Price
                    </p>
                    <p className="text-2xl font-black">KES {product.price}</p>
                  </div>

                  <Button variant="outline" className="rounded-2xl">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
