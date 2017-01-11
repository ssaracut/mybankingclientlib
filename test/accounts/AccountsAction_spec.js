import { List, Map, fromJS } from 'immutable'
import { expect } from 'chai'
import sinon from 'sinon'

import MyBankingClientApi from '../../src/utils/MyBankingClientApi';
import AccountsActions from '../../src/accounts/AccountsActions'

describe('AccountsActions.getAccounts', () => {

  it('it should have the Action Type of GET_ACCOUNTS and successfuly execute.', () => {
    const response = { result: '22' };
    let promiseHelper;
    const promise = new Promise((resolve, reject) => {
      promiseHelper = { resolve, reject };
    });
    const getAccounts = sinon.stub(MyBankingClientApi, 'getAccounts').returns(promise);
    const action = AccountsActions.getAccounts();

    getAccounts.restore();
    sinon.assert.calledOnce(getAccounts);
    expect(action.type).to.eql('GET_ACCOUNTS');
    action.payload.then(payload => {
      expect(payload).to.eql(response);
    });
    promiseHelper.resolve(response);
  })

})

describe('AccountsActions.getAccountTransactions', () => {

  it('it should have the Action Type of GET_ACCOUNT_TRANSACTIONS and successfuly execute.', () => {
    const response = { result: '33' };
    let promiseHelper;
    const promise = new Promise((resolve, reject) => {
      promiseHelper = { resolve, reject };
    });
    const getAccountTransactions = sinon.stub(MyBankingClientApi, 'getAccountTransactions').returns(promise);
    const action = AccountsActions.getAccountTransactions('test');

    getAccountTransactions.restore();
    sinon.assert.calledOnce(getAccountTransactions);
    expect(action.type).to.eql('GET_ACCOUNT_TRANSACTIONS');
    action.payload.then(payload => {
      expect(payload).to.eql(response);
    })
    promiseHelper.resolve(response);
  })

})