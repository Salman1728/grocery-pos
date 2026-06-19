import { ReactNode } from "react";

type FlexposButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
};

export function FlexposButton({
  children,
  variant = "primary",
  className = "",
}: FlexposButtonProps) {
  const styles = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    dark: "bg-slate-950 text-white hover:bg-slate-800",
  };

  return (
    <button
      className={`rounded-2xl px-5 py-3 text-sm font-bold shadow-sm transition ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
