import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Signup() {
    //Use local state to manage the form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData

    //Access the global state
    const { isLoading, user, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (user && isSuccess) {
            console.log(`Hello ${user.name}`)
        }

        dispatch(reset())
    }, [isError, message, user, isSuccess, dispatch])

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    function onSubmit(e) {
        e.preventDefault()

        //Confirm that both passwords match
        if (password2 !== password) {
            toast.error('The passwords do not match.')
            return
        }

        const userData = {
            name,
            email,
            password,
        }

        dispatch(signup(userData))
        setFormData({
            name: '',
            email: '',
            password: '',
            password2: '',
        })
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='capsule'>
            <h2>Sign Up</h2>
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            value={name}
                            placeholder='Name'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            value={email}
                            placeholder='Email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            value={password}
                            placeholder='Password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password2'>Confirm Password</label>
                        <input
                            type='password'
                            name='password2'
                            id='password2'
                            value={password2}
                            placeholder='Confirm Password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button
                            className='btn'
                            type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
