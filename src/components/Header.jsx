import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className='header'>
            <h3>
                <Link to={'/'}>Stocktake App</Link>
            </h3>

            <ul>
                <li>
                    <Link to={'/login'}>Sign In</Link>
                </li>
                <li>
                    <Link to={'/signup'}>Sign Up</Link>
                </li>
            </ul>
        </header>
    )
}

export default Header
