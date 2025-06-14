import {Page,Locator} from '@playwright/test';

export class RegisterPage{

    readonly page:Page;
    readonly firstNameInput:Locator;
    readonly lastNameInput:Locator;
    readonly emailInput:Locator;
    readonly passwordInput:Locator;
    readonly registerButton:Locator;
    readonly loginButton:Locator;
    readonly successMessage:Locator;
    readonly errorMessage:Locator;

    constructor(page:Page){
        this.page = page;
        this.firstNameInput = page.locator('input[name="firstName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.registerButton = page.getByTestId('boton-registrarse');
        this.loginButton = page.getByTestId('boton-login-header-signup');
        this.successMessage = page.getByText('Registro exitoso');
        this.errorMessage = page.getByText('Email already in use');
    }

    async navigateToRegisterPage() {
        await this.page.goto('http://localhost:3000/');
    }

    async fillRegistrationForm(firstName: string, lastName: string, email: string, password: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async isRegisterButtonEnabled(): Promise<boolean> {
        return await this.registerButton.isEnabled();
    }

    async isRegisterButtonDisabled(): Promise<boolean> {
        return await this.registerButton.isDisabled();
    }

    async isSuccessMessageVisible(): Promise<boolean> {
        return await this.successMessage.isVisible();
    }

    async isErrorMessageVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }  
    
    async completeAndSubmitForm(firstName: string, lastName: string, email: string, password: string) { 
        await this.fillRegistrationForm(firstName, lastName, email, password);
        await this.clickRegisterButton();
    }
}
