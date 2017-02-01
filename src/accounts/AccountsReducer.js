const _initialState = {
    accountState: {
        accounts: undefined,
        accountTransactions: undefined,
        openDialog: false
    }
}
export default function (state = _initialState, action) {
    switch (action.type) {
        case 'GET_ACCOUNTS':
            if (!action.error && action.payload) {
                return { ...state, accountState: { ...state.accountState, accounts: action.payload } };
            } else {
                return state;
            }
        case 'GET_ACCOUNT_TRANSACTIONS':
            if (!action.error) {
                //eventually update this to attach to an account
                return { ...state, accountState: { ...state.accountState, accountTransactions: action.payload } }
            } else {
                return state;
            }
        case 'GET_DIALOG_HANDLER':
            if (!action.error) {
                return { ...state, accountState: { ...state.accountState, openDialog: action.payload } }
            } else {
                return state;
            }
        case 'LOGOUT':
            return { ..._initialState };
        default:
            return state;
    }
}
