import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'

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
                        <Route
                            path='/adminspace'
                            element={<PrivateRoute />}
                        >
                            <Route
                                path='/adminspace'
                                element={<Admin />}
                            />
                        </Route>
                    </Routes>
                </div>
            </Router>

            <ToastContainer />
        </>
    )
}

export default App
