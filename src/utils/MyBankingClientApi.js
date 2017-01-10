import middleware from './middleware/MyBankingClientMiddleware'

export default class MyBankingClientApi {

    static getStoredAuthData() {
        return new Promise(function (resolve, reject) {
            //grab auth-data from local store and return
            resolve(JSON.parse(localStorage.getItem('auth_data')));
        })
    }

    static setStoredAuthData(data) {
        return new Promise(function (resolve, reject) {
            //store auth-data to local store and return
            resolve(JSON.stringify(localStorage.setItem('auth_data', data)));
        })
    }

    static getApiAuthToken(api, code) {
        return new Promise(function (resolve, reject) {
            middleware.getApiAuthToken(api,code)
                .then(function (response) { resolve(response); })
                .catch(function (error) { reject(error); });
        })
    }

    static getProfile() {
        return new Promise(function (resolve, reject) {
            middleware.getProfile()
                .then(function(response){ resolve(response); })
                .catch(function(error){ reject(error); })
        })
    }

    static setProfile(profile) {
        return new Promise(function (resolve, reject) {
            middleware.setProfile(profile)
                .then(function(response){ resolve(response); })
                .catch(function(error){ reject(error); })
        })
    }

    static login() {
        return new Promise(function (resolve, reject) {
            middleware.login()
                .then(function(response) {
                    localStorage.setItem('auth_data', JSON.stringify(response));
                    resolve(response);
                })
        })
    }

    static logout() {
        return new Promise(function (resolve, reject) {
            middleware.logout()
                .then(function(response) {
                    localStorage.clear();
                    resolve(response);
                })
        })
    }

    static getAccounts() {
        return new Promise(function (resolve, reject) {
            middleware.getAccounts()
                .then(function(response){ resolve(response); })
                .catch(function(error){ reject(error); })
        })
    }

    static getAccountTransactions(detailLink) {
        return new Promise(function (resolve, reject) {
            middleware.getAccountTransactions(detailLink)
                .then(function(response){ resolve(response); })
                .catch(function(error){ reject(error); })
        })
    }

    static dialogHandler(openDialog) {
        return new Promise(function (resolve, reject) {
            localStorage.setItem('openDialog', JSON.stringify(openDialog));
            resolve(JSON.parse(localStorage.getItem('openDialog')));
        })
    }
}