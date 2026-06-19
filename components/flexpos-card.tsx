import { ReactNode } from "react";

type FlexposCardProps = {
  children: ReactNode;
  className?: string;
};

export function FlexposCard({ children, className = "" }: FlexposCardProps) {
  return (
    <section
      className={`rounded-[2rem] border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}
