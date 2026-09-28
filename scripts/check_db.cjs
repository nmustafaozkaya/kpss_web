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

async function main() {
  const count = await prisma.question.count();
  console.log('Database question count:', count);
  const subjects = await prisma.subject.findMany({
    select: { name: true, slug: true, _count: { select: { questions: true } } }
  });
  console.log('Subjects in DB:', JSON.stringify(subjects, null, 2));
}

main()
  .catch(err => console.error('DB Error:', err))
  .finally(() => prisma.$disconnect());
