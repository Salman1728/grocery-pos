export function Sidebar() {
  return (
    <aside className="w-64 bg-green-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold">GreenMart POS</h1>

      <nav className="mt-8 space-y-3">
        <div className="rounded-xl bg-green-800 p-3">POS</div>
        <div className="rounded-xl p-3">Products</div>
        <div className="rounded-xl p-3">Inventory</div>
        <div className="rounded-xl p-3">Sales</div>
        <div className="rounded-xl p-3">Settings</div>
      </nav>
    </aside>
  );
}
