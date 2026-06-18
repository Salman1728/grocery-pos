import { Sidebar } from "@/components/sidebar";
import { PosUI } from "@/components/pos-ui";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#faf6ee]">
      <Sidebar />
      <PosUI />
    </div>
  );
}
