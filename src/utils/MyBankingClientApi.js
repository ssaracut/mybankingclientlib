
export default class MyBankingClientApi {

    static getStoredStateData() {
        return JSON.parse(sessionStorage.getItem('state'));
    }

    static setStoredStateData(data) {
        sessionStorage.setItem('state', JSON.stringify(data));
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
            const url = `/api/auth/bank/${api}`;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'same-origin',
                body: `code=${code}`
            }
            fetch(url, options)
                .then(response =>
                    response.json().then(json => ({
                        status: response.status,
                        data: json
                    })))
                .then(function (response) {
                    console.log('Token Request succeeded with JSON response', response);
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        reject(response.data.result.info);
                    }
                })
                .catch(function (error) {
                    console.log('Token Request failed', error);
                    reject(error);
                });
        })
    }

    static getBankProfile(bank) {
        return new Promise(function (resolve, reject) {
            const url = `/api/profile/${bank}`;
            const options = {
                method: 'GET',
                credentials: 'same-origin'
            }
            fetch(url, options)
                .then(response =>
                    response.json().then(json => ({
                        status: response.status,
                        data: json
                    })))
                .then(function (response) {
                    console.log('Token Request succeeded with JSON response', response);
                    if (response.status === 200) {
                        resolve({ bank, profile: response.data });
                    } else {
                        reject(response.data.info);
                    }
                })
                .catch(function (error) {
                    console.log('Token Request failed', error);
                    reject(error);
                });
        })
    }

    // convert to remote call to middleware
    static getProfile() {
        return new Promise(function (resolve, reject) {
            const url = `/api/profile`;
            const options = {
                method: 'GET',
                credentials: 'same-origin'
            }
            fetch(url, options)
                .then(response =>
                    response.json().then(json => ({
                        status: response.status,
                        data: json
                    })))
                .then(function (response) {
                    console.log('Token Request succeeded with JSON response', response);
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        reject(response.data.result.info);
                    }
                })
                .catch(function (error) {
                    console.log('Token Request failed', error);
                    reject(error);
                });
        })
    }

    // convert to remote call to middleware
    static setProfile(profile) {
        return new Promise(function (resolve, reject) {
            middleware.setProfile(profile)
                .then(function (response) { resolve(response); })
                .catch(function (error) { reject(error); })
        })
    }

    // convert to remote call to middleware
    static login() {
        sessionStorage.setItem('state', JSON.stringify({}));
    }

    // convert to remote call to middleware
    static logout() {
        sessionStorage.clear();
    }

    // convert to remote call to middleware
    static getBankAccounts(bank) {
        return new Promise(function (resolve, reject) {
            const url = `/api/accounts/${bank}`;
            const options = {
                method: 'GET',
                credentials: 'same-origin'
            }
            fetch(url, options)
                .then(response =>
                    response.json().then(json => ({
                        status: response.status,
                        data: json
                    })))
                .then(function (response) {
                    console.log('Token Request succeeded with JSON response', response);
                    if (response.status === 200) {
                        resolve({ bank, accounts: response.data });
                    } else {
                        reject(response.data.result.info);
                    }
                })
                .catch(function (error) {
                    console.log('Token Request failed', error);
                    reject(error);
                });
        })
    }

    // convert to remote call to middleware
    static getAccountTransactions(detailLink) {
        return new Promise(function (resolve, reject) {
            middleware.getAccountTransactions(detailLink)
                .then(function (response) { resolve(response); })
                .catch(function (error) { reject(error); })
        })
    }

}