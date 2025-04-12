const fs = require('fs');
const path = require('path');

// Create cloudflare-pages directory if it doesn't exist
if (!fs.existsSync('cloudflare-pages')) {
  fs.mkdirSync('cloudflare-pages', { recursive: true });
}

// Copy the content of .next/static to cloudflare-pages/static
const staticDir = path.join('.next', 'static');
const targetStaticDir = path.join('cloudflare-pages', 'static');
if (fs.existsSync(staticDir)) {
  fs.mkdirSync(targetStaticDir, { recursive: true });
  copyFolderRecursive(staticDir, targetStaticDir);
}

// Copy the content of public to cloudflare-pages
const publicDir = 'public';
if (fs.existsSync(publicDir)) {
  const files = fs.readdirSync(publicDir);
  files.forEach(file => {
    const srcPath = path.join(publicDir, file);
    const destPath = path.join('cloudflare-pages', file);
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
    } else {
      copyFolderRecursive(srcPath, destPath);
    }
  });
}

// Copy other required files from .next/
copyNextOutputFiles();

// Create an index.html that redirects to the starting page
createIndexHtml();

console.log('Files exported to cloudflare-pages directory successfully!');

function copyFolderRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  files.forEach(file => {
    const srcPath = path.join(source, file);
    const destPath = path.join(target, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyFolderRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

function copyNextOutputFiles() {
  // Copy HTML files from .next/server/pages if it exists
  const pagesDir = path.join('.next', 'server', 'pages');
  if (fs.existsSync(pagesDir)) {
    copyFolderRecursive(pagesDir, 'cloudflare-pages');
  }
  
  // Copy HTML files from .next directory
  const nextDir = '.next';
  if (fs.existsSync(nextDir)) {
    const files = fs.readdirSync(nextDir);
    files.forEach(file => {
      if (file.endsWith('.html')) {
        fs.copyFileSync(path.join(nextDir, file), path.join('cloudflare-pages', file));
      }
    });
  }
}

function createIndexHtml() {
  const indexHtmlPath = path.join('cloudflare-pages', 'index.html');
  
  // Get the redirect destination from next.config.js
  let redirectPath = '/movie/tt0111161'; // Default destination
  try {
    const nextConfig = require('./next.config.js');
    if (nextConfig.redirects && typeof nextConfig.redirects === 'function') {
      const redirects = nextConfig.redirects();
      const rootRedirect = redirects.find(r => r.source === '/');
      if (rootRedirect) {
        redirectPath = rootRedirect.destination;
      }
    }
  } catch (error) {
    console.error('Error reading next.config.js:', error.message);
  }
  
  // Create a simple HTML file that redirects to the main page
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>VidPlay API</title>
  <meta http-equiv="refresh" content="0;url=${redirectPath}">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
    }
    p {
      margin: 10px 0;
    }
    a {
      color: #0070f3;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <h1>VidPlay API</h1>
  <p>Redirecting to <a href="${redirectPath}">${redirectPath}</a>...</p>
  <p>If you are not redirected automatically, follow the link.</p>
</body>
</html>`;

  fs.writeFileSync(indexHtmlPath, htmlContent);
} 