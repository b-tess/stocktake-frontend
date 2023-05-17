import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'
import { GoSignIn, GoSignOut, GoHome, GoPerson } from 'react-icons/go'

function Header() {
    //Check if a user is logged in using the auth state
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    // const navigate = useNavigate()

    function onLogout() {
        // navigate('/')
        dispatch(reset())
        dispatch(logout())
        console.log('logged out')
    }

    return (
        <header className='header'>
            <Link to={'/'}>
                <GoHome /> Stocktake App
            </Link>

            <ul>
                {user ? (
                    <li>
                        <Link
                            to={'/'}
                            onClick={onLogout}
                        >
                            <GoSignOut />
                            Sign Out
                        </Link>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to={'/login'}>
                                <GoSignIn /> Sign In
                            </Link>
                        </li>
                        <li>
                            <Link to={'/signup'}>
                                <GoPerson />
                                Sign Up
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    )
}

export default Header
