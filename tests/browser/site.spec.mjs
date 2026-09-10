import { test, expect } from '@playwright/test';
import { skills } from '../../content/skills.mjs';

test('map navigation and bilingual language preference survive page changes', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-chinese')).toBeVisible();
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.locator('.hero-chinese')).toBeHidden();
  await page.locator('.map-entry a').click();
  await expect(page).toHaveURL(/using-superpowers\/SKILL.html$/);
  await expect(page.locator('.article-intro > [lang="zh-CN"]')).toBeHidden();
  await page.getByRole('button', { name: '中文', exact: true }).click();
  await expect(page.locator('.article-intro > [lang="zh-CN"]')).toBeVisible();
  await expect(page.locator('.article-intro > [lang="en"]')).toBeHidden();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await page.getByRole('button', { name: '中 / EN', exact: true }).click();
  await expect(page.locator('.article-intro > [lang="en"]')).toBeVisible();
  await expect(page.locator('.article-intro > [lang="zh-CN"]')).toBeVisible();
});

test('search, category intersection, keyboard shortcut and empty-state reset work', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('/');
  await expect(page.locator('#skill-search')).toBeFocused();
  await page.locator('#skill-search').fill('调试');
  await expect(page.locator('.library-card:visible')).not.toHaveCount(0);
  await page.locator('#skill-search').fill('test-driven-development');
  await expect(page.locator('.library-card:visible')).toHaveCount(1);
  await page.locator('[data-filter="workflow"]').click();
  await expect(page.locator('#empty-state')).toBeVisible();
  await page.locator('#clear-filters').click();
  await expect(page.locator('.library-card:visible')).toHaveCount(14);
  await expect(page.locator('#skill-search')).toHaveValue('');
  await page.locator('[data-filter="quality"]').click();
  await expect(page.locator('.library-card:visible')).toHaveCount(4);
});

test('all reading pages load without errors and keep full source readable', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const skill of skills) {
    const response = await page.goto(`/${skill.id}/SKILL.html`);
    expect(response.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(skill.id);
    await page.locator('summary').click();
    await expect(page.locator('.source-document')).toBeVisible();
    await expect(page.locator('.source-document')).toContainText(`name: ${skill.id}`);
  }
  expect(errors).toEqual([]);
});

test('all pages fit narrow screens, including expanded original source', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of ['/', ...skills.map(skill => `/${skill.id}/SKILL.html`)]) {
    await page.goto(path);
    if (path !== '/') await page.locator('summary').click();
    const size = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: window.innerWidth }));
    expect(size.content, path).toBeLessThanOrEqual(size.viewport);
  }
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
});

test('content and source disclosure work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.locator('.library-card')).toHaveCount(14);
  await expect(page.locator('.language-control')).toBeHidden();
  await page.locator('.map-entry a').click();
  await page.locator('summary').click();
  await expect(page.locator('.source-document')).toBeVisible();
  await context.close();
});
