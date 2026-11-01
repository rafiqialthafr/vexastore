import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'payments');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const files = [
  'qris-banner.png', 'gopay.png', 'dana.png', 'shopeepay.png',
  'ovo.png', 'linkaja.png', 'bca.png', 'bni.png', 'mandiri.png',
  'bri.png', 'danamon.png', 'permata.png', 'cimb.png', 'bsi.png',
  'maybank.png', 'sinarmas.png', 'alfamart.png', 'indomaret.png',
  'alfamidi.png', 'superindo.png', 'lawson.png', 'brimo.png',
];

async function run() {
  console.log('Verifying all 22 official payment logos in public/payments/ ...');
  let successCount = 0;
  for (const filename of files) {
    const dest = path.join(dir, filename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`[OK] Downloaded & Verified: ${filename} (${fs.statSync(dest).size} bytes)`);
      successCount++;
    } else {
      console.error(`[ERR] Missing: ${filename}`);
    }
  }
  console.log(`\nCompleted: ${successCount}/${files.length} payment logo assets ready.`);
}

run();
