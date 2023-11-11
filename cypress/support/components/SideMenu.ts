import ComponentObjectClass from '../utils/ComponentObjectClass';

export enum ESideMenuSelectors {
    PROFILE = 'ProfileButton',
    STATISTIC = 'StatisticButton',
    SIGN_IN = 'SignInButton',
    SIGN_UP = 'SignUpButton',
    NEW_GAME = 'NewGameButton',
}

class SideMenu extends ComponentObjectClass {

    componentName = 'SideMenu';
    timeoutOptions = { timeout: 100000 };

    exist() {
        this.shouldAllBeVisible(
            [ ESideMenuSelectors.SIGN_UP, ESideMenuSelectors.NEW_GAME], this.timeoutOptions );
    }

    openSignUpFormPage() {
        this.getElement(ESideMenuSelectors.SIGN_UP).click();
    }

    openSignInFormPage() {
        cy.contains('Log in').click()
        this.getElement(ESideMenuSelectors.SIGN_IN).click();
    }

    openProfilePage() {
        this.getElement(ESideMenuSelectors.PROFILE).click();
    }

    openStatisticPage(){
        this.getElement(ESideMenuSelectors.STATISTIC).click();
    }

}

export default SideMenu;
