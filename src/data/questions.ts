import turkce from "./questions/turkce.json";
import matematik from "./questions/matematik.json";
import geometri from "./questions/geometri.json";
import tarih from "./questions/tarih.json";
import cografya from "./questions/cografya.json";
import vatandaslik from "./questions/vatandaslik.json";
import guncel from "./questions/guncel-bilgiler.json";

export type Subject =
  | "Türkçe"
  | "Matematik"
  | "Geometri"
  | "Tarih"
  | "Coğrafya"
  | "Vatandaşlık"
  | "Güncel Bilgiler";

export type Question = {
  id: string;
  subject: Subject;
  topic: string;
  text: string;
  options: string[];
  answer: number;
  explanation?: string;
  imageUrl?: string | null;
  imageContainsQuestion?: boolean;
  source?: { title: string; page: number; exam: number; question: number };
};

export const questions: Question[] = [
  ...turkce, ...matematik, ...geometri, ...tarih, ...cografya, ...vatandaslik, ...guncel,
] as Question[];

export { mapQuestions } from "./legacy-map-questions";
