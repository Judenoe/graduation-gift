const fs = require('fs');
const path = require('path');

const root = process.cwd();
const out = path.join(root, 'dist');

function shouldIgnore(file) {
  const ignore = ['.git', 'node_modules', 'dist', '.DS_Store', 'a11y-report.html', 'a11y-report.json'];
  return ignore.includes(file);
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const items = fs.readdirSync(src);
    for (const item of items) {
      if (shouldIgnore(item)) continue;
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else if (stat.isFile()) {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// remove existing dist
if (fs.existsSync(out)) {
  fs.rmSync(out, { recursive: true, force: true });
}

fs.mkdirSync(out, { recursive: true });

// copy files
const entries = fs.readdirSync(root);
for (const entry of entries) {
  if (shouldIgnore(entry)) continue;
  copyRecursive(path.join(root, entry), path.join(out, entry));
}

console.log('Build finished — output in ./dist');
