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

    //not sure why this is here? will probably move it out
    static dialogHandler(openDialog) {
        return new Promise(function (resolve, reject) {
            localStorage.setItem('openDialog', JSON.stringify(openDialog));
            resolve(JSON.parse(localStorage.getItem('openDialog')));
        })
    }

    // convert to remote call to middleware
    static getApiAuthToken(api, code, redirectUri) {
        return new Promise(function (resolve, reject) {
            middleware.getApiAuthToken(api,code, redirectUri)
                .then(function (response) { resolve(response); })
                .catch(function (error) { reject(error); });
        })
    }

    // convert to remote call to middleware
    static getProfile() {
        return new Promise(function (resolve, reject) {
            middleware.getProfile()
                .then(function(response){ resolve(response); })
                .catch(function(error){ reject(error); })
        })
    }

    // convert to remote call to middleware
    static setProfile(profile) {
        return new Promise(function (resolve, reject) {
            middleware.setProfile(profile)
                .then(function(response){ resolve(response); })
                .catch(function(error){ reject(error); })
        })
    }

    // convert to remote call to middleware
    static login() {
        return new Promise(function (resolve, reject) {
            middleware.login()
                .then(function(response) {
                    localStorage.setItem('auth_data', JSON.stringify(response));
                    resolve(response);
                })
        })
    }

    // convert to remote call to middleware
    static logout() {
        return new Promise(function (resolve, reject) {
            middleware.logout()
                .then(function(response) {
                    localStorage.clear();
                    resolve(response);
                })
        })
    }
    
    // convert to remote call to middleware
    static getAccounts() {
        return new Promise(function (resolve, reject) {
            middleware.getAccounts()
                .then(function(response){ resolve(response); })
                .catch(function(error){ reject(error); })
        })
    }

    // convert to remote call to middleware
    static getAccountTransactions(detailLink) {
        return new Promise(function (resolve, reject) {
            middleware.getAccountTransactions(detailLink)
                .then(function(response){ resolve(response); })
                .catch(function(error){ reject(error); })
        })
    }

}