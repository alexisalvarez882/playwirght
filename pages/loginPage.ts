import {Page,Locator} from '@playwright/test';

export class LoginPage{

    readonly page:Page;

    readonly emailInput:Locator;
    readonly passwordInput:Locator;
    readonly loginButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.emailInput = page.locator('input[type="email"]');
        this.passwordInput = page.locator('input[type="password"]');
        this.loginButton = page.getByTestId('boton-login');
    }

    async navigateToLogin() {
        await this.page.goto('http://localhost:3000/login');
    }
    async fillLoginForm(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }
   
    async login(email: string, password: string) {
        await this.fillLoginForm(email, password);
        await this.clickLoginButton();
    }

}
