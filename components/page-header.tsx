import { Button } from "@/components/ui/button";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-5 flex items-center justify-between rounded-[2rem] border bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-bold text-emerald-700">{eyebrow}</p>
        <h1 className="text-3xl font-black tracking-tight text-[#0f3d2e]">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {action}
    </header>
  );
}
