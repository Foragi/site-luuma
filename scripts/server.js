const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
};

http
  .createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const filePath = path.resolve(root, `.${pathname === "/" ? "/pages/index.html" : pathname}`);

    if (!filePath.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    fs.stat(filePath, (error, stats) => {
      if (error || !stats.isFile()) {
        response.writeHead(404).end("Not found");
        return;
      }

      response.setHeader("Content-Type", contentTypes[path.extname(filePath)] ?? "application/octet-stream");
      fs.createReadStream(filePath).pipe(response);
    });
  })
  .listen(4173, "127.0.0.1", () => {
    console.log("Luuma disponível em http://localhost:4173");
  });
