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
const warnings = [];
const PRODUCT_URL_ORIGIN = "https://streetstyle.maisonlooks.com";
const PRODUCT_IMAGE_ORIGIN = "https://cdn.maisonlooks.com/products/";
const ALLOWED_EXTERNAL_ORIGINS = new Set([
  "https://litbuydb.com",
  "https://litbuy.com",
  "https://streetstyle.maisonlooks.com",
  "https://cdn.maisonlooks.com",
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
]);
const ALLOWED_HTML_I18N_KEYS = new Set([
  "about.body2",
  "alternatives.why",
  "haul.item1",
  "haul.item2",
  "haul.item3",
  "haul.cta",
  "help.a4",
  "review.step1",
  "review.step2",
  "review.step3",
  "review.step4",
  "review.step5",
  "review.verdictBody2",
]);

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function parseUrl(value) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function isAllowedExternalUrl(value) {
  const url = parseUrl(value);
  return Boolean(url && url.protocol === "https:" && ALLOWED_EXTERNAL_ORIGINS.has(url.origin));
}

function hasSafeBlankRel(attrs) {
  const target = attrs.match(/\btarget=["']([^"']+)["']/i)?.[1] || "";
  if (target.toLowerCase() !== "_blank") return true;
  const rel = attrs.match(/\brel=["']([^"']+)["']/i)?.[1] || "";
  const tokens = new Set(rel.toLowerCase().split(/\s+/).filter(Boolean));
  return tokens.has("noopener") && tokens.has("noreferrer");
}

for (const file of JS_FILES) {
  try {
    new vm.Script(read(file), { filename: file });
  } catch (error) {
    errors.push(`${file}: JavaScript syntax error: ${error.message}`);
  }
}

const dataSandbox = { window: {} };
vm.runInNewContext(read("js/products.js"), dataSandbox, { filename: "js/products.js" });
for (const product of dataSandbox.window.LITBUY_PRODUCTS || []) {
  if (!product.image) {
    errors.push(`js/products.js: product ${product.id || product.name} is missing an image`);
    continue;
  }
  if (product.image.startsWith("http")) {
    const imageUrl = parseUrl(product.image);
    if (!imageUrl || !product.image.startsWith(PRODUCT_IMAGE_ORIGIN)) {
      errors.push(`js/products.js: product ${product.id || product.name} image must come from ${PRODUCT_IMAGE_ORIGIN}`);
    }
  } else if (!fs.existsSync(path.join(ROOT, product.image))) {
    errors.push(`js/products.js: missing product image ${product.image}`);
  }
  const productUrl = parseUrl(product.url || "");
  if (!productUrl || productUrl.origin !== PRODUCT_URL_ORIGIN || !productUrl.pathname.startsWith("/en/p/")) {
    errors.push(`js/products.js: product ${product.id || product.name} must link to a StreetStyle product detail page`);
  }
  if (!product.name || !product.desc || !product.brand || !product.category) {
    errors.push(`js/products.js: product ${product.id || product.url} is missing required product information`);
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
    if (/^https?:/i.test(value)) {
      if (!isAllowedExternalUrl(value)) {
        errors.push(`${file}: external reference is not allowlisted: ${value}`);
      }
      continue;
    }
    if (/^(?:mailto:|tel:|#|data:)/i.test(value)) continue;
    const localPath = value.split(/[?#]/)[0];
    if (!localPath) continue;
    if (!fs.existsSync(path.join(ROOT, localPath))) {
      errors.push(`${file}: missing local reference ${value}`);
    }
  }

  const anchors = html.matchAll(/<a\b([^>]*?)>/gi);
  for (const match of anchors) {
    if (!hasSafeBlankRel(match[1])) {
      errors.push(`${file}: target="_blank" link is missing rel="noopener noreferrer"`);
    }
  }

  const htmlI18nAttrs = html.matchAll(/\bdata-i18n-html=["']([^"']+)["']/g);
  for (const match of htmlI18nAttrs) {
    if (!ALLOWED_HTML_I18N_KEYS.has(match[1])) {
      errors.push(`${file}: data-i18n-html key is not allowlisted: ${match[1]}`);
    }
  }
}

const vercelConfig = JSON.parse(read("vercel.json"));
const headers = (vercelConfig.headers || []).flatMap((entry) => entry.headers || []);
const csp = headers.find((header) => header.key.toLowerCase() === "content-security-policy")?.value || "";
if (!csp) {
  errors.push("vercel.json: missing Content-Security-Policy header");
}
for (const directive of ["default-src 'self'", "frame-ancestors 'none'", "base-uri 'self'", "object-src 'none'"]) {
  if (csp && !csp.includes(directive)) {
    errors.push(`vercel.json: Content-Security-Policy is missing ${directive}`);
  }
}
if (csp.includes("'unsafe-inline'")) {
  warnings.push("vercel.json: Content-Security-Policy still uses 'unsafe-inline'; remove inline scripts/styles before making this an error.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

if (warnings.length) {
  console.warn(warnings.join("\n"));
}
console.log(`Site checks passed for ${HTML_FILES.length} HTML files and ${JS_FILES.length} JS files.`);
