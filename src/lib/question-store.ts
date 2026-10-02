import fs from "node:fs";
import path from "node:path";
import files from "@/data/question-files.json";
import type { Question } from "@/data/questions";

const directory = path.join(process.cwd(), "src", "data", "questions");

export function readQuestions(): Question[] {
  return Object.values(files).flatMap((file) =>
    JSON.parse(fs.readFileSync(path.join(directory, file), "utf8")) as Question[],
  );
}

export function writeQuestions(questions: Question[]) {
  const ids = new Set<string>();
  for (const q of questions) {
    if (!Object.hasOwn(files, q.subject) || ids.has(q.id) || !q.id ||
        !q.text.trim() || q.options.length !== 5 ||
        q.options.some((o) => typeof o !== "string" || !o.trim()) ||
        new Set(q.options).size !== 5 || !Number.isInteger(q.answer) ||
        q.answer < 0 || q.answer > 4) {
      throw new Error(`Geçersiz soru: ${q.id}`);
    }
    ids.add(q.id);
  }
  for (const [subject, file] of Object.entries(files)) {
    const target = path.join(directory, file);
    const content = JSON.stringify(questions.filter((q) => q.subject === subject), null, 2) + "\n";
    if (JSON.stringify(JSON.parse(fs.readFileSync(target, "utf8"))) ===
        JSON.stringify(questions.filter((q) => q.subject === subject))) continue;
    fs.writeFileSync(target + ".tmp", content, "utf8");
    fs.renameSync(target + ".tmp", target);
  }
}
