import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { isVerified } from '../features/auth/authSlice'
import { MdWavingHand } from 'react-icons/md'

function VerifyEmail() {
    //Access the user object from the global state
    const { user } = useSelector((state) => state.auth)

    const { newusertoken } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(isVerified(newusertoken))
    }, [newusertoken, dispatch])

    return (
        <div className='capsule'>
            <h2>Welcome to the Stocktake App</h2>
            <p>
                Hello {user.name}. <MdWavingHand />
            </p>
            <p>Please log in using the button below.</p>
            <button
                type='button'
                className='btn btn-sm'
                onClick={() => navigate('/login')}
            >
                Log In
            </button>
        </div>
    )
}

export default VerifyEmail
