import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Admin Flow', () => {
  // We log in before each test
  test.beforeEach(async ({ page }) => {
    // Use environment variables for credentials to avoid hardcoding in git
    const adminUser = process.env.VITE_TEST_ADMIN_USER;
    const adminPass = process.env.VITE_TEST_ADMIN_PASSWORD;
    
    if (!adminUser || !adminPass) {
      throw new Error("Missing VITE_TEST_ADMIN_USER or VITE_TEST_ADMIN_PASSWORD in environment variables");
    }
    
    await page.goto('/admin/login');
    await page.fill('input[placeholder="Enter admin username"]', adminUser);
    await page.fill('input[type="password"]', adminPass);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/admin/dashboard');
  });

  test('admin can create a new category', async ({ page }) => {
    await page.click('button:has-text("Manage Folders")');
    
    // Fill category form
    await page.fill('input[placeholder="New Category Name..."]', 'E2E Science');
    await page.check('input[type="checkbox"]');
    await page.click('button:has-text("Add Category")');

    // Wait for the new category to appear in the categories table
    await expect(page.getByText('E2E Science').first()).toBeVisible();
  });

  test('admin can create a new student user', async ({ page }) => {
    await page.click('button:has-text("Manage Users")');
    
    await page.fill('input[placeholder="student@school.com"]', 'e2e_student@hoot.com');
    await page.fill('input[placeholder="Secure Password"]', 'e2e_pass');
    await page.selectOption('select', { label: '1 Month' });
    await page.click('button:has-text("Grant Access")');

    // Wait for the user to appear in the table
    await expect(page.getByText('e2e_student@hoot.com')).toBeVisible();
  });
});
