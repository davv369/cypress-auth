import Constants from '../utils/Constants'
export const CHECKMATE_ACCESS_TOKEN = 'checkmate-access-token';

const setStorage = (key: string, value: any) =>
    localStorage.setItem(key, JSON.stringify(value));

const getStorage = (key: string) => JSON.parse(localStorage.getItem(key) ?? '');

export const login = (email: string, password: string) => {
    cy.log('API login');
    cy.request({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        url: Constants.API_URL_LOGIN_ADMIN,
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(({ body }) => {
        setStorage(CHECKMATE_ACCESS_TOKEN, body.accessToken);
        console.log(body)
    });
};

export const getUsersList = () => {
    cy.log('Get Users lists');
    return cy.request({
        method: 'GET',
        url: Constants.API_URL_USERS_LIST,
        headers: {
            Authorization: `Bearer ${getStorage(CHECKMATE_ACCESS_TOKEN)}`
        }
    })
};

export const getUsersListByUsername = (username: string) => {
    cy.log('Get Users lists');
    return cy.request({
        method: 'GET',
        url: `${Constants.API_URL_USERS_LIST}?username=${username}`,
        headers: {
            Authorization: `Bearer ${getStorage(CHECKMATE_ACCESS_TOKEN)}`
        }
    })
};


export const patchUser = (userId: string) => {
    cy.log('Get Users lists');
    return cy.request({
        method: 'PATCH',
        url: `${Constants.API_URL_USERS_LIST}/${userId}`,
        headers: {
            Authorization: `Bearer ${getStorage(CHECKMATE_ACCESS_TOKEN)}`
        },
        body: {
            input: {
                emailVerified: true
            }
        }
    });
};


