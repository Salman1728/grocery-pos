"use client";

import { Printer, X } from "lucide-react";
import type { Sale } from "@/lib/flexpos-store";

type ReceiptModalProps = {
  sale: Sale;
  businessName: string;
  onClose: () => void;
};

function money(value: number) {
  return `KES ${Math.round(value).toLocaleString()}`;
}

export function ReceiptModal({ sale, businessName, onClose }: ReceiptModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
      onClick={onClose}
    >
      <div
        className="receipt-print w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="text-center">
          <h2 className="text-xl font-black text-slate-950">{businessName}</h2>
          <p className="text-xs font-semibold text-slate-500">Sale Receipt</p>
        </div>

        <div className="mt-4 space-y-1 border-y border-dashed border-slate-200 py-3 text-xs font-semibold text-slate-500">
          <div className="flex justify-between">
            <span>Receipt</span>
            <span className="text-slate-950">{sale.id}</span>
          </div>
          <div className="flex justify-between">
            <span>Time</span>
            <span className="text-slate-950">{sale.time}</span>
          </div>
          <div className="flex justify-between">
            <span>Customer</span>
            <span className="text-slate-950">{sale.customer}</span>
          </div>
          <div className="flex justify-between">
            <span>Mode</span>
            <span className="text-slate-950">{sale.mode}</span>
          </div>
        </div>

        <div className="py-3">
          {sale.items.length === 0 ? (
            <p className="text-center text-xs text-slate-400">
              Itemized details not available for this sale.
            </p>
          ) : (
            <div className="space-y-2">
              {sale.items.map((line) => (
                <div key={line.id} className="flex justify-between text-sm">
                  <span className="text-slate-700">
                    {line.quantity} × {line.name}
                  </span>
                  <span className="font-bold text-slate-950">
                    {money(line.price * line.quantity)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1 border-t border-dashed border-slate-200 pt-3 text-sm">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span className="font-bold text-slate-950">
              {money(sale.subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>VAT</span>
            <span className="font-bold text-slate-950">{money(sale.vat)}</span>
          </div>
          <div className="mt-1 flex justify-between border-t border-slate-200 pt-2 text-base">
            <span className="font-black text-slate-950">Total</span>
            <span className="font-black text-emerald-700">
              {money(sale.total)}
            </span>
          </div>
          <div className="flex justify-between pt-1 text-slate-500">
            <span>Paid via</span>
            <span className="font-bold text-slate-950">{sale.payment}</span>
          </div>
        </div>

        <p className="mt-4 text-center text-xs font-semibold text-slate-400">
          Thank you for shopping with us
        </p>

        <div className="no-print mt-5 flex gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
          >
            <X className="h-4 w-4" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
