import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getOneStockItem } from '../features/stock/stockSlice'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import DatePicker from 'react-date-picker'

function StockItem() {
    //Access the global state
    const { stockItem, isLoading, isError, message } = useSelector(
        (state) => state.stock
    )

    //Create local state to help capture any data that
    //will be used to edit an item doc in the backend
    const [expDate, setExpDate] = useState(stockItem.expDate)

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
            <div className='stockItemsContainer'>
                <h1>Stock Item Details</h1>
            </div>
            <div>
                <form className='form'>
                    <div className='form-group'>
                        <label htmlFor='item-id'>Item Id</label>
                        <input
                            type='text'
                            name='item-id'
                            id='item-id'
                            value={stockItem._id}
                            disabled
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='item-name'>Item Name</label>
                        <input
                            type='text'
                            name='item-name'
                            id='item-name'
                            value={stockItem.name}
                            disabled
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='number-in-stock'>Number In Stock</label>
                        <input
                            type='number'
                            name='number-in-stock'
                            id='number-in-stock'
                            value={stockItem.inStock}
                            min={stockItem.inStock}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='item-exp-date'>Expiry Date</label>
                        <DatePicker
                            id='item-exp-date'
                            value={expDate}
                            onChange={setExpDate}
                            required
                            calendarClassName={'calendarDiv'}
                            format='y-M'
                            view='year'
                            maxDetail='year'
                            minDate={new Date(stockItem.expDate)}
                            yearPlaceholder='yyyy'
                            monthPlaceholder='mm'
                            className={'date-picker'}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='item-type'>Item Type</label>
                        <input
                            type='text'
                            name='item-type'
                            id='item-type'
                            value={stockItem.itemType}
                            disabled
                        />
                    </div>
                </form>
            </div>
            {/* <div className='stockItemHeadings'>
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
            </div> */}
        </>
    )
}

export default StockItem
