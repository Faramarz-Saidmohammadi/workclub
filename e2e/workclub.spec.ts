import { expect, test } from '@playwright/test';

const password = 'WorkClubDemo!2026';

async function login(page: import('@playwright/test').Page, email: string) {
  await page.goto('/login');
  await page.getByLabel('Work email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
}

async function openNavigation(page: import('@playwright/test').Page) {
  const mobileTrigger = page.getByRole('button', { name: 'Open navigation' });
  if (await mobileTrigger.isVisible()) await mobileTrigger.click();
}

async function navigateTo(page: import('@playwright/test').Page, name: string) {
  await openNavigation(page);
  await page.getByRole('menuitem', { name }).click();
}

test('Owner can access the operational workspace and audit trail', async ({ page }) => {
  await login(page, 'owner@workclub.demo');
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole('heading', { name: 'Good to see you, Olivia' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open notifications' })).toBeVisible();

  await navigateTo(page, 'Projects');
  await expect(page.getByText('Atlas Digital Launch')).toBeVisible();

  await navigateTo(page, 'Audit trail');
  await expect(page.getByRole('heading', { name: 'Audit trail' })).toBeVisible();
});

test('Member navigation is restricted to assigned delivery work', async ({ page }) => {
  await login(page, 'member@workclub.demo');
  await expect(page).toHaveURL(/\/dashboard$/);
  await openNavigation(page);
  await expect(page.getByRole('menuitem', { name: 'Clients' })).toHaveCount(0);
  await expect(page.getByRole('menuitem', { name: 'Invoices' })).toHaveCount(0);

  await page.getByRole('menuitem', { name: 'Projects' }).click();
  await expect(page.getByText('Atlas Digital Launch')).toBeVisible();
  await expect(page.getByText('Lumen Discovery')).toHaveCount(0);
});

test('Client is isolated inside the lightweight portal', async ({ page }) => {
  await login(page, 'client@workclub.demo');
  await expect(page).toHaveURL(/\/portal$/);
  await expect(page.getByRole('heading', { name: 'Atlas Digital Launch' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'NS-1001' })).toBeVisible();
  await expect(page.getByText('Internal tasks')).toHaveCount(0);
});
