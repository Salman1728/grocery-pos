import { Sidebar } from "@/components/sidebar";
import { products } from "@/lib/mock-data";

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen bg-[#faf6ee]">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-black text-green-900">Inventory</h1>
        <p className="mt-2 text-gray-500">Track stock levels.</p>

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-green-50 text-green-900">
              <tr>
                <th className="p-5">Product</th>
                <th className="p-5">Category</th>
                <th className="p-5">Unit</th>
                <th className="p-5">Stock</th>
                <th className="p-5">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-black/5">
                  <td className="p-5 font-bold">{product.emoji} {product.name}</td>
                  <td className="p-5 text-gray-500">{product.category}</td>
                  <td className="p-5">{product.unit}</td>
                  <td className="p-5 font-bold">{product.stock}</td>
                  <td className="p-5">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                      Healthy
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
