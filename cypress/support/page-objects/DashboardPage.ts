import PageObjectClass from '../utils/PageObjectClass';
import SideMenu from "../components/SideMenu";

class DashboardPage extends PageObjectClass {

    private sideMenu = new SideMenu();

    exist() {
        this.sideMenu.exist();
    }

    openSignUpFormPage() {
        this.sideMenu.openSignUpFormPage();
    }

    openSignInFormPage() {
        this.sideMenu.openSignInFormPage();
    }

    openProfilePage() {
        this.sideMenu.openProfilePage();
    }

    openStatisticPage(){
        this.sideMenu.openStatisticPage();
    }
}

export default DashboardPage;
