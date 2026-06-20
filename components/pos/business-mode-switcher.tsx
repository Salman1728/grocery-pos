"use client";

import { BusinessMode, businessModes } from "@/lib/flexpos-data";

type BusinessModeSwitcherProps = {
  activeMode: BusinessMode;
  onSelect: (mode: BusinessMode) => void;
};

export function BusinessModeSwitcher({
  activeMode,
  onSelect,
}: BusinessModeSwitcherProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-950">Business mode</h2>
          <p className="text-xs text-slate-500">
            Switch the POS layout for different business types.
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          {activeMode}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {businessModes.map((mode) => {
          const isActive = mode === activeMode;

          return (
            <button
              key={mode}
              type="button"
              onClick={() => onSelect(mode)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {mode}
            </button>
          );
        })}
      </div>
    </section>
  );
}
