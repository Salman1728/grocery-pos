import { Sidebar } from "@/components/sidebar";

const stats = [
  "KES 48,250 Today",
  "126 Orders",
  "KES 383 Avg Basket",
  "18 M-Pesa Payments",
];

export default function SalesPage() {
  return (
    <div className="flex min-h-screen bg-[#faf6ee]">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-black text-green-900">Sales</h1>
        <p className="mt-2 text-gray-500">Sales reporting and analytics.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat} className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-2xl font-black text-green-900">{stat}</p>
              <p className="mt-2 text-sm text-gray-500">Demo metric</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Recent Sales</h2>
          <div className="mt-4 space-y-3">
            {["Milk, Bread", "Rice, Oil", "Apples, Water"].map((sale, index) => (
              <div key={sale} className="flex justify-between rounded-2xl bg-[#faf6ee] p-4">
                <span className="font-bold">Order #{1001 + index}</span>
                <span>{sale}</span>
                <strong className="text-green-700">Paid</strong>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
