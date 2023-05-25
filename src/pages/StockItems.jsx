import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMedicationStockItems, reset } from '../features/stock/stockSlice'

function StockItems() {
    //Access the global state
    const { stockItems, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.stock
    )

    useEffect(() => {}, [])
    return (
        <div className='stockItemsContainer'>
            <h1>Stock Items</h1>
            <div className='stockItemHeadings'>
                <div>Name</div>
                <div>In Stock</div>
                <div>Expiry Date</div>
                <div></div>
            </div>
        </div>
    )
}

export default StockItems
