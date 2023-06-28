import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'
import StockItems from './pages/StockItems'
import StockItem from './pages/StockItem'
import StockOut from './pages/StockOut'

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
                        <Route
                            path='/stockitems'
                            element={<PrivateRoute />}
                        >
                            <Route
                                path='/stockitems'
                                element={<StockItems />}
                            />
                        </Route>
                        <Route
                            path='/stockitems/stockout'
                            element={<PrivateRoute />}
                        >
                            <Route
                                path='/stockitems/stockout'
                                element={<StockOut />}
                            />
                        </Route>
                        <Route
                            path='/stockitem/:stockItemId'
                            element={<PrivateRoute />}
                        >
                            <Route
                                path='/stockitem/:stockItemId'
                                element={<StockItem />}
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
