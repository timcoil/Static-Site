# Static Site

A static site generator with HTML, CSS, JavaScript, and simple Node libraries. It uses Markdown for content and converts it to HTML.

## Features

1. Landing page
2. Blog posts with date-based sorting
3. Markdown -> HTML conversion with frontmatter support
4. Responsive design
5. Contact form

## Getting Started

### Prerequisites

- Node.js (version 14 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

### Development

To start the development server with live reloading:

```bash
npm run dev
```

This will:
- Build the site
- Start a development server on http://localhost:3000
- Watch for changes and rebuild automatically

### Building

To build the site without starting a server:

```bash
npm run build
```

The output will be in the `build` directory.

### Serving

To serve the built site:

```bash
npm run serve
```

This will start a server on http://localhost:8080.

## Project Structure

```
static-site/
├── build/             # Generated site (after build)
├── public/            # Static assets
│   ├── css/           # CSS files
│   └── js/            # JavaScript files
├── scripts/           # Build scripts
├── src/               # Source files
│   ├── content/       # Markdown content
│   │   ├── blog/      # Blog posts
│   │   └── pages/     # Site pages
│   └── templates/     # HTML templates
└── README.md
```

## Creating Content

### Pages

Add Markdown files to `src/content/pages/` with frontmatter:

```markdown
---
title: Page Title
---

# Content heading

Page content in Markdown...
```

### Blog Posts

Add Markdown files to `src/content/blog/` with frontmatter:

```markdown
---
title: Blog Post Title
date: 2023-05-10
---

# Post heading

Blog post content in Markdown...
```

## License

MIT