import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { FORM_STATE } from '../global/constants';

const data = [{
    username: 'John',
    dob: '05/23/1990',
    country: 0,
    city: 1,
    id: "31231231231"
},{
    username: 'Alex',
    dob: '01/22/1993',
    country: 1,
    city: 1,
    id: "3121231231"
}];

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: [],
        formState: FORM_STATE.DEFAULT, // DEFAULT, CREATE, UPDATE 
        currentUser: null
    },
    reducers: {
        listUsers: state => 
            void(state.userData = data)

        , addUser: (state,action) => {
            state.userData.push({
                ...action.payload,
                id: uuidv4()
            })
        }, deleteUser: (state, action) => {
            state.userData = state.userData.filter(user => user.id !== action.payload)

        }, editUser: (state, action) => { // clicking edit button to load user
            state.formState = FORM_STATE.UPDATE
            state.currentUser = action.payload
        }, updateUser: (state, action) => {
            state.currentUser = null;
            state.formState = FORM_STATE.DEFAULT;
            state.userData = [
                ...state.userData.filter(user => user.id !== action.payload.id),
                {...action.payload}
            ]

        }, changeFormState: (state, action) => {
            state.formState = action.payload
            if (action.payload === FORM_STATE.CREATE || action.payload === FORM_STATE.DEFAULT) {
                state.currentUser = null
            }
        }
    }
})

export const { listUsers, addUser, deleteUser, editUser, updateUser, changeFormState } = userSlice.actions

export default userSlice.reducer