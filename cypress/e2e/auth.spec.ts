import DashboardPage from "../support/page-objects/DashboardPage";
import SignUpFormPage from "../support/page-objects/SignUpFormPage";
import { faker } from '@faker-js/faker'
import SignInFormPage from "../support/page-objects/SignInFormPage";
import * as adminAPI from "../support/API/admin";

describe('Auth functionalities ', () => {

    const dashboardPage = new DashboardPage();
    const signUpFormPage = new SignUpFormPage();
    const signInFormPage = new SignInFormPage();

    beforeEach(() => {
        cy.fixture('users.json').then((users) => {
            const {email, password} = users.adminUser;
            adminAPI.login(email, password);
            cy.visit('/');
            dashboardPage.exist();
        });
    });

    it('Try to register without data', () => {
        dashboardPage.openSignUpFormPage();
        signUpFormPage.exist();
        signUpFormPage.confirmFormsData();
        signUpFormPage.assertBlankDataErrorMessages();
    });

    it('Try to register with invalid data, existing email', () => {
        dashboardPage.openSignUpFormPage();
        signUpFormPage.exist();
        cy.fixture('users.json').then((users) => {
            const emailExisting = users.adminUser.email
            const usernameExisting = users.adminUser.username
            const usernameLength5 = faker.datatype.string(5)
            const usernameLength33 = faker.datatype.string(33)
            const usernameValid = faker.datatype.string(6)
            const emailInvalid = faker.datatype.string()
            const passwordInvalid = faker.animal.dog()
            const passwordTooShort = faker.datatype.string(4)
            const emailValid = faker.internet.email(undefined, undefined, 'example.com');
            const passwordValid = faker.internet.password(10, false, /\W/, 'Ps1@');
            signUpFormPage.fillFormAndSubmit(usernameLength5, emailValid, passwordInvalid);
            signUpFormPage.assertUsernameTooShort();
            signUpFormPage.assertTooWeekPassword();
            signUpFormPage.fillFormAndSubmit(usernameLength33, emailValid, passwordTooShort)
            signUpFormPage.assertUsernameTooLong();
            signUpFormPage.assertTooShortPassword()
            signUpFormPage.fillFormAndSubmit(usernameValid, emailExisting, passwordValid)
            signUpFormPage.assertEmailTaken();
            signUpFormPage.fillFormAndSubmit(usernameValid, emailInvalid, passwordValid)
            signUpFormPage.assertEmailInvalid();
            signUpFormPage.fillFormAndSubmit(usernameExisting, emailValid, passwordValid)
            signUpFormPage.assertUsernameTaken();
        });
    });

    it('SignUp with valid credentials, confirm account and login', () => {
        dashboardPage.openSignUpFormPage();
        signUpFormPage.exist();
        const username = faker.internet.userName()
        const email = faker.internet.email(undefined, undefined, 'example.com');
        const password = faker.internet.password(10, false, /\W/, 'Ps1@');
        signUpFormPage.fillFormAndSubmit(username, email, password);
        signUpFormPage.assertAccountCreationMessage();
        adminAPI.getUsersListByUsername(username).then(({ body }) => {
            if(username == body.items[0].username) {
                const userId = body.items[0]._id
                adminAPI.patchUser(userId)
            }
            else {
                cy.log('User not found')
            }
        });
        cy.visit('/');
        dashboardPage.exist();
        dashboardPage.openSignInFormPage();
        signInFormPage.exist();
        signInFormPage.fillFormAndSubmit(email, password);
        signInFormPage.assertLogin(username);
    });

    it('Try to login without data', () => {
        dashboardPage.openSignInFormPage();
        signInFormPage.exist();
        signInFormPage.confirmFormsData();
        signInFormPage.assertBlankDataErrorMessages();
    })

    it('Try to login with invalid data', () => {
        const emailInvalidForm = faker.datatype.string(3)
        const email = faker.internet.email(undefined, undefined, 'example.com');
        const passwordInvalid = faker.datatype.string()
        dashboardPage.openSignInFormPage();
        signInFormPage.exist();
        signInFormPage.fillFormAndSubmit(emailInvalidForm, passwordInvalid)
        signInFormPage.assertEmailInvalid();
        signInFormPage.fillFormAndSubmit(email, passwordInvalid)
        signInFormPage.assertCredentialsInvalid();
    })

});
