import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import stockService from './stockService'

const initialState = {
    stockItems: [],
    stockItem: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

//Create a new stock item
export const createStockItem = createAsyncThunk(
    'stock/createstockitem',
    async (stockData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.createStockItem(stockData, token)
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

//Get ALL stock items
//The _ as a parameter for the async callback allows access to
//the thunkAPI when there isn't a need to pass another
//parameter before it.
//Can't the thunkAPI be passed as a single parameter? Not sure...
export const getAllStockItems = createAsyncThunk(
    'stock/getallstockitems',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.getAllStockItems(token)
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

//Get one stock item for viewing and possibly editing
export const getOneStockItem = createAsyncThunk(
    'stock/getonestockitem',
    async (stockItemId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await stockService.getOneStockItem(stockItemId, token)
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
            .addCase(createStockItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createStockItem.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createStockItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllStockItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllStockItems.fulfilled, (state, action) => {
                state.isLoading = false
                // state.isSuccess = true
                state.stockItems = action.payload
            })
            .addCase(getAllStockItems.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getOneStockItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOneStockItem.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.stockItem = action.payload
            })
            .addCase(getOneStockItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = stockSlice.actions
export default stockSlice.reducer
