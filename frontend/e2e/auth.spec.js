import { test, expect } from '@playwright/test';

test.describe('Authentication & Security', () => {

  test('unauthenticated users are redirected to login', async ({ page }) => {
    // Visit student dashboard (public library now)
    await page.goto('/dashboard');
    // It should load successfully, no redirect
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Clicking "Login to Access" button should redirect
    await page.click('button:has-text("Login to Access")');
    await expect(page).toHaveURL(/.*\/login\?redirect=\/dashboard/);

    // Attempt to visit admin dashboard
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/.*\/admin\/login/);
  });

  test('admin can login with correct credentials', async ({ page }) => {
    const adminUser = process.env.VITE_TEST_ADMIN_USER;
    const adminPass = process.env.VITE_TEST_ADMIN_PASSWORD;
    
    if (!adminUser || !adminPass) {
      throw new Error("Missing VITE_TEST_ADMIN_USER or VITE_TEST_ADMIN_PASSWORD in environment variables");
    }

    await page.goto('/admin/login');
    await page.fill('input[placeholder="Enter admin username"]', adminUser);
    await page.fill('input[type="password"]', adminPass);
    await page.click('button[type="submit"]');

    // Should redirect to admin dashboard
    await expect(page).toHaveURL('/admin/dashboard');
    await expect(page.locator('h2').first()).toContainText('Hoot Admin');
  });



});
