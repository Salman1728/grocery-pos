import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { products } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  SlidersHorizontal,
  Download,
  AlertTriangle,
} from "lucide-react";

export default function InventoryPage() {
  const lowStock = products.filter((product) => product.stock < 45);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Stock Control"
        title="Inventory"
        description="Monitor stock levels, low-stock items, and product movement."
        action={
          <Button className="rounded-2xl bg-[#22c55e] font-black text-[#052e16] hover:bg-[#16a34a]">
            <Download size={18} />
            Export
          </Button>
        }
      />

      <div className="mb-5 grid gap-4 md:grid-cols-4">
        <StatCard label="Total SKUs" value={`${products.length}`} />
        <StatCard label="Total Stock" value={`${products.reduce((a, p) => a + p.stock, 0)}`} />
        <StatCard label="Low Stock" value={`${lowStock.length}`} />
        <StatCard label="Categories" value="7" />
      </div>

      <Card className="mb-5 rounded-[2rem] border-0 bg-white shadow-sm">
        <CardContent className="flex gap-3 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search inventory by product, category, or stock status..."
              className="h-14 rounded-2xl bg-[#f6f8f5] pl-12"
            />
          </div>

          <Button variant="outline" className="h-14 rounded-2xl">
            <SlidersHorizontal size={18} />
            Filter
          </Button>
        </CardContent>
      </Card>

      {lowStock.length > 0 && (
        <Card className="mb-5 rounded-[2rem] border-0 bg-amber-50 shadow-sm">
          <CardContent className="flex items-center gap-3 p-5 text-amber-800">
            <AlertTriangle size={22} />
            <div>
              <p className="font-black">Low stock alert</p>
              <p className="text-sm">
                {lowStock.map((item) => item.name).join(", ")} need restocking soon.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden rounded-[2rem] border-0 bg-white shadow-sm">
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-[#eef7f0] text-[#0f3d2e]">
              <tr>
                <th className="p-5">Product</th>
                <th className="p-5">Category</th>
                <th className="p-5">Unit</th>
                <th className="p-5">Stock</th>
                <th className="p-5">Value</th>
                <th className="p-5">Status</th>
                <th className="p-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                const isLow = product.stock < 45;

                return (
                  <tr key={product.id} className="border-t border-black/5">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#edf7ef] text-2xl">
                          {product.emoji}
                        </div>
                        <div>
                          <p className="font-black text-[#0f3d2e]">{product.name}</p>
                          <p className="text-sm text-muted-foreground">SKU-{product.id.toString().padStart(4, "0")}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-5 text-muted-foreground">{product.category}</td>
                    <td className="p-5">{product.unit}</td>
                    <td className="p-5 font-black">{product.stock}</td>
                    <td className="p-5 font-bold">KES {(product.stock * product.price).toLocaleString()}</td>

                    <td className="p-5">
                      <Badge
                        className={
                          isLow
                            ? "rounded-full bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : "rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                        }
                      >
                        {isLow ? "Low stock" : "Healthy"}
                      </Badge>
                    </td>

                    <td className="p-5">
                      <Button variant="outline" className="rounded-2xl">
                        Restock
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
