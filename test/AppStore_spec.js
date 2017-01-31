import { expect } from 'chai'

import AppStore from '../src/AppStore'

describe('AppStore', () => {

  it('it should have the expected Reducers', () => {

    const expectedState = {
      SessionReducer:
      {
        session:
        {
          loggedIn: false,
          auth_data: undefined,
          profile: undefined,
          nav: {
            items: [
              { page: "", icon: "home", label: "Home" }
            ]
          },
          options: [{ page: "login", icon: "done", label: "Login" }]
        }
      },
      AccountsReducer:
      {
        accountState:
        {
          accounts: undefined,
          accountTransactions: undefined,
          openDialog: false
        }
      }
    };

    const newState = AppStore.getState();

    expect(newState).to.eql(expectedState);
    expect(newState).to.not.equal(expectedState);

  })

})