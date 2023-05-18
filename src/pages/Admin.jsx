import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminStatus } from '../hooks/useAdminStatus'

function Admin() {
    //Check if a user is admin or not
    const { isAdministrator } = useAdminStatus()

    //Add functionality to display or hide categoryDiv
    const [isHidden, setIsHidden] = useState(true)

    const navigate = useNavigate()

    function hideCategoryDiv() {
        setIsHidden(!isHidden)
        console.log(`Value of hidden is ${isHidden}`)
    }

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
                        onClick={hideCategoryDiv}
                    >
                        Stock In
                    </button>

                    {/* Toggle the visibility of the category div on button click */}
                    {!isHidden && (
                        <div className='categoryDiv'>
                            <p>Please select a category</p>
                            <button
                                className='btn btn-sm'
                                type='button'
                            >
                                Medication
                            </button>
                            <button
                                className='btn btn-sm'
                                type='button'
                            >
                                Utilities
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}

export default Admin
