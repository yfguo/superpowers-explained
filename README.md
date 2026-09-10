# Superpowers Explained

A bilingual English/Chinese learning site for [obra/superpowers](https://github.com/obra/superpowers), inspired by the [Matt Pocock skills map](https://cnife.github.io/learn-mattpocock-skills/).

Includes a linked workflow map, all 14 skills, paired explanations and examples, language switching, searchable skill cards, and the complete original English skill documents. The explanations are editorial guides, not line-by-line translations or official Superpowers documentation.

## Run locally

Requires Node.js 22 or later.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173. Re-run `npm run build` after editing content or assets; the preview server serves the generated files without a file watcher.

## Checks

```sh
npm test
npm run test:browser
```

Local browser checks use installed Google Chrome. CI installs Playwright Chromium automatically. The checks cover original-source preservation, all local links and anchors under a GitHub Pages project path, language persistence, search and filtering, all reading pages, mobile overflow, and no-JavaScript navigation.

## Publish with GitHub Pages

`npm run build` creates `dist/`, a static site with relative URLs and no runtime dependencies or remote fonts. It can be hosted at the root of a domain or under a repository path.

After reviewing the site, push it to your GitHub repository and choose **Settings > Pages > Build and deployment > Source: GitHub Actions**. The included workflow tests and builds pull requests, and deploys successful builds on `main`. No repository has been created or pushed by this project setup.

## Content and provenance

- `content/skills.mjs`: paired English/Chinese explanations, examples, and related skills.
- `content/source.json`: exact upstream commit and review date.
- `content/upstream/`: original English `SKILL.md` files and upstream MIT license.
- `scripts/build.mjs`: static page generation and Markdown rendering.
- `assets/`: shared styles and progressive enhancements.

The source snapshot is `b36e0829c6d0140e93cfef2ca599b1b07d4a7797` (2026-08-12), reviewed on 2026-09-10. All original-source links are pinned to that revision; installation links point to the upstream README for maintained instructions. Supporting references remain on upstream GitHub; they are not translated or bundled. DOT diagrams in the original documents are shown as source code.

To update, download the 14 skill files at a chosen upstream commit into `content/upstream/`, review the explanations and map against those files, update `content/source.json`, and run both check commands. Do not update the source snapshot without reviewing the explanations.

Original Superpowers documents are Copyright (c) 2025 Jesse Vincent and distributed under the [MIT license](content/upstream/LICENSE). The reference site's visual concept inspired this implementation; its HTML, CSS, and translations are not copied.
