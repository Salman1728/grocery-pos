"use client";

import { Download, Printer, RotateCcw, X } from "lucide-react";
import type { Sale } from "@/lib/flexpos-store";

type ReceiptModalProps = {
  sale: Sale;
  businessName: string;
  onClose: () => void;
  onRefund?: (id: string) => void;
};

function money(value: number) {
  return `KES ${Math.round(value).toLocaleString()}`;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>]/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;"
  );
}

// Builds a self-contained, print-ready HTML receipt (works as a download in any
// environment, including sandboxed previews that block window.print()).
function buildReceiptHtml(sale: Sale, businessName: string): string {
  const itemRows =
    sale.items.length === 0
      ? `<div class="muted center">Itemized details not available.</div>`
      : sale.items
          .map(
            (line) =>
              `<div class="row"><span>${line.quantity} × ${escapeHtml(
                line.name
              )}</span><span>${money(line.price * line.quantity)}</span></div>`
          )
          .join("");

  return `<!doctype html><html><head><meta charset="utf-8" />
<title>Receipt ${sale.id}</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 24px; color: #0f172a; }
  .r { max-width: 360px; margin: 0 auto; }
  .center { text-align: center; }
  .muted { color: #64748b; font-size: 12px; }
  .row { display: flex; justify-content: space-between; margin: 4px 0; font-size: 14px; }
  .divider { border-top: 1px dashed #cbd5e1; margin: 12px 0; }
  .total { font-weight: 800; font-size: 16px; }
  .green { color: #047857; }
  h1 { font-size: 20px; margin: 0; }
</style></head>
<body><div class="r">
  <div class="center"><h1>${escapeHtml(businessName)}</h1><div class="muted">Sale Receipt</div>${
    sale.refunded
      ? '<div style="color:#dc2626;font-weight:800;margin-top:4px">REFUNDED</div>'
      : ""
  }</div>
  <div class="divider"></div>
  <div class="row"><span class="muted">Receipt</span><span>${sale.id}</span></div>
  <div class="row"><span class="muted">Time</span><span>${escapeHtml(sale.time)}</span></div>
  <div class="row"><span class="muted">Customer</span><span>${escapeHtml(sale.customer)}</span></div>
  <div class="row"><span class="muted">Mode</span><span>${sale.mode}</span></div>
  <div class="divider"></div>
  ${itemRows}
  <div class="divider"></div>
  <div class="row"><span class="muted">Subtotal</span><span>${money(sale.subtotal)}</span></div>
  <div class="row"><span class="muted">VAT</span><span>${money(sale.vat)}</span></div>
  <div class="row total"><span>Total</span><span class="green">${money(sale.total)}</span></div>
  <div class="row"><span class="muted">Paid via</span><span>${sale.payment}</span></div>
  <div class="center muted" style="margin-top:16px">Thank you for shopping with us</div>
</div></body></html>`;
}

function downloadReceipt(sale: Sale, businessName: string): void {
  const html = buildReceiptHtml(sale, businessName);
  const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `receipt-${sale.id}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function ReceiptModal({
  sale,
  businessName,
  onClose,
  onRefund,
}: ReceiptModalProps) {
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
          {sale.refunded ? (
            <span className="mt-2 inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600">
              REFUNDED
            </span>
          ) : null}
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

        <div className="no-print mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => downloadReceipt(sale, businessName)}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
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

        {onRefund && !sale.refunded ? (
          <button
            type="button"
            onClick={() => onRefund(sale.id)}
            className="no-print mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-50"
          >
            <RotateCcw className="h-4 w-4" />
            Refund Sale
          </button>
        ) : null}
      </div>
    </div>
  );
}
