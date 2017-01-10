import { createAction } from 'redux-actions';
import MyBankingClientApi from '../utils/MyBankingClientApi';

export default {
    getAccounts: createAction('GET_ACCOUNTS', () => { return MyBankingClientApi.getAccounts() }),
    getAccountTransactions: createAction('GET_ACCOUNT_TRANSACTIONS', (detailLink) => { return MyBankingClientApi.getAccountTransactions(detailLink) }),
    getDialogHandler: createAction('GET_DIALOG_HANDLER', (openDialog) => { return MyBankingClientApi.dialogHandler(openDialog) })
}