import BackButton from '../components/BackButton'

function StockOut() {
    return (
        <>
            <BackButton url={'/adminspace'} />
            <div className='stock-items-container'>
                <h1>StockOut</h1>
            </div>
        </>
    )
}

export default StockOut
