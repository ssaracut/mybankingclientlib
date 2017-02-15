
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
        return new Promise(function (resolve, reject) {
            middleware.login()
                .then(function (response) {
                    localStorage.setItem('auth_data', JSON.stringify(response));
                    resolve(response);
                })
        })
    }

    // convert to remote call to middleware
    static logout() {
        return new Promise(function (resolve, reject) {
            middleware.logout()
                .then(function (response) {
                    localStorage.clear();
                    resolve(response);
                })
        })
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