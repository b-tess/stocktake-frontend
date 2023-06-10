import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getOneStockItem } from '../features/stock/stockSlice'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function StockItem() {
    //Access the global state
    const { stockItem, isLoading, isError, message } = useSelector(
        (state) => state.stock
    )

    const { stockItemId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getOneStockItem(stockItemId))

        if (isError) {
            toast.error(message)
        }
    }, [stockItemId, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url={'/stockitems'} />
            <h1>Stock Item Details</h1>
            <div className='stockItemHeadings'>
                <div>Id</div>
                <div>Name</div>
                <div>In Stock</div>
                <div>Expiry Date</div>
                <div>Item Type</div>
            </div>
            <div className='stock-item'>
                <div>{stockItem._id}</div>
                <div>{stockItem.name}</div>
                <div>{stockItem.inStock}</div>
                <div>
                    {new Date(stockItem.expDate).toLocaleString().slice(3, 10)}
                </div>
                <div>{stockItem.itemType}</div>
            </div>
        </>
    )
}

export default StockItem
