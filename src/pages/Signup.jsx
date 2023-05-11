function Signup() {
    return (
        <div className='capsule'>
            <h2>Sign Up</h2>
            <div className='form'>
                <form>
                    <div className='form-group'>
                        <label for='name'>Name</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            placeholder='Name'
                        />
                    </div>
                    <div className='form-group'>
                        <label for='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Email'
                        />
                    </div>
                    <div className='form-group'>
                        <label for='password'>Password</label>
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

export default Signup
