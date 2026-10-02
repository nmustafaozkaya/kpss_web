import type { ReactNode } from "react";

/** Supply ad content here when a provider is integrated. Empty slots take no space. */
export default function QuizAdSlot({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return (
    <aside className="quiz-ad-slot" aria-label="Reklam">
      <span>Reklam</span>
      <div>{children}</div>
    </aside>
  );
}
