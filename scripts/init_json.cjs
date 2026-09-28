const fs = require('fs');
const path = require('path');

const tsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'questions.ts'), 'utf8');

// Extract the questions array text
const match = tsCode.match(/export const questions:\s*Question\[\]\s*=\s*(\[[\s\S]*?\n\]);/);
if (!match) {
  console.error("Could not find questions array");
  process.exit(1);
}

// Evaluate using Function/eval in Node
const questions = eval(match[1]);
fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'data', 'questions.json'),
  JSON.stringify(questions, null, 2),
  'utf8'
);
console.log(`Successfully wrote ${questions.length} questions to src/data/questions.json`);
