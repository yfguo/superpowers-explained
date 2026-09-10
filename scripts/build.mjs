import { mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';
import { skills } from '../content/skills.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = `${root}dist`;
const source = JSON.parse(await readFile(`${root}content/source.json`, 'utf8'));
const upstream = `${source.repository}/blob/${source.commit}`;
const byId = Object.fromEntries(skills.map(skill => [skill.id, skill]));
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const pair = ([en, zh], tag = 'span', cls = '') => `<${tag} class="bilingual ${cls}"><span lang="en">${escape(en)}</span><span lang="zh-CN">${escape(zh)}</span></${tag}>`;
const arrow = '<span aria-hidden="true">&rarr;</span>';
const href = (id, prefix = '') => `${prefix}${id}/SKILL.html`;

function shell(title, content, prefix = '', current = '') {
  return `<!doctype html>
<html lang="en" data-language="both">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(title)}. A bilingual English and Chinese learning guide to the obra/superpowers development workflow.">
  <meta name="theme-color" content="#f6f4ed">
  <title>${escape(title)} | Superpowers Explained</title>
  <link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${prefix}assets/style.css">
  <script src="${prefix}assets/site.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content / 跳到正文</a>
  <header class="site-header">
    <a class="brand" href="${prefix}index.html" aria-label="Superpowers Explained home"><span class="brand-mark" aria-hidden="true">sp.</span><span>superpowers<span class="brand-caption">EXPLAINED / 技能详解</span></span></a>
    <nav class="top-nav" aria-label="Main navigation">
      <a href="${prefix}index.html" ${current ? '' : 'aria-current="page"'}>${pair(['Skill map', '技能图谱'])}</a>
      <a href="${prefix}index.html#library">${pair(['All skills', '全部技能'])}</a>
      <a class="upstream-nav" href="${source.repository}">GitHub ${arrow}</a>
    </nav>
    <div class="language-control" role="group" aria-label="Reading language / 阅读语言" hidden>
      <button type="button" data-language="both" aria-pressed="true">中 / EN</button>
      <button type="button" data-language="zh" aria-pressed="false">中文</button>
      <button type="button" data-language="en" aria-pressed="false">EN</button>
    </div>
  </header>
  ${content}
  <footer class="site-footer">
    <div>${pair(['An independent field guide to better agentic development.', '一份帮助你理解代理开发方法的独立学习指南。'], 'p')}<p>Superpowers by <a href="${source.repository}">Jesse Vincent / obra</a>. <a href="${prefix}LICENSE-upstream.txt">Upstream MIT license</a>.</p></div>
    <div class="footer-meta">${pair(['Source snapshot', '上游快照'])}<a href="${source.repository}/commit/${source.commit}"><code>${source.commit.slice(0, 7)}</code> / ${source.commitDate}</a>${pair(['Explanations, not a line-by-line translation.', '本站提供讲解，并非逐行翻译。'])}<a href="https://cnife.github.io/learn-mattpocock-skills/">${pair(['Inspired by the Matt Pocock skill map', '灵感来自 Matt Pocock 技能图谱'])} ${arrow}</a></div>
  </footer>
</body>
</html>`;
}

function node(id, { prefix = '', small = false } = {}) {
  const skill = byId[id];
  return `<a class="skill-node ${skill.category} ${small ? 'compact' : ''}" href="${href(id, prefix)}"><span class="node-name">${escape(id)}</span>${pair(skill.short, 'span', 'node-description')}<span class="node-arrow" aria-hidden="true">&nearr;</span></a>`;
}

function home() {
  const stages = [
    { label: ['Understand', '理解'], ids: ['brainstorming'], note: ['Start with intent. Agree on the design.', '先理解意图，再确认设计。'] },
    { label: ['Plan', '计划'], ids: ['writing-plans'], note: ['Turn the spec into testable tasks.', '把规格拆成可验证的任务。'] },
    { label: ['Prepare', '准备'], ids: ['using-git-worktrees'], note: ['Check isolation and the test baseline.', '检查工作隔离与测试基线。'] },
    { label: ['Build', '实现'], ids: ['subagent-driven-development', 'executing-plans'], note: ['Choose an execution approach.', '选择一种执行方式。'] },
    { label: ['Review', '审查'], ids: ['requesting-code-review'], note: ['Review each task and the final result.', '审查每个任务与最终成果。'] },
    { label: ['Verify', '验证'], ids: ['verification-before-completion'], note: ['Make the evidence match the claim.', '让证据与结论相符。'] },
    { label: ['Finish', '收尾'], ids: ['finishing-a-development-branch'], note: ['Choose how to integrate the work.', '选择如何集成成果。'] }
  ];
  return shell('Skill map / 技能图谱', `<main id="main" class="home-main">
    <section class="hero">
      <div class="eyebrow"><span class="status-dot"></span> OBRA / SUPERPOWERS <span class="eyebrow-divider">/</span> ${pair(['A BILINGUAL FIELD GUIDE', '中英双语学习指南'])}</div>
      <h1>Superpowers, <em>explained.</em><span lang="zh-CN" class="hero-chinese">从想法到可靠交付。</span></h1>
      ${pair(['Understand the skills. See how they connect. Build with a repeatable process.', '理解每个技能，看清它们如何协作，用可重复的流程完成开发。'], 'p', 'hero-description')}
      <div class="hero-actions"><a class="primary-button" href="using-superpowers/SKILL.html">${pair(['Start learning', '开始阅读'])} ${arrow}</a><a class="text-link" href="${source.repository}#installation">${pair(['Install Superpowers', '安装 Superpowers'])} <span aria-hidden="true">&nearr;</span></a></div>
      <div class="hero-stamp"><strong>14</strong>${pair(['COMPOSABLE SKILLS', '可组合技能'])}<span class="stamp-line"></span>${pair(['One connected workflow', '一套连贯的工作流'])}</div>
    </section>

    <section class="map-section" aria-labelledby="map-title">
      <div class="section-heading"><div><span class="section-index">01 / THE MAP</span>${pair(['From idea to delivery', '从想法到交付'], 'h2')}</div>${pair(['Follow the main route. Use supporting skills along the way.', '沿主线阅读，按需使用辅助技能。'], 'p')}</div>
      <h2 id="map-title" class="sr-only">Workflow map / 工作流图谱</h2>
      <div class="map-entry"><span class="eyebrow">${pair(['BEFORE YOU BEGIN', '开始之前'])}</span>${node('using-superpowers')}<span class="entry-line" aria-hidden="true"></span></div>
      <div class="workflow-layout">
        <div class="main-route"><div class="route-label"><span class="legend-dot workflow"></span>${pair(['THE DEVELOPMENT ROUTE', '开发主线'])}</div>
          ${stages.map((stage, i) => `<div class="flow-stage"><div class="stage-label"><span class="stage-number">${String(i + 1).padStart(2, '0')}</span>${pair(stage.label)}</div><div class="stage-nodes">${stage.ids.map((id, index) => `${index ? `<span class="or-label">${pair(['or', '或'])}</span>` : ''}${node(id)}`).join('')}</div>${pair(stage.note, 'p', 'stage-note')}</div>`).join('')}
        </div>
        <aside class="support-route" aria-label="Supporting skills / 辅助技能"><div class="route-label"><span class="legend-dot quality"></span>${pair(['ALONG THE WAY', '贯穿开发过程'])}</div>
          <div class="support-group">${pair(['While implementing', '实现过程中'], 'h3')}${node('test-driven-development', {small: true})}${pair(['Keep the red-green-refactor loop inside each task.', '在每个任务内部保持红、绿、重构循环。'], 'p')}</div>
          <div class="support-group">${pair(['When something breaks', '出现故障时'], 'h3')}${node('systematic-debugging', {small: true})}${pair(['Investigate the cause before changing the code.', '修改代码前先调查原因。'], 'p')}</div>
          <div class="support-group">${pair(['When feedback arrives', '收到反馈时'], 'h3')}${node('receiving-code-review', {small: true})}${pair(['Check the suggestion against the actual codebase.', '结合实际代码库验证建议。'], 'p')}</div>
          <div class="map-note">${pair(['A reading route, not a rigid pipeline.', '这是阅读路线，不是固定流水线。'], 'strong')}${pair(['Review and verification recur throughout the work. Bounded changes may skip a written plan; workspace setup happens at execution time.', '审查和验证贯穿工作。有限修改可省略书面计划，工作空间在执行阶段准备。'], 'p')}</div>
        </aside>
      </div>
      <div class="foundation-row"><div>${pair(['Beyond the main route', '主线之外'], 'h3')}${pair(['Independent work and the skills system itself.', '独立任务与技能系统本身。'], 'p')}</div>${node('dispatching-parallel-agents', {small: true})}${node('writing-skills', {small: true})}</div>
      <div class="map-legend"><span><i class="legend-dot workflow"></i>${pair(['Development', '开发流程'])}</span><span><i class="legend-dot quality"></i>${pair(['Quality', '质量保障'])}</span><span><i class="legend-dot foundation"></i>${pair(['Tools and foundations', '工具与基础'])}</span>${pair(['Every skill opens a bilingual reading page.', '点击任意技能进入双语阅读页。'], 'p')}</div>
    </section>

    <section class="library-section" id="library" aria-labelledby="library-title"><div class="section-heading"><div><span class="section-index">02 / THE LIBRARY</span>${pair(['Find your next skill', '找到你需要的技能'], 'h2')}</div><label class="search-box" hidden><span class="sr-only">Search skills / 搜索技能</span><span aria-hidden="true">⌕</span><input id="skill-search" type="search" placeholder="Search skills / 搜索技能" autocomplete="off"><kbd>/</kbd></label></div><h2 id="library-title" class="sr-only">All 14 skills / 全部 14 个技能</h2>
      <div class="filter-bar" hidden role="group" aria-label="Filter by category / 按类别筛选">${[['all', ['All skills', '全部']], ['workflow', ['Development', '开发流程']], ['quality', ['Quality', '质量保障']], ['toolbox', ['Parallel work', '并行任务']], ['foundation', ['Foundations', '基础技能']]].map(([id, title]) => `<button type="button" data-filter="${id}" aria-pressed="${id === 'all'}">${pair(title)}</button>`).join('')}<output id="result-count" aria-live="polite">14 / 14</output></div>
      <div class="skill-grid">${skills.map((skill, i) => `<a class="library-card ${skill.category}" data-category="${skill.category}" data-search="${escape([skill.id, ...skill.title, ...skill.short, ...skill.intro, ...skill.when].join(' ').toLowerCase())}" href="${href(skill.id)}"><span class="card-number">${String(i + 1).padStart(2, '0')} <span aria-hidden="true">&nearr;</span></span>${pair(skill.title, 'h3')}<code>${skill.id}</code>${pair(skill.short, 'p')}</a>`).join('')}</div>
      <div id="empty-state" class="empty-state" hidden>${pair(['No matching skills. Try another term or clear the filters.', '没有匹配的技能。请尝试其他关键词，或清除筛选条件。'], 'p')}<button type="button" id="clear-filters">${pair(['Clear filters', '清除筛选'])}</button></div>
    </section>
    <section class="reading-note">${pair(['Read the method, then read the source.', '先理解方法，再阅读原文。'], 'h2')}${pair(['Each guide pairs English and Chinese explanations with a practical example. The complete English SKILL.md is included on every page, with links to upstream references at the same pinned revision.', '每篇指南都提供中英对照讲解与实际示例。每页附有完整英文 SKILL.md，并链接到相同固定版本的上游参考资料。'], 'p')}</section>
  </main>`);
}

function renderSource(markdown, id) {
  const engine = new Marked({ renderer: {
    html({ text }) { return escape(text); },
    heading({ tokens, depth }) { const level = Math.min(depth + 1, 6); return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>`; },
    link({ href: link, tokens }) {
      const url = new URL(link, `${upstream}/skills/${id}/SKILL.md`);
      return `<a href="${escape(url.href)}">${this.parser.parseInline(tokens)}</a>`;
    },
    image({ href: link, text }) {
      const url = new URL(link, `${upstream}/skills/${id}/SKILL.md`);
      return `<a href="${escape(url.href)}">${escape(text || 'Upstream image')}</a>`;
    }
  }});
  const end = markdown.startsWith('---\n') ? markdown.indexOf('\n---\n', 4) + 5 : 0;
  return `${end ? `<pre class="source-metadata"><code>${escape(markdown.slice(0, end))}</code></pre>` : ''}${engine.parse(markdown.slice(end))}`;
}

async function skillPage(skill, index) {
  const markdown = await readFile(`${root}content/upstream/${skill.id}.md`, 'utf8');
  const sections = [['when', ['When to use it', '何时使用']], ['workflow', ['How it works', '工作流程']], ['rule', ['The key constraint', '关键约束']], ['mistake', ['A common mistake', '常见误区']], ['example', ['A practical example', '实际示例']]];
  return shell(`${skill.id} / ${skill.title[1]}`, `<main id="main" class="reader-main">
    <div class="breadcrumbs"><a href="../index.html">${pair(['Skill map', '技能图谱'])}</a><span aria-hidden="true">/</span><span>${skill.id}</span></div>
    <div class="reader-layout"><aside class="reader-sidebar"><span class="section-index">FIELD NOTES / 阅读指南</span><nav aria-label="On this page / 本页目录">${sections.map(([id, title]) => `<a href="#${id}">${pair(title)}</a>`).join('')}<a href="#original">${pair(['Original source', '英文原文'])}</a></nav><a class="sidebar-map" href="../index.html">&larr; ${pair(['Back to the map', '返回图谱'])}</a></aside>
    <article class="skill-article"><header class="article-header"><div class="eyebrow"><span class="legend-dot ${skill.category}"></span> SKILL ${String(index + 1).padStart(2, '0')} / 14</div><h1>${skill.id}</h1>${pair(skill.title, 'p', 'article-subtitle')}${pair(skill.intro, 'p', 'article-intro')}<div class="article-meta">${pair(['Bilingual explanation', '中英对照讲解'])}<span aria-hidden="true">/</span><a href="${upstream}/skills/${skill.id}/SKILL.md">${pair(['View on GitHub', '查看上游'])} &nearr;</a></div></header>
    ${sections.map(([id, title], i) => `<section class="reading-section ${id === 'rule' ? 'rule-section' : ''}" id="${id}"><div class="reading-heading"><span>${String(i + 1).padStart(2, '0')}</span>${pair(title, 'h2')}</div>${id === 'workflow' ? `<ol class="step-list">${skill.steps.map(step => `<li>${pair(step, 'p')}</li>`).join('')}</ol>` : pair(skill[id], 'p')}</section>`).join('')}
    <section class="original-section" id="original">${pair(['Read the complete source', '阅读完整原文'], 'h2')}${pair(['The original English skill is reproduced below under its MIT license. The bilingual guide above is an explanation, not a complete translation. Supporting-file links open the pinned upstream revision.', '下方依据 MIT 许可收录完整英文技能。上方双语指南是讲解，并非完整翻译。辅助文件链接指向固定版本的上游。'], 'p')}<details><summary>${pair(['Open original SKILL.md (English)', '展开原始 SKILL.md（英文）'])}<span aria-hidden="true">+</span></summary><div class="source-document" lang="en">${renderSource(markdown, skill.id)}</div></details><a class="raw-link" href="../upstream/${skill.id}.md" download>${pair(['Download original Markdown', '下载原始 Markdown'])} &darr;</a></section>
    <section class="related-section">${pair(['Connected skills', '相关技能'], 'h2')}<div class="related-grid">${skill.related.map(id => node(id, {prefix: '../', small: true})).join('')}</div></section>
    <nav class="page-pagination" aria-label="Skill reading order">${index > 0 ? `<a href="${href(skills[index - 1].id, '../')}">${pair(['Previous skill', '上一个技能'])}<strong>&larr; ${skills[index - 1].id}</strong></a>` : '<span></span>'}${index < skills.length - 1 ? `<a href="${href(skills[index + 1].id, '../')}">${pair(['Next skill', '下一个技能'])}<strong>${skills[index + 1].id} &rarr;</strong></a>` : `<a href="../index.html">${pair(['Keep exploring', '继续探索'])}<strong>Skill map / 技能图谱 &rarr;</strong></a>`}</nav>
    </article></div></main>`, '../', skill.id);
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(`${root}assets`, `${out}/assets`, { recursive: true });
await cp(`${root}content/upstream`, `${out}/upstream`, { recursive: true });
await cp(`${root}content/upstream/LICENSE`, `${out}/LICENSE-upstream.txt`);
await writeFile(`${out}/.nojekyll`, '');
await writeFile(`${out}/index.html`, home());
for (const [index, skill] of skills.entries()) {
  await mkdir(`${out}/${skill.id}`, { recursive: true });
  await writeFile(`${out}/${skill.id}/SKILL.html`, await skillPage(skill, index));
}
console.log(`Built skill map and ${skills.length} bilingual skill pages in dist/`);
