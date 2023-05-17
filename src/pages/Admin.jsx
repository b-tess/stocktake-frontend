import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import { useAdminStatus } from '../hooks/useAdminStatus'

function Admin() {
    //Check if a user is admin or not
    // const { user } = useSelector((state) => state.auth)
    const { isAdministrator } = useAdminStatus()

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
                        disabled={isAdministrator ? false : true}
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
