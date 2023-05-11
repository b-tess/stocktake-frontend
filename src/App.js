import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
    return (
        <>
            <Router>
                <div className='container'>
                    <Header />
                    <Routes>
                        <Route
                            path='/'
                            element={<Home />}
                        />
                        <Route
                            path='/login'
                            element={<Login />}
                        />
                        <Route
                            path='/signup'
                            element={<Signup />}
                        />
                    </Routes>
                </div>
            </Router>

            <ToastContainer />
        </>
    )
}

export default App
