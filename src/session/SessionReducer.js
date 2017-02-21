const _initialState = {
    session: {
        loggedIn: false,
        state: undefined,
        profile: undefined,
        nav: {
            items: [
                { page: "", icon: "home", label: "Home" }
            ]
        },
        options: [{ page: "login", icon: "done", label: "Login" }]
    }
}
const loggedInNav = {
    items: [
        { page: "", icon: "home", label: "Home" },
        { page: "accounts", icon: "account_balance_wallet", label: "Accounts" },
        { page: "profiles", icon: "account_balance_wallet", label: "Profiles" }
    ]
}
const logoutOption = { page: "logout", icon: "done", label: "Logout" };

export default function (state = _initialState, action) {
    switch (action.type) {
        case 'GET_API_AUTH_TOKEN':
            if (action.payload) {
                return { ...state, session: { ...state.session, auth_data: action.payload } };
            } else {
                return state;
            }
        case 'GET_STORED_STATE_DATA':
            if (action.payload) {
                return { ...state, session: { ...state.session, loggedIn: true, nav: loggedInNav, options: [logoutOption], state: action.payload } };
            } else {
                return state;
            }
        case 'GET_PROFILE':
            return { ...state, session: { ...state.session, profile: action.payload } };
        case 'GET_BANK_PROFILE':
            if (!action.error) {
                const bank = action.payload.bank;
                const bankProfile = action.payload.profile;
                return { ...state, session: { ...state.session, profile: { ...state.session.profile, banks: { ...state.session.profile.banks, [bank]: bankProfile } } } };
            } else {
                return state;
            }
        case 'LOGIN':
            if (!action.error && action.payload) {
                return { ...state, session: { ...state.session, loggedIn: true, nav: loggedInNav, options: [logoutOption] } }
            } else {
                return state;
            }
        case 'LOGOUT':
            return { ..._initialState }
        default:
            return state;
    }
}
