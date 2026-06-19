const payments = ["Cash", "M-Pesa", "Card", "Split"];

export function PaymentButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {payments.map((payment) => (
        <button
          key={payment}
          className={`rounded-2xl px-4 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 ${
            payment === "Cash"
              ? "bg-emerald-600"
              : payment === "M-Pesa"
              ? "bg-green-700"
              : payment === "Card"
              ? "bg-blue-600"
              : "bg-purple-600"
          }`}
        >
          {payment}
        </button>
      ))}

      <button className="col-span-2 rounded-2xl bg-slate-950 px-4 py-4 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5">
        Complete Sale
      </button>
    </div>
  );
}
