const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const BAD_TEXT = [/\u9225/, /\uFFFD/, /\u697C/, /\u0080/];
const HIGH_RISK_TERMS = [/\bclone\b/i, /\bhomage\b/i, /\breplica\b/i, /\bcounterfeit\b/i];
const JS_FILES = ["js/config.js", "js/products.js", "js/main.js", "serve.js"];
const HTML_FILES = fs.readdirSync(ROOT).filter((file) => file.endsWith(".html"));
const TEXT_FILES = [
  ...HTML_FILES,
  "css/style.css",
  ...JS_FILES,
  "robots.txt",
  "sitemap.xml",
  "vercel.json",
].filter((file) => fs.existsSync(path.join(ROOT, file)));

const errors = [];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

for (const file of JS_FILES) {
  try {
    new vm.Script(read(file), { filename: file });
  } catch (error) {
    errors.push(`${file}: JavaScript syntax error: ${error.message}`);
  }
}

for (const file of TEXT_FILES) {
  const text = read(file);
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (BAD_TEXT.some((pattern) => pattern.test(line))) {
      errors.push(`${file}:${index + 1}: contains mojibake or replacement characters`);
    }
    if (HIGH_RISK_TERMS.some((pattern) => pattern.test(line))) {
      errors.push(`${file}:${index + 1}: contains high-risk marketplace wording`);
    }
    if (/\son[a-z]+\s*=/i.test(line)) {
      errors.push(`${file}:${index + 1}: contains inline event handler`);
    }
  });
}

for (const file of HTML_FILES) {
  const html = read(file);
  const refs = html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g);
  for (const match of refs) {
    const value = match[1];
    if (/^(?:https?:|mailto:|tel:|#|data:)/i.test(value)) continue;
    const localPath = value.split(/[?#]/)[0];
    if (!localPath) continue;
    if (!fs.existsSync(path.join(ROOT, localPath))) {
      errors.push(`${file}: missing local reference ${value}`);
    }
  }
}

const vercelConfig = JSON.parse(read("vercel.json"));
const headers = (vercelConfig.headers || []).flatMap((entry) => entry.headers || []);
if (!headers.some((header) => header.key.toLowerCase() === "content-security-policy")) {
  errors.push("vercel.json: missing Content-Security-Policy header");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Site checks passed for ${HTML_FILES.length} HTML files and ${JS_FILES.length} JS files.`);
