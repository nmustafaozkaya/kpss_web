import questionsJson from "./questions.json";

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
  explanation: string;
  imageUrl?: string | null;
  imageContainsQuestion?: boolean;
  source?: { title: string; page: number; exam: number; question: number };
};

export const questions: Question[] = questionsJson as Question[];

export const mapQuestions = [
  {
    id: "map1",
    text: "Zeugma Antik Kenti hangi ilimizdedir?",
    answer: 27,
    explanation: "Zeugma Antik Kenti, Gaziantep'in Nizip ilçesinde, Fırat Nehri kıyısındadır.",
    category: "Tarih · Antik kentler",
  },
  {
    id: "map2",
    text: "Pamukkale travertenleri hangi ilimizdedir?",
    answer: 20,
    explanation: "Pamukkale travertenleri Denizli'dedir. Bölge, Hierapolis Antik Kenti ile birlikte tanınır.",
    category: "Coğrafya · Doğal güzellikler",
  },
  {
    id: "map3",
    text: "Anıtkabir hangi ilimizdedir?",
    answer: 6,
    explanation: "Anıtkabir, Ankara'nın Çankaya ilçesinde yer alır.",
    category: "Tarih · Cumhuriyet",
  },
  {
    id: "map4",
    text: "Türkiye'nin en büyük gölü olan Van Gölü hangi ilde bulunur?",
    answer: 65,
    explanation: "Van Gölü, Van iline bağlıdır ve yüzölçümüyle Türkiye'nin en büyük gölüdür.",
    category: "Coğrafya · Göller",
  },
  {
    id: "map5",
    text: "Çanakkale Savaşları'nın yaşandığı il hangisidir?",
    answer: 17,
    explanation: "Çanakkale Savaşları (1915-1916) bugünkü Çanakkale ilinde, Gelibolu Yarımadası'nda gerçekleşmiştir.",
    category: "Tarih · Kurtuluş Savaşı öncesi",
  },
];
