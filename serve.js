const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 3002;
const HOST = process.env.HOST || "127.0.0.1";
const ROOT = __dirname;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const securityHeaders = {
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https://streetstyle.maisonlooks.com https://cdn.maisonlooks.com data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests",
};

function isPublicFile(relative) {
  const normalized = relative.split(path.sep).join("/");
  if (/^[a-z0-9-]+\.html$/i.test(normalized)) return true;
  if (/^(?:css|js|images)\/[a-z0-9._/-]+\.(?:css|js|png|jpe?g|svg|webp)$/i.test(normalized)) return true;
  return /^(?:robots\.txt|sitemap\.xml|favicon\.png|apple-touch-icon\.png)$/i.test(normalized);
}

http
  .createServer((req, res) => {
    let urlPath;
    try {
      urlPath = decodeURIComponent((req.url.split("?")[0] || "/").replace(/^\/+/, "") || "index.html");
    } catch {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Bad Request");
      return;
    }

    const file = path.resolve(ROOT, urlPath);
    const relative = path.relative(ROOT, file);
    const parts = relative.split(path.sep);

    if (
      relative.startsWith("..") ||
      path.isAbsolute(relative) ||
      parts.some((part) => part.startsWith(".")) ||
      !isPublicFile(relative)
    ) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 Not Found");
        return;
      }
      res.writeHead(200, {
        "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream",
        ...securityHeaders,
      });
      res.end(data);
    });
  })
  .listen(PORT, HOST, () => {
    console.log(`LitBuy site running at http://${HOST}:${PORT}`);
  });
