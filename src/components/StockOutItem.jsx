import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updOnStockOut, reset } from '../features/stock/stockSlice'
import Spinner from './Spinner'
import { toast } from 'react-toastify'

function StockOutItem({ stockItem }) {
    const { isLoading, isError, message } = useSelector((state) => state.stock)

    //Manage the state of the quantity input locally.
    const [quantity, setQuantity] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
            dispatch(reset())
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, message, dispatch])

    const requestBody = {
        id: stockItem._id,
        count: quantity,
    }

    function onStockOut() {
        dispatch(updOnStockOut(requestBody))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='stock-item'>
            <div>{stockItem.name}</div>
            <div>
                {new Date(stockItem.expDate).toLocaleString().slice(3, 10)}
            </div>
            <div>{stockItem.inStock}</div>
            <div className='form-group'>
                <label htmlFor='quantity'>Quantity</label>
                <input
                    type='number'
                    name='quantity'
                    id='quantity'
                    value={quantity}
                    min={0}
                    max={stockItem.inStock}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <button
                type='button'
                className='btn btn-sm'
                onClick={onStockOut}
                disabled={stockItem.inStock === 0 ? true : false}
            >
                Stock Out
            </button>
        </div>
    )
}

export default StockOutItem
