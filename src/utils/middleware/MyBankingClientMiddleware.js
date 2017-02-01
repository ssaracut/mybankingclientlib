/*
 This is just faking out a middleware that doesnt exist yet
*/
import BbvaApi from './BbvaApi'
import CitiApi from './CitiApi'

const ApiAdapters = {
    bbva: BbvaApi,
    citi: CitiApi
}

export default class MyBankingClientMiddleware {

    static getApiAuthToken(bank, key, redirectUri) {
        return new Promise(function (resolve, reject) {
            const profile = JSON.parse(localStorage.getItem('profile'));
            ApiAdapters[bank].getAuthToken(key, redirectUri)
                .then(function (data) {
                    profile.banks[bank] = { auth_data: data };
                    localStorage.setItem('profile', JSON.stringify(profile));
                    resolve(data);
                })
                .catch(function (error) { reject(error); });
        })
    }

    static getProfile() {
        return new Promise(function (resolve, reject) {
            //get profile from datastore
            let profile = JSON.parse(localStorage.getItem('profile'));

            //if datastore is empty load it with a fake profile
            if (!profile) {
                profile = { banks: {} };
                localStorage.setItem('profile', JSON.stringify(profile));
            }

            //grab basic profile info from each registered bank
            const apiCalls = [];
            for (let bank in profile.banks) {
                apiCalls.push(ApiAdapters[bank].getBasicUserInfo())
            }

            Promise.all(apiCalls)
                .then(function (values) {
                    const banks = Object.keys(profile.banks);
                    for (let bank = 0; bank < banks.length; bank++) {
                        profile.banks[banks[bank]].firstname = values[bank].firstName;
                        profile.banks[banks[bank]].lastname = values[bank].lastName;
                    }
                    resolve(profile);
                })
                .catch(function (error) {
                    reject(error)
                });
        })
    }

    static setProfile(profile) {
        //fake a call to the api by storing in localstorage
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    static login() {
        return new Promise(function (resolve, reject) {
            const auth_data = {};
            resolve(auth_data);
        })
    }

    static logout() {
        return new Promise(function (resolve, reject) {
            resolve({});
        })
    }

    static getAccounts() {
        // return new Promise(function (resolve, reject) {
        //     //get profile from datastore
        //     let profile = JSON.parse(localStorage.getItem('profile'));
        //     let accounts = [];

        //     //grab accounts info from each registered bank
        //     const apiCalls = [];
        //     for (let bank in profile.banks) {
        //         apiCalls.push(ApiAdapters[bank].getAccounts())
        //     }

        //     Promise.all(apiCalls)
        //         .then(function (values) {
        //             resolve(accounts);
        //         })
        //         .catch(function (error) {
        //             reject(error)
        //         });
        // })

        return BbvaApi.getAccounts();
    }

    static getAccountTransactions(detailLink) {
        return BbvaApi.getAccountTransactions(detailLink);
    }
}