import { CatalogItem } from "@/lib/flexpos-data";

type ItemCardProps = {
  item: CatalogItem;
};

export function ItemCard({ item }: ItemCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} text-xl font-black text-white`}
        >
          {item.name.charAt(0)}
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {item.type}
        </span>
      </div>

      <h3 className="text-base font-bold text-slate-950">{item.name}</h3>
      <p className="mt-1 text-xs font-medium text-slate-500">{item.stockLabel}</p>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-lg font-black text-emerald-700">
          KES {item.price.toLocaleString()}
        </p>

        <button className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-emerald-700">
          Add
        </button>
      </div>
    </article>
  );
}
