import sites from '../../fixtures/sites.json'
abstract class Constants {
    static readonly API_URL_LOGIN_ADMIN: string =
        sites['bases']['baseAPI'] + 'users/auth/login';
    static readonly API_URL_USERS_LIST: string =
        sites['bases']['baseAPI'] + 'users/users';
}
export default Constants;
