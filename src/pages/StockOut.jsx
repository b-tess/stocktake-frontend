import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    getAllStockOutItems,
    getAllMedItems,
    reset,
} from '../features/stock/stockSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import StockOutItem from '../components/StockOutItem'
import Pagination from '@mui/material/Pagination'
import { toast } from 'react-toastify'

function StockOut() {
    //Access the global state in the app store
    const { stockItems, count, isLoading, isError, message } = useSelector(
        (state) => state.stock
    )

    //Create local state for the pagination component to use
    const [pageNumber, setPageNumber] = useState(1)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllStockOutItems(pageNumber))

        if (isError) {
            toast.error(message)
        }
    }, [pageNumber, isError, message, dispatch])

    function getAll() {
        dispatch(reset())
        dispatch(getAllStockOutItems(pageNumber))
    }

    function getMeds() {
        dispatch(reset())
        dispatch(getAllMedItems(pageNumber))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className='after-the-header-container'>
                <BackButton url={'/adminspace'} />
                <div className='filter-div'>
                    <p>Filter by:</p>
                    <button
                        type='button'
                        className='btn btn-sm'
                        onClick={getAll}
                    >
                        All
                    </button>
                    <button
                        type='button'
                        className='btn btn-sm'
                        onClick={getMeds}
                    >
                        Medication
                    </button>
                    <button className='btn btn-sm'>Utilities</button>
                </div>
            </div>
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
