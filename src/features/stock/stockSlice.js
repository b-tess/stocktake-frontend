import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import stockService from './stockService'

const initialState = {
    stockItems: [],
    stockitem: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

//Create a new medication stock item
export const createMedicationStockItem = createAsyncThunk(
    'stock/createmedication',
    async (medicationData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.createMedicationStockItem(
                medicationData,
                token
            )
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

//Get all medication stock items
//The _ as a parameter for the async callback allows access to
//the thunkAPI when there isn't a need to pass another
//parameter before it.
//Can't the thunkAPI be passed as a single parameter? Not sure...
export const getMedicationStockItems = createAsyncThunk(
    'stock/getallmedication',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.getMedicationStockItems(token)
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

export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMedicationStockItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createMedicationStockItem.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createMedicationStockItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getMedicationStockItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMedicationStockItems.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.stockItems = action.payload
            })
            .addCase(getMedicationStockItems.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = stockSlice.actions
export default stockSlice.reducer
