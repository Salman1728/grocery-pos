import { ReactNode } from "react";

type FlexposButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

export function FlexposButton({
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled = false,
}: FlexposButtonProps) {
  const styles = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    dark: "bg-slate-950 text-white hover:bg-slate-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-2xl px-5 py-3 text-sm font-bold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
