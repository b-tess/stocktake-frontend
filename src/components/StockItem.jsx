import { Link } from 'react-router-dom'

function StockItem({ stockItem }) {
    return (
        <div className='stock-item'>
            <div>{stockItem.name}</div>
            <div>{stockItem.inStock}</div>
            <div>
                {new Date(stockItem.expDate).toLocaleString().slice(3, 10)}
            </div>
            <div>{stockItem.itemType}</div>
            <Link
                to={'/stockitem'}
                className='btn btn-sm'
            >
                View
            </Link>
        </div>
    )
}

export default StockItem
