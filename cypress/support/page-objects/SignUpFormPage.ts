import PageObjectClass from '../utils/PageObjectClass';
import {getTranslation} from "../commands";


export enum ESignUpFormSelector {
    USERNAME = 'UsernameInput',
    EMAIL = 'EmailInput',
    PASSWORD = 'PasswordInput',
    SUBMIT = 'SubmitButton',
    LOGIN = 'LogInLink'
}

class SignUpFormPage extends PageObjectClass {

    pageName = 'SignUpFormPage'
    timeoutOptions = { timeout: 100000 };

    exist() {
        this.shouldAllBeVisible([
            ESignUpFormSelector.EMAIL,
            ESignUpFormSelector.PASSWORD,
            ESignUpFormSelector.SUBMIT,
        ],this.timeoutOptions);
    }

    confirmFormsData() {
        this.getElement(ESignUpFormSelector.SUBMIT).click();
    }

    fillFormAndSubmit(username: string, email: string, password: string) {
        this.getElement(ESignUpFormSelector.USERNAME).click().clear().type(username);
        this.getElement(ESignUpFormSelector.EMAIL).click().clear().type(email);
        this.getElement(ESignUpFormSelector.PASSWORD).click().clear().type(password);
        this.confirmFormsData()
    }

    assertBlankDataErrorMessages() {
        this.assertErrorMessageVisibility(ESignUpFormSelector.USERNAME, 'username_too_short.en')
        this.assertErrorMessageVisibility(ESignUpFormSelector.EMAIL, `email_error.en`)
        this.assertErrorMessageVisibility(ESignUpFormSelector.PASSWORD, 'password_too_short.en')
    }

    assertUsernameTooShort() {
        this.assertErrorMessageVisibility(ESignUpFormSelector.USERNAME, 'username_too_short.en')
    }

    assertUsernameTooLong() {
        this.assertErrorMessageVisibility(ESignUpFormSelector.USERNAME, "username_too_long.en")
    }

    assertUsernameTaken() {
        this.assertErrorMessageVisibility(ESignUpFormSelector.USERNAME, "username_taken.en")
    }

    assertTooShortPassword() {
        this.assertErrorMessageVisibility(ESignUpFormSelector.PASSWORD, "password_too_short.en")
    }

    assertTooWeekPassword() {
        this.assertErrorMessageVisibility(ESignUpFormSelector.PASSWORD, "password_too_weak.en")
    }

    assertEmailTaken() {
        this.assertErrorMessageVisibility(ESignUpFormSelector.EMAIL, 'email_taken.en')
    }

    assertEmailInvalid() {
        this.assertErrorMessageVisibility(ESignUpFormSelector.EMAIL, 'email_invalid.en')
    }

    assertAccountCreationMessage() {
        this.checkVisibility(getTranslation('account_created_verify_your_email.en'))
    }

}

export default SignUpFormPage;
