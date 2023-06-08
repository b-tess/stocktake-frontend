import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllStockItems, reset } from '../features/stock/stockSlice'
import Spinner from '../components/Spinner'
import StockItem from '../components/StockItem'
import BackButton from '../components/BackButton'
import { toast } from 'react-toastify'

function StockItems() {
    //Access the global state
    const { stockItems, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.stock
    )

    const dispatch = useDispatch()

    //Fetch the stock items on page load
    useEffect(() => {
        dispatch(getAllStockItems())
        // console.log(`Is success is ${isSuccess}`)
    }, [dispatch])

    //Handle any potential errors and info
    useEffect(() => {
        if (isSuccess && stockItems.length === 0) {
            toast.info('No items in stock.')
        }
        if (isError) {
            toast.error(message)
        }
        // dispatch(reset())
    }, [isSuccess, stockItems.length, isError, message])

    //Reset the state on unmount -
    //Not sure why this is needed yet
    useEffect(() => {
        console.log(isSuccess)
        return () => {
            if (isSuccess) {
                dispatch(reset())
                console.log('cleanup')
            }
        }
        //es-lint disable next line
    }, [isSuccess, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url={'/adminspace'} />
            <div className='stockItemsContainer'>
                <h1>Stock Items</h1>
                <div className='stockItemHeadings'>
                    <div>Name</div>
                    <div>In Stock</div>
                    <div>Expiry Date</div>
                    <div>Item Type</div>
                    <div></div>
                </div>
                {stockItems.map((stockItem) => (
                    <StockItem
                        key={stockItem._id}
                        stockItem={stockItem}
                    />
                ))}
            </div>
        </>
    )
}

export default StockItems
