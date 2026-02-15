import type { PropsWithChildren } from "react";

export function Container({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={"mx-auto w-full max-w-[800px] px-4 sm:px-6 " + (className ?? "")}>
      {children}
    </div>
  );
}

