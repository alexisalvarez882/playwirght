import { test, expect } from '@playwright/test';
import TestData from '../data/testData.json';
import { LoginPage } from '../pages/loginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
});

test('TC-1 Verify visual elements on sign up page', async ({ page }) => {
  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.loginButton).toHaveText('Iniciar sesión');
});

test('TC-2 Verify login with valid credentials', async ({ page }) => {
  await loginPage.login(TestData.validUser.email, TestData.validUser.password);
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

test('TC-3 Verify login with invalid credentials', async ({ page }) => {
  await loginPage.login(TestData.invalidUser.email, TestData.invalidUser.password);
  await expect(page).toHaveURL('http://localhost:3000/login');
});