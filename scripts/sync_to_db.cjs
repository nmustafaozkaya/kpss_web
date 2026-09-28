const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
envFile.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) {
    process.env[k.trim()] = v.join('=').trim().replace(/^["']|["']$/g, '');
  }
});

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SUBJECT_MAP = {
  "Türkçe": { slug: "turkce", group: "GY", sort: 1 },
  "Matematik": { slug: "matematik", group: "GY", sort: 2 },
  "Geometri": { slug: "geometri", group: "GY", sort: 3 },
  "Tarih": { slug: "tarih", group: "GK", sort: 4 },
  "Coğrafya": { slug: "cografya", group: "GK", sort: 5 },
  "Vatandaşlık": { slug: "vatandaslik", group: "GK", sort: 6 },
  "Güncel Bilgiler": { slug: "guncel-bilgiler", group: "GK", sort: 7 }
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  console.log("Connecting to PostgreSQL...");
  const jsonPath = path.join(__dirname, '..', 'src', 'data', 'questions.json');
  const questions = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`Loaded ${questions.length} questions from questions.json`);

  // Ensure subjects
  const subjectDbMap = {};
  for (const [name, meta] of Object.entries(SUBJECT_MAP)) {
    const sub = await prisma.subject.upsert({
      where: { slug: meta.slug },
      update: { name, group: meta.group, sortOrder: meta.sort },
      create: { name, slug: meta.slug, group: meta.group, sortOrder: meta.sort }
    });
    subjectDbMap[name] = sub.id;
  }
  console.log("Subjects verified.");

  // Ensure topics
  const topicDbMap = {};
  for (const q of questions) {
    const subId = subjectDbMap[q.subject];
    if (!subId || !q.topic) continue;
    const tSlug = slugify(q.topic);
    const key = `${subId}_${tSlug}`;
    if (!topicDbMap[key]) {
      const topic = await prisma.topic.upsert({
        where: { subjectId_slug: { subjectId: subId, slug: tSlug } },
        update: { name: q.topic },
        create: { name: q.topic, slug: tSlug, subjectId: subId }
      });
      topicDbMap[key] = topic.id;
    }
  }
  console.log("Topics verified.");

  // Insert or update questions
  let count = 0;
  for (const q of questions) {
    const subId = subjectDbMap[q.subject];
    if (!subId) continue;
    const tSlug = slugify(q.topic);
    const topicId = topicDbMap[`${subId}_${tSlug}`] || null;

    const optData = (q.options || []).map((optText, idx) => ({
      label: "ABCDE"[idx] || String(idx + 1),
      text: optText,
      isCorrect: q.answer === idx,
      sortOrder: idx
    }));

    await prisma.question.upsert({
      where: { legacyId: q.id },
      update: {
        text: q.text,
        explanation: q.explanation || null,
        imageUrl: q.imageUrl || null,
        subjectId: subId,
        topicId: topicId,
        status: "PUBLISHED",
        options: {
          deleteMany: {},
          create: optData
        }
      },
      create: {
        legacyId: q.id,
        text: q.text,
        explanation: q.explanation || null,
        imageUrl: q.imageUrl || null,
        subjectId: subId,
        topicId: topicId,
        status: "PUBLISHED",
        options: {
          create: optData
        }
      }
    });

    count++;
    if (count % 50 === 0) {
      console.log(`Synced ${count}/${questions.length} questions...`);
    }
  }

  console.log(`Successfully synced ${count} questions to PostgreSQL database!`);
}

main()
  .catch(err => {
    console.error("Database sync failed:", err.message);
    console.log("Note: If using remote DB, make sure SSH tunnel is active:");
    console.log("  ssh -L 55432:127.0.0.1:5432 ubuntu@158.180.57.126 -N");
  })
  .finally(() => prisma.$disconnect());
