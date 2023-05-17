import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <div className='capsule'>
                <h1>STOCKTAKE</h1>
                <Link
                    to={'/adminspace'}
                    className='btn'
                >
                    Admin Space
                </Link>
                <Link
                    to={'/signup'}
                    className='btn btn-reverse'
                >
                    Create Account
                </Link>
            </div>
        </>
    )
}

export default Home
