import { Sidebar } from "@/components/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f6f8f5]">
      <Sidebar />
      <main className="flex-1 p-5 lg:p-6">
        {children}
      </main>
    </div>
  );
}
