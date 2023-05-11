function Login() {
    return (
        <div className='capsule'>
            <h2>Log In</h2>
            <div className='form'>
                <form>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Email'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
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

export default Login
