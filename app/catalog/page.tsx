"use client";

import { useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import {
  businessModes,
  catalogItems,
  type BusinessMode,
  type CatalogItem,
} from "@/lib/flexpos-data";
import { FlexposPageShell } from "@/components/flexpos-page-shell";
import { FlexposCard } from "@/components/flexpos-card";
import { FlexposButton } from "@/components/flexpos-button";

const filters = [
  "All",
  "Products",
  "Food",
  "Medicine",
  "Services",
  "Low Stock",
] as const;

type Filter = (typeof filters)[number];

const itemTypes: CatalogItem["type"][] = [
  "Product",
  "Food",
  "Medicine",
  "Service",
  "Custom",
];

const colorPalette = [
  "bg-blue-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-orange-500",
];

const LOW_STOCK_THRESHOLD = 20;

// Only "Stock: N" labels carry a real stock count; services/food durations don't.
function stockCount(item: CatalogItem): number | null {
  if (!/stock/i.test(item.stockLabel)) return null;
  const match = item.stockLabel.match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

function isLowStock(item: CatalogItem): boolean {
  const count = stockCount(item);
  return count !== null && count < LOW_STOCK_THRESHOLD;
}

function matchesFilter(item: CatalogItem, filter: Filter): boolean {
  switch (filter) {
    case "Products":
      return item.type === "Product";
    case "Food":
      return item.type === "Food";
    case "Medicine":
      return item.type === "Medicine";
    case "Services":
      return item.type === "Service";
    case "Low Stock":
      return isLowStock(item);
    default:
      return true;
  }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type DraftItem = {
  name: string;
  type: CatalogItem["type"];
  category: string;
  price: string;
  stockLabel: string;
  mode: BusinessMode;
};

const emptyDraft: DraftItem = {
  name: "",
  type: "Product",
  category: "",
  price: "",
  stockLabel: "",
  mode: "Grocery",
};

export default function CatalogPage() {
  const [items, setItems] = useState<CatalogItem[]>(catalogItems);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<DraftItem>(emptyDraft);
  const [seq, setSeq] = useState(0);

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();

    return items.filter((item) => {
      const filterMatch = matchesFilter(item, activeFilter);

      const searchMatch =
        term === "" ||
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term) ||
        item.mode.toLowerCase().includes(term);

      return filterMatch && searchMatch;
    });
  }, [items, activeFilter, search]);

  const priceValue = Number(draft.price);
  const canSave = draft.name.trim() !== "" && priceValue > 0;

  function resetForm() {
    setDraft(emptyDraft);
    setShowForm(false);
  }

  function addItem() {
    if (!canSave) return;

    const newItem: CatalogItem = {
      id: `${slugify(draft.name) || "item"}-${seq + 1}`,
      name: draft.name.trim(),
      type: draft.type,
      category: draft.category.trim() || "Uncategorized",
      price: priceValue,
      stockLabel: draft.stockLabel.trim() || "Stock: 0",
      mode: draft.mode,
      color: colorPalette[items.length % colorPalette.length],
    };

    setItems((current) => [newItem, ...current]);
    setSeq((value) => value + 1);
    resetForm();
  }

  function updateDraft<K extends keyof DraftItem>(key: K, value: DraftItem[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  return (
    <FlexposPageShell
      title="Catalog Management"
      description="Manage products, food items, medicines, services, variants, prices, and business categories."
      action={
        <FlexposButton onClick={() => setShowForm((open) => !open)}>
          <span className="flex items-center gap-2">
            {showForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            {showForm ? "Close" : "Add Item"}
          </span>
        </FlexposButton>
      }
    >
      {showForm ? (
        <FlexposCard className="mb-6 p-6">
          <h2 className="text-lg font-black text-slate-950">New catalog item</h2>
          <p className="mt-1 text-sm text-slate-500">
            Fill in the details below and save to add it to the catalog.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-xs font-bold text-slate-600">
                Item name
              </span>
              <input
                value={draft.name}
                onChange={(event) => updateDraft("name", event.target.value)}
                placeholder="e.g. Brown Sugar 1kg"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-bold text-slate-600">
                Type
              </span>
              <select
                value={draft.type}
                onChange={(event) =>
                  updateDraft("type", event.target.value as CatalogItem["type"])
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400"
              >
                {itemTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-bold text-slate-600">
                Business mode
              </span>
              <select
                value={draft.mode}
                onChange={(event) =>
                  updateDraft("mode", event.target.value as BusinessMode)
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400"
              >
                {businessModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-bold text-slate-600">
                Category
              </span>
              <input
                value={draft.category}
                onChange={(event) => updateDraft("category", event.target.value)}
                placeholder="e.g. Groceries"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-bold text-slate-600">
                Price (KES)
              </span>
              <input
                type="number"
                min={0}
                value={draft.price}
                onChange={(event) => updateDraft("price", event.target.value)}
                placeholder="0"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-bold text-slate-600">
                Stock / Duration
              </span>
              <input
                value={draft.stockLabel}
                onChange={(event) =>
                  updateDraft("stockLabel", event.target.value)
                }
                placeholder="e.g. Stock: 25 or 30 minutes"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400"
              />
            </label>
          </div>

          <div className="mt-5 flex gap-3">
            <FlexposButton onClick={addItem} disabled={!canSave}>
              Save Item
            </FlexposButton>
            <FlexposButton variant="secondary" onClick={resetForm}>
              Cancel
            </FlexposButton>
          </div>
        </FlexposCard>
      ) : null}

      <FlexposCard className="mb-6 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 lg:w-[520px]">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              placeholder="Search catalog item, SKU, barcode, category..."
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = filter === activeFilter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </FlexposCard>

      <FlexposCard className="overflow-hidden">
        <div className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.7fr_0.9fr_0.7fr] border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500">
          <span>Item</span>
          <span>Type</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock / Duration</span>
          <span>Status</span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-bold text-slate-600">No items found</p>
            <p className="mt-1 text-xs text-slate-400">
              Adjust your search or filter, or add a new item.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const lowStock = isLowStock(item);

            return (
              <div
                key={item.id}
                className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.7fr_0.9fr_0.7fr] items-center border-b border-slate-100 px-6 py-5 text-sm last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.color} font-black text-white`}
                  >
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-slate-950">{item.name}</p>
                    <p className="text-xs font-medium text-slate-500">
                      {item.mode} mode
                    </p>
                  </div>
                </div>

                <span className="font-bold text-slate-600">{item.type}</span>
                <span className="font-bold text-slate-600">{item.category}</span>
                <span className="font-black text-emerald-700">
                  KES {item.price.toLocaleString()}
                </span>
                <span className="font-bold text-slate-500">
                  {item.stockLabel}
                </span>
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-black ${
                    lowStock
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {lowStock ? "Low stock" : "Active"}
                </span>
              </div>
            );
          })
        )}
      </FlexposCard>
    </FlexposPageShell>
  );
}
