const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const frontMatter = require('front-matter');
const { glob } = require('glob');

// Configure directories
const srcDir = path.join(__dirname, '../src');
const publicDir = path.join(__dirname, '../public');
const buildDir = path.join(__dirname, '../build');

// Ensure build directory exists
fs.ensureDirSync(buildDir);

// Copy all static assets to build directory
fs.copySync(publicDir, buildDir);

// Process content
async function processContent() {
  try {
    // Process pages
    const pageFiles = await glob('content/pages/**/*.md', { cwd: srcDir });
    for (const pageFile of pageFiles) {
      await processFile(pageFile, 'pages');
    }

    // Process blog posts
    const blogFiles = await glob('content/blog/**/*.md', { cwd: srcDir });
    const blogPosts = [];

    for (const blogFile of blogFiles) {
      const postData = await processFile(blogFile, 'blog');
      if (postData) {
        blogPosts.push(postData);
      }
    }

    // Sort blog posts by date (newest first)
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Generate blog index
    await generateBlogIndex(blogPosts);

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
  }
}

async function processFile(filePath, contentType) {
  try {
    const fileContent = fs.readFileSync(path.join(srcDir, filePath), 'utf8');
    const { attributes, body } = frontMatter(fileContent);
    
    const title = attributes.title || 'Untitled';
    const template = attributes.template || 'layout';
    
    // Convert markdown to HTML
    const content = marked.parse(body);
    
    // Determine the output path
    const baseName = path.basename(filePath, '.md');
    let outputPath;
    let urlPath;
    
    if (contentType === 'blog') {
      outputPath = path.join(buildDir, 'blog', baseName, 'index.html');
      urlPath = `/blog/${baseName}/`;
      fs.ensureDirSync(path.join(buildDir, 'blog', baseName));
    } else {
      // For pages, use the basename for the URL except for index
      if (baseName === 'index') {
        outputPath = path.join(buildDir, 'index.html');
        urlPath = '/';
      } else {
        outputPath = path.join(buildDir, baseName, 'index.html');
        urlPath = `/${baseName}/`;
        fs.ensureDirSync(path.join(buildDir, baseName));
      }
    }
    
    // Get the appropriate template
    let templateContent;
    if (contentType === 'blog') {
      templateContent = fs.readFileSync(path.join(srcDir, 'templates/blog-post.html'), 'utf8');
    } else {
      templateContent = fs.readFileSync(path.join(srcDir, `templates/${template}.html`), 'utf8');
    }
    
    // Replace template placeholders
    let html = templateContent.replace('{{content}}', content);
    html = html.replace('{{title}}', title);
    
    // Replace any other frontmatter attributes
    Object.keys(attributes).forEach(key => {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), attributes[key]);
    });
    
    // Write the HTML file
    fs.writeFileSync(outputPath, html);
    
    // For blog posts, return data for the index
    if (contentType === 'blog') {
      // Create an excerpt
      const excerpt = body.split('\n\n').slice(0, 2).join('\n\n');
      const excerptHtml = marked.parse(excerpt);
      
      return {
        title,
        date: attributes.date || new Date().toISOString().split('T')[0],
        path: urlPath,
        excerpt: excerptHtml
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return null;
  }
}

async function generateBlogIndex(posts) {
  try {
    // Read the blog index content
    const blogIndexFile = path.join(srcDir, 'content/pages/blog.md');
    const indexContent = fs.readFileSync(blogIndexFile, 'utf8');
    const { attributes, body } = frontMatter(indexContent);
    
    // Convert markdown to HTML
    const content = marked.parse(body);
    
    // Get the template
    const templateContent = fs.readFileSync(path.join(srcDir, 'templates/blog-index.html'), 'utf8');
    
    // Replace content in template
    let html = templateContent.replace('{{content}}', content);
    html = html.replace('{{title}}', attributes.title || 'Blog');
    
    // Replace blog posts list
    const postsPattern = '{{#each posts}}';
    const postsEndPattern = '{{/each}}';
    
    const postsStart = html.indexOf(postsPattern);
    const postsEnd = html.indexOf(postsEndPattern) + postsEndPattern.length;
    
    if (postsStart !== -1 && postsEnd !== -1) {
      const beforePosts = html.substring(0, postsStart);
      const afterPosts = html.substring(postsEnd);
      const postTemplate = html.substring(
        postsStart + postsPattern.length,
        postsEnd - postsEndPattern.length
      );
      
      let postsHtml = '';
      for (const post of posts) {
        let postHtml = postTemplate;
        Object.keys(post).forEach(key => {
          postHtml = postHtml.replace(new RegExp(`{{this.${key}}}`, 'g'), post[key]);
        });
        postsHtml += postHtml;
      }
      
      html = beforePosts + postsHtml + afterPosts;
    }
    
    // Ensure blog directory exists
    fs.ensureDirSync(path.join(buildDir, 'blog'));
    
    // Write the blog index file
    fs.writeFileSync(path.join(buildDir, 'blog/index.html'), html);
  } catch (error) {
    console.error('Error generating blog index:', error);
  }
}

// Run the build
processContent(); 