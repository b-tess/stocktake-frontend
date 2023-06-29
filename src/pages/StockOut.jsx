import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllStockOutItems, reset } from '../features/stock/stockSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import StockOutItem from '../components/StockOutItem'
import Pagination from '@mui/material/Pagination'
import { toast } from 'react-toastify'

function StockOut() {
    //Access the global state in the app store
    const { stockItems, count, isSuccess, isLoading, isError, message } =
        useSelector((state) => state.stock)

    //Create local state
    const [pageNumber, setPageNumber] = useState(1)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllStockOutItems(pageNumber))

        if (isSuccess) {
            toast.info('Successful stock out.')
            dispatch(reset())
        }

        if (isError) {
            toast.error(message)
        }
    }, [pageNumber, isSuccess, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url={'/adminspace'} />
            <div className='stock-items-container'>
                <h1>Stock Out</h1>
                <div className='stockItemHeadings'>
                    <div>Name</div>
                    <div>Expiry Date</div>
                    <div>In Stock</div>
                    <div>Quantity</div>
                    <div></div>
                </div>
                {stockItems.map((stockItem) => (
                    <StockOutItem
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
                onChange={(e, value) => setPageNumber(value)}
            />
        </>
    )
}

export default StockOut
