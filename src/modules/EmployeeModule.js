import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const POST_LOGIN = 'employee/POST_LOGIN';
export const GET_EMPLOYEE = 'employee/GET_EMPLOYEE';
export const POST_FINDPWD = 'employee/POST_FINDPWD';

const actions = createActions({
    [POST_LOGIN]: () => {},
    [GET_EMPLOYEE]: () => {},
    [POST_FINDPWD]: () => {}
});

const employeeReducer = handleActions({
    [POST_LOGIN]: (state, {payload}) => {
        return payload;
    },

    [GET_EMPLOYEE]: (state, {payload}) => {
        return payload;
    },

    [POST_FINDPWD]: (state, {payload}) => {
        return payload;
    },
},
initialState

);

export default employeeReducer; 