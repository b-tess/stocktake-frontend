import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMedicationStockItems, reset } from '../features/stock/stockSlice'
import Spinner from '../components/Spinner'
import StockItem from '../components/StockItem'
import { toast } from 'react-toastify'

function StockItems() {
    //Access the global state
    const { stockItems, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.stock
    )

    const dispatch = useDispatch()

    //Fetch the stock items on page load
    useEffect(() => {
        dispatch(getMedicationStockItems())
    }, [dispatch])

    //Handle any potential errors and info
    useEffect(() => {
        if (isSuccess && stockItems.length === 0) {
            toast.info('No items in stock.')
        }
        if (isError) {
            toast.error(message)
        }
    }, [isSuccess, stockItems.length, isError, message])

    //Reset the state on unmount -
    //Not sure why this is needed yet
    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [isSuccess, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='stockItemsContainer'>
            <h1>Stock Items</h1>
            <div className='stockItemHeadings'>
                <div>Name</div>
                <div>In Stock</div>
                <div>Expiry Date</div>
                <div></div>
            </div>
            {stockItems.map((stockItem) => (
                <StockItem
                    key={stockItem._id}
                    stockItem={stockItem}
                />
            ))}
        </div>
    )
}

export default StockItems
