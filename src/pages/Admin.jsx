import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Admin() {
    //Check if a user is admin or not
    const { user } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    return (
        <>
            <main>
                <div className='capsule'>
                    <p className='heading'>What would you like to do?</p>
                    <button
                        type='button'
                        className='btn'
                        onClick={() => navigate('/')}
                    >
                        Stock Out
                    </button>
                    <button
                        type='button'
                        className='btn'
                        disabled={user.isAdmin ? false : true}
                        onClick={() => navigate('/')}
                    >
                        Stock In
                    </button>
                </div>
            </main>
        </>
    )
}

export default Admin
