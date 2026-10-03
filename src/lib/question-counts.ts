import "server-only";
import { questions, type Subject } from "@/data/questions";

// Only these counts cross the server/client boundary, never the full question bank.
export const questionCounts = questions.reduce((counts, question) => {
  counts[question.subject] = (counts[question.subject] ?? 0) + 1;
  return counts;
}, {} as Record<Subject, number>);
