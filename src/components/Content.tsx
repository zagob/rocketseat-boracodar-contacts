import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export function Content({ children }: MainProps) {
  return (
    <main className="bg-[#1A1924] flex-1 px-10">
      <div className="max-w-lg mx-auto text-zinc-100 pt-6">{children}</div>
    </main>
  );
}
