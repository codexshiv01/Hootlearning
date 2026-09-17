import { test, expect } from '@playwright/test';

test.describe('Student Flow', () => {

  test('student can see created category in sidebar', async ({ page }) => {
    await page.goto('/login');
    const studentUser = process.env.VITE_TEST_STUDENT_USER;
    const studentPass = process.env.VITE_TEST_STUDENT_PASSWORD;
    
    if (!studentUser || !studentPass) {
      throw new Error("Missing VITE_TEST_STUDENT_USER or VITE_TEST_STUDENT_PASSWORD in environment variables");
    }

    // Login with the user created in admin flow
    await page.fill('input[type="email"]', studentUser);
    await page.fill('input[type="password"]', studentPass);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
    
    // Wait for data to load
    await expect(page.locator('.sidebar')).toBeVisible();
    
    // Monthly Letters is a default seeded category
    const sidebarCategory = page.locator('.sidebar-item', { hasText: 'Monthly Letters' }).first();
    await expect(sidebarCategory).toBeVisible();
  });

});
