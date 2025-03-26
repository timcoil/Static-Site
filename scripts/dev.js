const liveServer = require('live-server');
const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

// Configure paths
const srcDir = path.join(__dirname, '../src');
const buildDir = path.join(__dirname, '../build');

// Initial build
console.log('Performing initial build...');
exec('node scripts/build.js', (error) => {
  if (error) {
    console.error('Initial build failed:', error);
    return;
  }
  
  console.log('Initial build completed. Starting development server...');
  
  // Start live-server
  const serverParams = {
    port: 3000,
    root: buildDir,
    open: true,
    file: 'index.html',
    wait: 100,
    logLevel: 2
  };
  
  liveServer.start(serverParams);
  
  // Watch for changes
  const watcher = chokidar.watch([
    path.join(srcDir, 'content/**/*.md'),
    path.join(srcDir, 'templates/**/*.html'),
    path.join(__dirname, '../public/**/*')
  ], {
    persistent: true,
    ignoreInitial: true
  });
  
  watcher.on('all', (event, filePath) => {
    console.log(`${event}: ${filePath}`);
    console.log('Rebuilding...');
    
    exec('node scripts/build.js', (error) => {
      if (error) {
        console.error('Rebuild failed:', error);
        return;
      }
      
      console.log('Rebuild completed.');
    });
  });
  
  console.log('Watching for changes...');
}); 