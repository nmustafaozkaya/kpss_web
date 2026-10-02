// Local OCR only: page images stay on this computer.
const fs = require('node:fs');
const path = require('node:path');
const {createWorker} = require(process.env.TESSERACT_MODULE || 'tesseract.js');
const dir = path.resolve(process.env.OCR_WORK_DIR || 'tmp/pdfs/turkce');
async function main() {
  const jobs = JSON.parse(fs.readFileSync(path.join(dir, process.argv[2] || 'jobs.json'), 'utf8'));
  let index = 0, done = 0;
  await Promise.all(Array.from({length: 4}, async () => {
    const worker = await createWorker('tur', 1, {cachePath: dir});
    await worker.setParameters({tessedit_pageseg_mode: process.argv[3] || '3', user_defined_dpi: '300'});
    while (index < jobs.length) {
      const name = jobs[index++];
      const output = path.join(dir, name + '.json');
      if (!fs.existsSync(output)) {
        const {data} = await worker.recognize(path.join(dir, name + '.png'), {}, {text:true, tsv:true});
        fs.writeFileSync(output, JSON.stringify({text:data.text, confidence:data.confidence, tsv:data.tsv}));
      }
      if (++done % 10 === 0) console.log(`${done}/${jobs.length}`);
    }
    await worker.terminate();
  }));
}
main().catch(e=>{console.error(e);process.exitCode=1;});
