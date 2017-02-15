import { createAction } from 'redux-actions';
import MyBankingClientApi from '../utils/MyBankingClientApi';

export default {
    getBankAccounts: createAction('GET_BANK_ACCOUNTS', (bank) => { return MyBankingClientApi.getBankAccounts(bank) }),
    getAccountTransactions: createAction('GET_ACCOUNT_TRANSACTIONS', (detailLink) => { return MyBankingClientApi.getAccountTransactions(detailLink) }),
    getDialogHandler: createAction('GET_DIALOG_HANDLER', (openDialog) => { return MyBankingClientApi.dialogHandler(openDialog) })
}