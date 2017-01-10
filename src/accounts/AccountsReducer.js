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
            if (!action.error && action.payload) {
                return { ...state, accountState: { ...state.accountState, accountTransactions: parseAccountTransactions(action.payload.data.accountTransactions) } }
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

function parseAccounts(accountsRaw) {
    let accounts = [];

    accountsRaw.forEach(function (a) {
        let account = {
            accountKey: a.id,
            description: a.description,
            name: a.description,
            number: a.number,
            classification: a.type,
            balance: a.balance,
            currency: a.currency,
            detailLink: a.links.detail.href
        };

        accounts.push(account);
    });

    return accounts;
}

function parseAccountTransactions(accountTransactions) {
    let transactions = [];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    accountTransactions.forEach(function (a) {
        var date = new Date(a.operationDate);

        let transaction = {
            id: a.id,
            amount: a.amount.toFixed(2),
            category: a.category,
            currency: a.currency,
            description: a.description,
            date: days[date.getDay()].substring(0, 3) + ', ' + months[date.getMonth()].substring(0, 3) + ' ' + date.getDate() + ', ' + date.getFullYear(),
            expense: ((a.amount < 0) ? true : false),
        };

        transactions.push(transaction);
    });

    return transactions;
}
