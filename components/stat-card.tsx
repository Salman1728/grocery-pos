import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Card className="rounded-3xl border-0 bg-white shadow-sm">
      <CardContent className="p-5">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="mt-2 text-2xl font-black text-[#0f3d2e]">{value}</p>
      </CardContent>
    </Card>
  );
}
