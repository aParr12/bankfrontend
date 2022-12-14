import {createContext, useCallback, useState} from 'react';
import {Toast} from './components/Toast';
import {SERVER_PATH} from './index';

const INITIAL_STATE = {
    currentUserId: undefined,
    currentUser: undefined,
    userSubmissions: [],
    toastMessage: undefined,
};

const ACTION_ENUM = {
    'add_user': 0,
    'sign_in': 1,
    'add_user_account': 2,
    'withdraw_from_account': 3,
    'deposit_to_account': 4,
    'log_user_submission': 5,
    'display_toast': 6,
    'get_user': 7,
    'sign_out': 8,
};

function useAsyncReducer(reducer, initState) {
    const [state, setState] = useState(initState);
    const dispatchState = useCallback(async (action) => {
        setState({...state, ...await reducer(action)})
    }, [state]);
    return [state, dispatchState];
}

async function reducer(action) {
    switch (action.type) {
        case ACTION_ENUM.set_user:{
            return {
                currentUserId: payload.userId,
                currentUser: payload.user
            }
        }
        case ACTION_ENUM.add_user: {
            const req = await fetch(`${SERVER_PATH}/addUser`, {
                method: 'POST',
                body: JSON.stringify(action.payload),
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            if (req.status === 403) {
                return {
                    currentUserId: undefined, toastMessage: 'That email is already taken!',
                };
            }

            const res = await req.json();
            return {
                currentUserId: res._id,
                currentUser: res,
            };
        }
        case ACTION_ENUM.sign_in: {
            const req = await fetch(`${SERVER_PATH}/signIn`, {
                method: 'POST',
                body: JSON.stringify(action.payload),
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (req.status === 403) {
                return {
                    currentUserId: undefined, toastMessage: 'Sorry, the credentials are incorrect',
                };
            }

            const res = await req.json();
            return {
                currentUserId: res._id,
                currentUser: res,
            };
        }
        case ACTION_ENUM.get_user: {
            const req = await fetch(`${SERVER_PATH}/getUser`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (req.status === 403) {
                return {
                    currentUserId: undefined, currentUser: undefined,
                };
            }

            const res = await req.json();
            return {
                currentUserId: res._id,
                currentUser: res,
            };
        }
        case ACTION_ENUM.withdraw_from_account: {
            const req = await fetch(`${SERVER_PATH}/withdraw`, {
                method: 'POST',
                body: JSON.stringify(action.payload),
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            const res = await req.json();

            return {
                currentUserId: res._id,
                currentUser: res,
            };
        }
        case ACTION_ENUM.deposit_to_account:
            const req = await fetch(`${SERVER_PATH}/deposit`, {
                method: 'POST',
                body: JSON.stringify(action.payload),
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            const res = await req.json();
            return {
                currentUserId: res._id,
                currentUser: res,
            };
        case ACTION_ENUM.log_user_submission:
            return {
                userSubmissions: [{
                    user: action.payload.user,
                    sum: action.payload.sum,
                    action: action.payload.action,
                }],
            };
        case ACTION_ENUM.display_toast:
            return {
                toastMessage: action.payload,
            };
        case ACTION_ENUM.sign_out:
            await fetch(`${SERVER_PATH}/logout`, {
                method: 'POST',
                body: JSON.stringify(action.payload),
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            return {
                currentUserId: undefined,
                currentUser: undefined,
            };
        default:
            throw new Error();
    }
}

export const GlobalContext = createContext({
    state: INITIAL_STATE,
    addUser: (user) => undefined,
    signIn: (currentUserEmail, currentUserPassword) => undefined,
    withdrawFromAccount: (currentUserEmail, sum) => undefined,
    depositToAccount: (currentUserEmail, sum) => undefined,
    displayToast: (toastMessage) => undefined,
    getUser: () => undefined,
    signOut: () => undefined
});

export const GlobalContextProvider = ({children}) => {
    const [state, dispatch] = useAsyncReducer(reducer, INITIAL_STATE);

    const addUser = useCallback((user) => {
        return dispatch({type: ACTION_ENUM.add_user, payload: user});
    }, [state]);

    const signIn = useCallback((currentUserEmail, currentUserPassword) => {
        return dispatch({type: ACTION_ENUM.sign_in, payload: {email: currentUserEmail, password: currentUserPassword}});
    }, [state]);

    const withdrawFromAccount = useCallback((currentUserEmail, sum) => {
        return dispatch({type: ACTION_ENUM.withdraw_from_account, payload: {user: currentUserEmail, sum: sum}});
    }, [state]);

    const depositToAccount = useCallback((currentUserEmail, sum) => {
        return dispatch({type: ACTION_ENUM.deposit_to_account, payload: {user: currentUserEmail, sum: sum}});
    }, [state]);

    const displayToast = useCallback((toastMessage) => {
        return dispatch({type: ACTION_ENUM.display_toast, payload: toastMessage});
    }, [state]);

    const hideToast = useCallback(() => {
        return dispatch({type: ACTION_ENUM.display_toast, payload: undefined});
    }, [state]);

    const getUser = useCallback(() => {
        return dispatch({type: ACTION_ENUM.get_user, payload: undefined})
    }, [state]);

    const signOut = useCallback(() => {
        return dispatch({type: ACTION_ENUM.sign_out, payload: undefined})
    }, [state]);

    return (<>
        <GlobalContext.Provider
            value={{
                state: state,
                addUser: addUser,
                signIn: signIn,
                depositToAccount: depositToAccount,
                withdrawFromAccount: withdrawFromAccount,
                displayToast: displayToast,
                getUser: getUser,
                signOut: signOut,
            }} children={children}
        /><>
        {(state.toastMessage !== undefined) && (<Toast message={state.toastMessage} shouldDisappear={hideToast} />)}
    </>
    </>);
};
