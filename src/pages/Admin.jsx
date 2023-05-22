import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminStatus } from '../hooks/useAdminStatus'
import Modal from 'react-modal'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

//Set the Modal to originate from index.html/index.js
//i.e. the root element that contains this app
Modal.setAppElement('#root')

function Admin() {
    //Check if a user is admin or not
    const { isAdministrator } = useAdminStatus()

    //Display & hide categoryDiv
    //Set the initial state of the Modal
    //Set local state for collecting the form data
    //Set the initial state of the date picker
    const [isHidden, setIsHidden] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        inStock: 0,
    })
    const [expDate, setExpDate] = useState(new Date())

    const { name, inStock } = formData
    const navigate = useNavigate()

    function hideCategoryDiv() {
        setIsHidden(!isHidden)
        console.log(`Value of hidden is ${isHidden}`)
    }

    //Open the modal
    function openModal() {
        setIsModalOpen(true)
    }

    //Close the modal
    function closeModal() {
        setIsModalOpen(false)
    }

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    function onCreateStockItem(e) {
        e.preventDefault()
        closeModal()
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
                                onClick={openModal}
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

                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel='Add Stock Item'
                    >
                        <h3>Add Stock Item</h3>
                        <button
                            className='btn-close'
                            onClick={closeModal}
                        >
                            X
                        </button>
                        <form onSubmit={onCreateStockItem}>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='name'
                                    id='name'
                                    value={name}
                                    placeholder='Item Name'
                                    onChange={onChange}
                                />
                                <input
                                    type='number'
                                    name='inStock'
                                    id='inStock'
                                    value={inStock}
                                    placeholder='Number in stock'
                                    onChange={onChange}
                                />
                                <DatePicker
                                    value={expDate}
                                    onChange={setExpDate}
                                    required
                                    format='y-M'
                                    disableCalendar
                                    minDate={new Date()}
                                    yearPlaceholder='yyyy'
                                    monthPlaceholder='mm'
                                    className={'date-picker'}
                                />
                                {/* <input
                                    // type='date'
                                    name='expDate'
                                    id='expDate'
                                    value={expDate}
                                    placeholder='Expiry date'
                                    onChange={onChange}
                                /> */}
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
                    </Modal>
                </div>
            </main>
        </>
    )
}

export default Admin
