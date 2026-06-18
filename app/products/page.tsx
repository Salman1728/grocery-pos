import { Sidebar } from "@/components/sidebar";
import { products } from "@/lib/mock-data";

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen bg-[#faf6ee]">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-black text-green-900">Products</h1>
        <p className="mt-2 text-gray-500">Manage grocery products.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="grid h-32 place-items-center rounded-2xl bg-[#f5efe4] text-6xl">
                {product.emoji}
              </div>

              <h2 className="mt-4 text-xl font-black">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>

              <div className="mt-4 flex justify-between">
                <strong className="text-green-700">KES {product.price}</strong>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                  {product.stock} stock
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
