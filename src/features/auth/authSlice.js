import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

export const signup = createAsyncThunk(
    'auth/signup',
    async (user, thunkAPI) => {
        try {
            return await authService.signup(user)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(signup.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
