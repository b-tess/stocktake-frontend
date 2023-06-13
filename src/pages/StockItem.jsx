import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAdminStatus } from '../hooks/useAdminStatus'
import { getOneStockItem, updateStockItem } from '../features/stock/stockSlice'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import DatePicker from 'react-date-picker'

function StockItem() {
    //Access the global state
    const { stockItem, isLoading, isError, message } = useSelector(
        (state) => state.stock
    )

    //Check if the user accessing the page is an admin
    const { isAdministrator } = useAdminStatus()

    //Create local state to help capture any data that
    //will be used to edit an item doc in the backend
    const [expDate, setExpDate] = useState()
    const [inStock, setInStock] = useState(0)

    const { stockItemId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOneStockItem(stockItemId))

        if (isError) {
            toast.error(message)
        }
    }, [stockItemId, isError, message, dispatch])

    function onSubmit(e) {
        e.preventDefault()

        const updateData = { expDate, inStock }
        dispatch(updateStockItem({ stockItemId, updateData }))
    }

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
                <form
                    className='form'
                    onSubmit={onSubmit}
                >
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
                            value={inStock}
                            min={stockItem.inStock}
                            placeholder={stockItem.inStock}
                            onChange={(e) => setInStock(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='expDate'>Expiry Date</label>
                        <DatePicker
                            id='expDate'
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
                    <button
                        type='submit'
                        className='btn btn-sm'
                        disabled={isAdministrator ? false : true}
                    >
                        Edit
                    </button>
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
