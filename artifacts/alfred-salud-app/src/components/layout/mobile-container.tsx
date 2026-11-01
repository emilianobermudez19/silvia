import { ReactNode } from "react";

export function MobileContainer({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center sm:py-8">
      <div className="w-full max-w-[430px] bg-background sm:rounded-[2rem] sm:shadow-2xl overflow-hidden flex flex-col relative h-[100dvh] sm:h-[850px] border border-border">
        {children}
      </div>
    </div>
  );
}
