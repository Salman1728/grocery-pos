export function PosUI() {
  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-black text-green-900">
        Grocery POS
      </h1>

      <p className="mt-2 text-gray-600">
        POS UI is loading successfully.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow">
          <div className="text-5xl">🥛</div>
          <h2 className="mt-4 text-xl font-bold">Milk</h2>
          <p className="text-green-700 font-bold">KES 180</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <div className="text-5xl">🍞</div>
          <h2 className="mt-4 text-xl font-bold">Bread</h2>
          <p className="text-green-700 font-bold">KES 90</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <div className="text-5xl">🥚</div>
          <h2 className="mt-4 text-xl font-bold">Eggs</h2>
          <p className="text-green-700 font-bold">KES 250</p>
        </div>
      </div>
    </main>
  );
}
