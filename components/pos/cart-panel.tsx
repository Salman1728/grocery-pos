"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem, Customer } from "@/lib/flexpos-data";

type CartPanelProps = {
  items: CartItem[];
  subtotal: number;
  vat: number;
  total: number;
  discount?: number;
  customers: Customer[];
  selectedCustomerId: string | null;
  onSelectCustomer: (id: string | null) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export function CartPanel({
  items,
  subtotal,
  vat,
  total,
  discount = 0,
  customers,
  selectedCustomerId,
  onSelectCustomer,
  onIncrease,
  onDecrease,
  onRemove,
}: CartPanelProps) {
  const selectedCustomer =
    customers.find((customer) => customer.id === selectedCustomerId) ?? null;
  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-black text-slate-950">Current Sale</h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Customer: {selectedCustomer ? selectedCustomer.name : "Walk-in customer"}
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <label
          htmlFor="cart-customer"
          className="text-sm font-bold text-slate-950"
        >
          Customer selector
        </label>
        <select
          id="cart-customer"
          value={selectedCustomerId ?? ""}
          onChange={(event) => onSelectCustomer(event.target.value || null)}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-400"
        >
          <option value="">Walk-in customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name} · {customer.phone}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-slate-500">
          Pick a customer for loyalty, credit sales, or WhatsApp receipts.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-sm font-semibold text-slate-500">
              No items yet
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Tap an item to add it to the sale.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-950">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    KES {item.price.toLocaleString()} each
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="font-black text-emerald-700">
                    KES {(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => onRemove(item.id)}
                    className="rounded-xl border border-slate-200 bg-white p-2 text-slate-400 transition hover:border-red-200 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex w-fit items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  aria-label={`Decrease ${item.name}`}
                  onClick={() => onDecrease(item.id)}
                  className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-black text-slate-950">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  aria-label={`Increase ${item.name}`}
                  onClick={() => onIncrease(item.id)}
                  className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 rounded-3xl bg-slate-50 p-5">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-slate-500">Subtotal</span>
            <span className="font-bold text-slate-950">
              KES {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-slate-500">VAT / Tax</span>
            <span className="font-bold text-slate-950">
              KES {vat.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-slate-500">Discount</span>
            <span className="font-bold text-slate-950">
              KES {discount.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-5">
          <span className="text-lg font-black text-slate-950">Total</span>
          <span className="text-2xl font-black text-emerald-700">
            KES {total.toLocaleString()}
          </span>
        </div>
      </div>
    </aside>
  );
}
