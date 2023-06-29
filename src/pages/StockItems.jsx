import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllStockItems, reset } from '../features/stock/stockSlice'
import Spinner from '../components/Spinner'
import StockItem from '../components/StockItem'
import BackButton from '../components/BackButton'
import { toast } from 'react-toastify'
import Pagination from '@mui/material/Pagination'

function StockItems() {
    //Access the global state
    const { stockItems, count, isLoading, isError, message } = useSelector(
        (state) => state.stock
    )

    //Manage the state of the page to load
    const [pageNumber, setPageNumber] = useState(1)

    const dispatch = useDispatch()

    //Fetch the stock items on page load
    useEffect(() => {
        dispatch(getAllStockItems(pageNumber))

        if (isError) {
            toast.error(message)
        }
    }, [isError, message, pageNumber, dispatch])

    //Handle any potential errors and info
    // useEffect(() => {
    //     if (isSuccess && stockItems.length === 0) {
    //         toast.info('No items in stock.')
    //     }
    //     if (isError) {
    //         toast.error(message)
    //     }
    //     // dispatch(reset())
    // }, [isSuccess, stockItems.length, isError, message])

    //Reset the state on unmount -
    //Not sure why this is needed yet
    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    //Function to load correct page items
    function onPageLoad(e, value) {
        setPageNumber(value)
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url={'/adminspace'} />
            <div className='stock-items-container'>
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
            <Pagination
                count={count}
                page={pageNumber}
                siblingCount={0}
                variant='outlined'
                onChange={onPageLoad}
            />
        </>
    )
}

export default StockItems
