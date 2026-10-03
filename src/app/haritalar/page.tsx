import KpssApp from "@/components/KpssApp";
import { questionCounts } from "@/lib/question-counts";

export default function HaritalarPage() {
  return <KpssApp initialView="map" initialQuestionCounts={questionCounts} />;
}
