import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <div className='capsule'>
                <h1>STOCKTAKE</h1>
                <Link
                    to={'/login'}
                    className='btn'
                >
                    Sign In
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
