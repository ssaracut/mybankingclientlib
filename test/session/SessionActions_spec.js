import { List, Map, fromJS } from 'immutable'
import { expect } from 'chai'
import sinon from 'sinon'

import MyBankingClientApi from '../../src/utils/MyBankingClientApi';
import SessionActions from '../../src/session/SessionActions'

describe('SessionActions.login()', () => {

  it('it should have the Action Type of LOGIN and handle successful execution.', () => {
    const response = { result: '22' };
    let promiseHelper;
    const promise = new Promise((resolve, reject) => {
      promiseHelper = { resolve, reject };
    });
    const login = sinon.stub(MyBankingClientApi, 'login').returns(promise);
    const action = SessionActions.login();

    login.restore();
    sinon.assert.calledOnce(login);
    expect(action.type).to.eql('LOGIN');
    action.payload.then(payload => {
      expect(payload).to.eql(response);
    });
    promiseHelper.resolve(response);
  })

  it('it should have the Action Type of LOGIN and handle failure execution.', () => {
    const response = { result: '22' };
    let promiseHelper;
    const promise = new Promise((resolve, reject) => {
      promiseHelper = { resolve, reject };
    });
    const login = sinon.stub(MyBankingClientApi, 'login').returns(promise);
    const action = SessionActions.login();

    login.restore();
    sinon.assert.calledOnce(login);
    expect(action.type).to.eql('LOGIN');
    action.payload.catch(payload => {
      expect(payload).to.eql(response);
    });
    promiseHelper.reject(response);
  })  

})