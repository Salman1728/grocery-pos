import { CartItem } from "@/lib/flexpos-data";

type CartPanelProps = {
  items: CartItem[];
};

export function CartPanel({ items }: CartPanelProps) {
  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const tax = Math.round(subtotal * 0.16);
  const discount = 0;
  const total = subtotal + tax - discount;

  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-black text-slate-950">Current Sale</h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Customer: Walk-in customer
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-bold text-slate-950">Customer selector</p>
        <p className="mt-1 text-xs text-slate-500">
          Add customer for loyalty, credit sales, or WhatsApp receipts.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-slate-950">{item.name}</p>
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  − {item.quantity} +
                </p>
              </div>

              <p className="font-black text-emerald-700">
                KES {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
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
              KES {tax.toLocaleString()}
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
