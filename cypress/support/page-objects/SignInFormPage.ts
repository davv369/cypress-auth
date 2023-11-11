import PageObjectClass from '../utils/PageObjectClass';
import {getTranslation} from "../commands";

export enum ESignInFormSelector {
    EMAIL = 'EmailInput',
    PASSWORD = 'PasswordInput',
    LOGIN = 'SubmitButton',
    SIGNUP = 'SignUpLink',
}

class SignInFormPage extends PageObjectClass {

    pageName = 'SignInFormPage'
    timeoutOptions = { timeout: 100000 };


    exist() {
        this.shouldAllBeVisible([
            ESignInFormSelector.EMAIL,
            ESignInFormSelector.PASSWORD,
            ESignInFormSelector.SIGNUP,
            ESignInFormSelector.LOGIN
        ],this.timeoutOptions)
    }

    confirmFormsData() {
        this.getElement(ESignInFormSelector.LOGIN).click();
    }

    fillFormAndSubmit(email: string, password: string) {
        this.getElement(ESignInFormSelector.EMAIL).click().clear().type(email);
        this.getElement(ESignInFormSelector.PASSWORD).click().clear().type(password);
        this.confirmFormsData()
    }

    assertBlankDataErrorMessages() {
        this.assertErrorMessageVisibility(ESignInFormSelector.EMAIL, 'email_error.en')
        this.assertErrorMessageVisibility(ESignInFormSelector.PASSWORD, 'password_error.en')
    }

    assertEmailInvalid() {
        this.assertErrorMessageVisibility(ESignInFormSelector.EMAIL, 'email_invalid_loginPage.en')
    }

    assertCredentialsInvalid() {
        this.checkVisibility(getTranslation("incorrect_credentials.en"))
    }

    assertLogin(username: string) {
        this.checkVisibility(username)
    }

}

export default SignInFormPage;
