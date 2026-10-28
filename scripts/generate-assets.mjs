import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetDir = join(__dirname, '..', 'src', 'assets');
const publicDir = join(__dirname, '..', 'public');

mkdirSync(assetDir, { recursive: true });
mkdirSync(publicDir, { recursive: true });

const palettes = {
  teal: ['#082f2d', '#14b8a6', '#ccfbf1', '#f97316'],
  violet: ['#171022', '#8b5cf6', '#f5d0fe', '#14b8a6'],
  coral: ['#23120b', '#f97316', '#fed7aa', '#14b8a6'],
  rose: ['#221017', '#fb7185', '#ffe4e6', '#8b5cf6'],
};

function hexToRgba(hex, alpha = 255) {
  const clean = hex.replace('#', '');
  return [
    Number.parseInt(clean.slice(0, 2), 16),
    Number.parseInt(clean.slice(2, 4), 16),
    Number.parseInt(clean.slice(4, 6), 16),
    alpha,
  ];
}

function createCanvas(width, height, fill = '#ffffff') {
  const buffer = new Uint8Array(width * height * 4);
  const color = hexToRgba(fill);
  for (let i = 0; i < buffer.length; i += 4) {
    buffer[i] = color[0];
    buffer[i + 1] = color[1];
    buffer[i + 2] = color[2];
    buffer[i + 3] = color[3];
  }
  return { width, height, buffer };
}

function blendPixel(canvas, x, y, color) {
  if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return;
  const i = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
  const a = color[3] / 255;
  const inv = 1 - a;
  canvas.buffer[i] = Math.round(color[0] * a + canvas.buffer[i] * inv);
  canvas.buffer[i + 1] = Math.round(color[1] * a + canvas.buffer[i + 1] * inv);
  canvas.buffer[i + 2] = Math.round(color[2] * a + canvas.buffer[i + 2] * inv);
  canvas.buffer[i + 3] = 255;
}

function fillRect(canvas, x, y, width, height, hex, alpha = 255) {
  const color = hexToRgba(hex, alpha);
  for (let py = Math.max(0, Math.floor(y)); py < Math.min(canvas.height, y + height); py += 1) {
    for (let px = Math.max(0, Math.floor(x)); px < Math.min(canvas.width, x + width); px += 1) {
      blendPixel(canvas, px, py, color);
    }
  }
}

function fillCircle(canvas, cx, cy, radius, hex, alpha = 255) {
  const color = hexToRgba(hex, alpha);
  const r2 = radius * radius;
  for (let y = Math.floor(cy - radius); y <= Math.ceil(cy + radius); y += 1) {
    for (let x = Math.floor(cx - radius); x <= Math.ceil(cx + radius); x += 1) {
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r2) blendPixel(canvas, x, y, color);
    }
  }
}

function roundedRect(canvas, x, y, width, height, radius, hex, alpha = 255) {
  const color = hexToRgba(hex, alpha);
  const x2 = x + width;
  const y2 = y + height;
  for (let py = Math.floor(y); py < Math.ceil(y2); py += 1) {
    for (let px = Math.floor(x); px < Math.ceil(x2); px += 1) {
      const dx = px < x + radius ? x + radius - px : px > x2 - radius ? px - (x2 - radius) : 0;
      const dy = py < y + radius ? y + radius - py : py > y2 - radius ? py - (y2 - radius) : 0;
      if (dx * dx + dy * dy <= radius * radius) blendPixel(canvas, px, py, color);
    }
  }
}

function linearGradient(canvas, startHex, endHex, vertical = true) {
  const start = hexToRgba(startHex);
  const end = hexToRgba(endHex);
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const t = vertical ? y / (canvas.height - 1) : x / (canvas.width - 1);
      const color = [
        Math.round(start[0] * (1 - t) + end[0] * t),
        Math.round(start[1] * (1 - t) + end[1] * t),
        Math.round(start[2] * (1 - t) + end[2] * t),
        255,
      ];
      blendPixel(canvas, x, y, color);
    }
  }
}

function drawGrid(canvas, color, alpha = 32, step = 64) {
  for (let x = 0; x < canvas.width; x += step) fillRect(canvas, x, 0, 2, canvas.height, color, alpha);
  for (let y = 0; y < canvas.height; y += step) fillRect(canvas, 0, y, canvas.width, 2, color, alpha);
}

function crc32(buffer) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Uint32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c >>> 0;
    }
  }
  let c = 0xffffffff;
  for (const byte of buffer) c = table[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function writePng(canvas, filename) {
  const raw = Buffer.alloc((canvas.width * 4 + 1) * canvas.height);
  for (let y = 0; y < canvas.height; y += 1) {
    const rowStart = y * (canvas.width * 4 + 1);
    raw[rowStart] = 0;
    Buffer.from(canvas.buffer.subarray(y * canvas.width * 4, (y + 1) * canvas.width * 4)).copy(raw, rowStart + 1);
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(canvas.width, 0);
  ihdr.writeUInt32BE(canvas.height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  writeFileSync(
    join(assetDir, filename),
    Buffer.concat([signature, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]),
  );
}

function drawProfile() {
  const canvas = createCanvas(900, 900, '#0a0a0b');
  linearGradient(canvas, '#101010', '#052f2c');
  drawGrid(canvas, '#ffffff', 18, 72);
  fillCircle(canvas, 180, 160, 180, '#14b8a6', 65);
  fillCircle(canvas, 760, 230, 210, '#f97316', 55);
  fillCircle(canvas, 620, 760, 250, '#8b5cf6', 45);
  roundedRect(canvas, 96, 116, 708, 668, 34, '#ffffff', 34);
  roundedRect(canvas, 160, 602, 580, 160, 30, '#09090b', 210);
  fillCircle(canvas, 450, 382, 146, '#f4c7ab', 255);
  fillCircle(canvas, 388, 300, 82, '#201411', 245);
  fillCircle(canvas, 504, 292, 88, '#201411', 245);
  roundedRect(canvas, 324, 458, 252, 178, 58, '#17201f', 255);
  roundedRect(canvas, 245, 610, 410, 118, 20, '#f8fafc', 230);
  fillRect(canvas, 278, 645, 256, 12, '#14b8a6', 230);
  fillRect(canvas, 278, 678, 300, 12, '#f97316', 225);
  fillRect(canvas, 278, 711, 190, 12, '#8b5cf6', 220);
  roundedRect(canvas, 635, 520, 122, 152, 18, '#111827', 220);
  fillRect(canvas, 660, 552, 64, 8, '#ccfbf1', 210);
  fillRect(canvas, 660, 578, 72, 8, '#fed7aa', 210);
  fillRect(canvas, 660, 604, 48, 8, '#ddd6fe', 210);
  writePng(canvas, 'profile-portrait.png');
}

function drawProject(filename, paletteName, layout) {
  const [dark, primary, soft, accent] = palettes[paletteName];
  const canvas = createCanvas(1200, 760, dark);
  linearGradient(canvas, dark, '#09090b', false);
  drawGrid(canvas, '#ffffff', 16, 80);
  fillCircle(canvas, 140, 110, 180, primary, 75);
  fillCircle(canvas, 1070, 650, 220, accent, 70);
  roundedRect(canvas, 72, 72, 1056, 616, 30, '#ffffff', 36);
  roundedRect(canvas, 108, 118, 984, 532, 22, '#fafafa', 235);
  roundedRect(canvas, 108, 118, 984, 74, 22, '#111111', 235);
  fillCircle(canvas, 148, 156, 9, '#fb7185', 255);
  fillCircle(canvas, 178, 156, 9, '#f97316', 255);
  fillCircle(canvas, 208, 156, 9, primary, 255);
  roundedRect(canvas, 250, 142, 220, 20, 10, '#ffffff', 80);
  roundedRect(canvas, 920, 138, 118, 28, 14, primary, 220);

  if (layout === 'dashboard') {
    roundedRect(canvas, 142, 224, 188, 384, 18, '#111111', 228);
    for (let i = 0; i < 6; i += 1) roundedRect(canvas, 172, 260 + i * 48, 118, 14, 7, i === 1 ? primary : '#ffffff', i === 1 ? 240 : 70);
    for (let i = 0; i < 3; i += 1) roundedRect(canvas, 370 + i * 210, 224, 176, 104, 18, i === 0 ? primary : i === 1 ? accent : '#8b5cf6', 190);
    roundedRect(canvas, 370, 366, 422, 210, 18, '#111111', 34);
    for (let i = 0; i < 6; i += 1) fillRect(canvas, 420 + i * 52, 512 - i * 24, 28, 54 + i * 24, primary, 190);
    roundedRect(canvas, 832, 366, 220, 210, 18, '#111111', 34);
    fillCircle(canvas, 942, 470, 74, accent, 150);
    fillCircle(canvas, 942, 470, 44, '#fafafa', 240);
  }

  if (layout === 'students') {
    for (let i = 0; i < 5; i += 1) roundedRect(canvas, 150, 230 + i * 74, 900, 48, 16, i % 2 ? '#111111' : '#ffffff', i % 2 ? 22 : 95);
    for (let i = 0; i < 5; i += 1) {
      fillCircle(canvas, 190, 254 + i * 74, 17, i % 2 ? accent : primary, 210);
      roundedRect(canvas, 232, 244 + i * 74, 240, 15, 7, '#111111', 70);
      roundedRect(canvas, 730, 244 + i * 74, 154, 15, 7, primary, 160);
      roundedRect(canvas, 920, 239 + i * 74, 82, 25, 12, accent, 160);
    }
  }

  if (layout === 'commerce') {
    roundedRect(canvas, 142, 224, 246, 382, 18, '#111111', 30);
    for (let i = 0; i < 4; i += 1) roundedRect(canvas, 172, 260 + i * 62, 144, 18, 9, i === 0 ? primary : '#111111', i === 0 ? 230 : 60);
    for (let row = 0; row < 2; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        const x = 430 + col * 196;
        const y = 224 + row * 196;
        roundedRect(canvas, x, y, 160, 150, 18, '#ffffff', 215);
        fillCircle(canvas, x + 80, y + 56, 38, row === 0 ? primary : accent, 150);
        roundedRect(canvas, x + 28, y + 112, 104, 14, 7, '#111111', 70);
      }
    }
  }

  if (layout === 'portfolio') {
    roundedRect(canvas, 150, 232, 390, 290, 22, '#111111', 36);
    fillCircle(canvas, 300, 348, 96, primary, 145);
    roundedRect(canvas, 590, 246, 380, 34, 17, '#111111', 90);
    roundedRect(canvas, 590, 310, 260, 22, 11, accent, 170);
    roundedRect(canvas, 590, 372, 420, 20, 10, '#111111', 45);
    roundedRect(canvas, 590, 424, 360, 20, 10, '#111111', 45);
    roundedRect(canvas, 590, 500, 148, 42, 21, primary, 230);
    roundedRect(canvas, 764, 500, 148, 42, 21, accent, 200);
  }

  writePng(canvas, filename);
}

function escapePdf(text) {
  return text.replace(/[\\()]/g, '\\$&');
}

function createPdf() {
  const lines = [
    'Hassan Saeed',
    'Full Stack Web Developer',
    '',
    'Summary',
    'React, Node.js, Express, MongoDB, Tailwind CSS, REST APIs, Git & GitHub.',
    '',
    'Selected Projects',
    'Learning Management System, Student Management System, E-Commerce Website, Portfolio Website.',
    '',
    'Contact',
    'Email: hello@hassansaeed.dev | Phone: +92 300 1234567 | Location: Lahore, Pakistan',
  ];
  const text = lines
    .map((line, index) => {
      const size = index === 0 ? 26 : index === 1 ? 16 : ['Summary', 'Selected Projects', 'Contact'].includes(line) ? 14 : 11;
      const y = 770 - index * 28;
      return `BT /F1 ${size} Tf 72 ${y} Td (${escapePdf(line)}) Tj ET`;
    })
    .join('\n');
  const content = `${text}\n`;
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${Buffer.byteLength(content, 'latin1')} >>\nstream\n${content}endstream`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, 'latin1'));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf, 'latin1');
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i += 1) pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  writeFileSync(join(publicDir, 'hassan-saeed-cv.pdf'), pdf, 'latin1');
}

drawProfile();
drawProject('project-lms.png', 'teal', 'dashboard');
drawProject('project-student.png', 'violet', 'students');
drawProject('project-ecommerce.png', 'coral', 'commerce');
drawProject('project-portfolio.png', 'rose', 'portfolio');
createPdf();

console.log('Generated portfolio images and CV.');
