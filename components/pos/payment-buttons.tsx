"use client";

import { PaymentMethod } from "@/lib/flexpos-data";

type PaymentButtonsProps = {
  methods: PaymentMethod[];
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  onComplete: () => void;
  canComplete: boolean;
};

const methodColor: Record<PaymentMethod, string> = {
  Cash: "bg-emerald-600",
  "M-Pesa": "bg-green-700",
  Card: "bg-blue-600",
  Split: "bg-purple-600",
};

export function PaymentButtons({
  methods,
  selected,
  onSelect,
  onComplete,
  canComplete,
}: PaymentButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {methods.map((method) => {
        const isActive = selected === method;

        return (
          <button
            key={method}
            type="button"
            onClick={() => onSelect(method)}
            aria-pressed={isActive}
            className={`rounded-2xl px-4 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 ${
              methodColor[method]
            } ${
              isActive
                ? "ring-2 ring-slate-950 ring-offset-2"
                : "opacity-90 hover:opacity-100"
            }`}
          >
            {method}
          </button>
        );
      })}

      <button
        type="button"
        onClick={onComplete}
        disabled={!canComplete}
        className="col-span-2 rounded-2xl bg-slate-950 px-4 py-4 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
      >
        {selected ? `Complete Sale · ${selected}` : "Complete Sale"}
      </button>
    </div>
  );
}
