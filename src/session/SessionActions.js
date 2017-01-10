import { createAction } from 'redux-actions';
import MyBankingClientApi from '../utils/MyBankingClientApi';

export default {
    login: createAction('LOGIN', () => { return MyBankingClientApi.login() }),
    logout: createAction('LOGOUT', () => { return MyBankingClientApi.logout() }),
    getApiAuthToken: createAction('GET_API_AUTH_TOKEN', (api, code) => { return MyBankingClientApi.getApiAuthToken(api, code) }),
    getStoredAuthData: createAction('GET_STORED_AUTH_DATA', () => { return MyBankingClientApi.getStoredAuthData() }),
    setStoredAuthData: createAction('SET_STORED_AUTH_DATA', (data) => { return MyBankingClientApi.setStoredAuthData(data) }),
    getProfile: createAction('GET_PROFILE', () => { return MyBankingClientApi.getProfile() })
} 