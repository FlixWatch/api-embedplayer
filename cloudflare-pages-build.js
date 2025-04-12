const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create the output directory
const outputDir = 'cloudflare-pages';
if (fs.existsSync(outputDir)) {
  // Clean up previous build
  try {
    fs.rmSync(outputDir, { recursive: true, force: true });
    console.log(`Removed existing ${outputDir} directory`);
  } catch (err) {
    console.error(`Error removing ${outputDir} directory:`, err);
  }
}

// Create the directory
fs.mkdirSync(outputDir, { recursive: true });
console.log(`Created ${outputDir} directory`);

// Copy necessary files from .next and public folders
try {
  // Copy static assets from .next/static
  if (fs.existsSync(path.join('.next', 'static'))) {
    fs.mkdirSync(path.join(outputDir, 'static'), { recursive: true });
    copyFolderRecursively(path.join('.next', 'static'), path.join(outputDir, 'static'));
    console.log('Copied .next/static to cloudflare-pages/static');
  }

  // Copy _next folder (contains js, css, etc.)
  if (fs.existsSync(path.join('.next', 'static'))) {
    fs.mkdirSync(path.join(outputDir, '_next'), { recursive: true });
    copyFolderRecursively(path.join('.next', 'static'), path.join(outputDir, '_next'));
    console.log('Copied .next/static to cloudflare-pages/_next');
  }

  // Copy public folder
  if (fs.existsSync('public')) {
    copyFolderRecursively('public', outputDir);
    console.log('Copied public folder to cloudflare-pages');
  }

  // Create index.html and other necessary HTML files
  createHtmlFiles();
  
  console.log('Build for Cloudflare Pages completed successfully!');
} catch (error) {
  console.error('Error during build process:', error);
  process.exit(1);
}

function copyFolderRecursively(source, destination) {
  // Create destination folder if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Read all items from source directory
  const items = fs.readdirSync(source);

  // Copy each item
  for (const item of items) {
    const sourcePath = path.join(source, item);
    const destPath = path.join(destination, item);

    // Check if it's a file or directory
    const stat = fs.statSync(sourcePath);
    if (stat.isFile()) {
      fs.copyFileSync(sourcePath, destPath);
    } else if (stat.isDirectory()) {
      copyFolderRecursively(sourcePath, destPath);
    }
  }
}

function createHtmlFiles() {
  // Create index.html
  const indexHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>VidPlay API</title>
  <script>
    // Simple router for handling static deployment
    const path = window.location.pathname;
    if (path === '/') {
      window.location.href = '/movie/tt0111161';
    }
  </script>
  <style>
    body {
      font-family: sans-serif;
      margin: 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #0070f3;
    }
    a {
      color: #0070f3;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>VidPlay API</h1>
    <p>Welcome to VidPlay API. You'll be redirected shortly...</p>
    <p>If you're not redirected, <a href="/movie/tt0111161">click here</a>.</p>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtml);
  
  // Create a 404.html that includes client-side routing
  const notFoundHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Not Found - VidPlay API</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }
    h1 {
      color: #0070f3;
    }
    a {
      color: #0070f3;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <p><a href="/">Go to homepage</a></p>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(outputDir, '404.html'), notFoundHtml);
  
  // Create placeholder HTML files for movie and TV routes
  createPlaceholderPage(path.join(outputDir, 'movie'), 'movie');
  createPlaceholderPage(path.join(outputDir, 'tv'), 'tv');
}

function createPlaceholderPage(dirPath, type) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const placeholderHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${type.toUpperCase()} - VidPlay API</title>
  <script src="/_next/static/chunks/main.js" defer></script>
  <script>
    // Simple client-side routing
    document.addEventListener('DOMContentLoaded', () => {
      const path = window.location.pathname;
      const idMatch = path.match(/${type}\/([^\/]+)/);
      if (idMatch && idMatch[1]) {
        document.getElementById('content').innerHTML = 'Loading ${type} ID: ' + idMatch[1] + '...';
      }
    });
  </script>
  <style>
    body {
      font-family: sans-serif;
      margin: 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #0070f3;
    }
    a {
      color: #0070f3;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${type.toUpperCase()} Page</h1>
    <div id="content">
      This is a placeholder for ${type} content.
    </div>
    <p><a href="/">Return to home</a></p>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(dirPath, 'index.html'), placeholderHtml);
} 