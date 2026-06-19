type FlexposPageShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function FlexposPageShell({
  eyebrow = "FlexPOS",
  title,
  description,
  action,
  children,
}: FlexposPageShellProps) {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-700">
              {eyebrow}
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              {description}
            </p>
          </div>

          {action ? <div>{action}</div> : null}
        </div>

        {children}
      </div>
    </main>
  );
}
