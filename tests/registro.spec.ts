import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import TestData from '../data/testData.json';

let registerPage:  RegisterPage;

test.beforeEach(async ({ page }) => {
  registerPage = new RegisterPage(page);
  await registerPage.navigateToRegisterPage();
});

test('TC-1 Verify visual elements on sign up page', async ({ page }) => {
  await expect(registerPage.firstNameInput).toBeVisible();
  await expect(registerPage.lastNameInput).toBeVisible();
  await expect(registerPage.emailInput).toBeVisible();
  await expect(registerPage.passwordInput).toBeVisible();
  await expect(registerPage.registerButton).toBeVisible();
  await expect(registerPage.loginButton).toBeVisible();
  await expect(registerPage.registerButton).toHaveText('Registrarse');
 
});

test('TC-2 Verificar Boton de registro esta inhabilitado por defecto', async ({ page }) => {
  await expect(registerPage.registerButton).toBeDisabled();
});

test('TC-3 Verificar que el botón de registro se habilita al completar los campos obligatorios', async ({ page }) => {

  await expect(registerPage.registerButton).toBeDisabled();
  await registerPage.fillRegistrationForm(TestData.validUser.firstName, TestData.validUser.lastName,'alexisalvarez' + Date.now().toString() + '@email.com', TestData.validUser.password);

  await expect(registerPage.registerButton).toBeEnabled();
});

test('TC-4 Verificar redireccionamiento a página de inicio de sesión al hacer clic en el botón de registro', async ({ page }) => {
  await expect(registerPage.loginButton).toBeVisible();
  await expect(registerPage.loginButton).toHaveText('Iniciar sesión');
});

test('TC-5 Verificar Registro exitoso con datos válidos', async ({ page }) => {
  await expect(registerPage.registerButton).toBeDisabled();
  await registerPage.completeAndSubmitForm('Alexis', 'Alvarez', 'alexisalvarez' + Date.now().toString() + '@email.com', '123456'); 
  await expect(page.getByText('Registro exitoso')).toBeVisible();
});

test('TC-6 Verificar que un usuario no pueda registrarse con un correo electrónico ya existente', async ({ page }) => {
  const email = 'alexisalvarez' + Date.now().toString() + '@email.com';

  await registerPage.navigateToRegisterPage();
  await registerPage.completeAndSubmitForm('Alexis', 'Alvarez', 'alexisalvarez' + email, '123456'); 
  await expect(page.getByText('Registro exitoso')).toBeVisible();
  await registerPage.navigateToRegisterPage();
  await registerPage.completeAndSubmitForm('Alexis', 'Alvarez', 'alexisalvarez' + email, '123456'); 
  await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});

