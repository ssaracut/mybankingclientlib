import { createAction } from 'redux-actions';
import MyBankingClientApi from '../utils/MyBankingClientApi';

export default {
    login: createAction('LOGIN', (username, password) => { return MyBankingClientApi.login(username, password) }),
    logout: createAction('LOGOUT', () => { return MyBankingClientApi.logout() }),
    getApiAuthToken: createAction('GET_API_AUTH_TOKEN', (api, code, redirectUri) => { return MyBankingClientApi.getApiAuthToken(api, code, redirectUri) }),
    getStoredStateData: createAction('GET_STORED_STATE_DATA', () => { return MyBankingClientApi.getStoredStateData() }),
    setStoredStateData: createAction('SET_STORED_STATE_DATA', (data) => { return MyBankingClientApi.setStoredStateData(data) }),
    getProfile: createAction('GET_PROFILE', () => { return MyBankingClientApi.getProfile() }),
    getBankProfile: createAction('GET_BANK_PROFILE', (bank) => { return MyBankingClientApi.getBankProfile(bank) })
} 