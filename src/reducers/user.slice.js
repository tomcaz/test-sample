import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FETCH_STATUS, FORM_STATE } from '../global/constants';
import { getUserList, saveNewUser, deleteAUser, updateAUser } from '../global/functions';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: [],
        formState: FORM_STATE.DEFAULT, // DEFAULT, CREATE, UPDATE 
        currentUser: null,
        fetchStatus: FETCH_STATUS.IDLE,
        error: ''
    },
    reducers: {
        editUser: (state, action) => { // clicking edit button to load user
            state.formState = FORM_STATE.UPDATE
            state.currentUser = action.payload
        }, changeFormState: (state, action) => {
            state.formState = action.payload
            if (action.payload === FORM_STATE.CREATE || action.payload === FORM_STATE.DEFAULT) {
                state.currentUser = null
            }
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.fetchStatus = FETCH_STATUS.LOADING
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.fetchStatus = FETCH_STATUS.SUCCESSED
            state.userData = action.payload
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.fetchStatus = FETCH_STATUS.FAILED
            state.error = action.error.messsage
        })
        .addCase(saveUser.pending, (state) => {
            state.fetchStatus = FETCH_STATUS.LOADING
        })
        .addCase(saveUser.fulfilled, (state) => {
            state.formState = FORM_STATE.DEFAULT
            state.fetchStatus = FETCH_STATUS.IDLE // to reload
        })
        .addCase(deleteUser.pending, (state) => {
            state.fetchStatus = FETCH_STATUS.LOADING
        })
        .addCase(deleteUser.fulfilled, (state) => {
            state.fetchStatus = FETCH_STATUS.IDLE // to reload
        })
        .addCase(updateUser.pending, (state) => {
            state.fetchStatus = FETCH_STATUS.LOADING
        })
        .addCase(updateUser.fulfilled, (state) => {
            state.formState = FORM_STATE.DEFAULT
            state.fetchStatus = FETCH_STATUS.IDLE // to reload
        })
    }
})

export const {   editUser, changeFormState } = userSlice.actions

export const fetchUsers = createAsyncThunk('users/fetchPosts', async () => {
    return await getUserList();
});
export const saveUser = createAsyncThunk('users/saveUser', async (user) => {
    await saveNewUser(user);
})
export const deleteUser = createAsyncThunk('users/delete', async (id) => {
    await deleteAUser(id);
})
export const updateUser = createAsyncThunk('users/update', async (user) => {
    await updateAUser(user);
})

export default userSlice.reducer