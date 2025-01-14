
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider, useLocation } from 'react-router-dom'
import './App.css'
import LayoutOne from './Layout/LayoutOne'
import Home from './Pages/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import LayoutAuth from './Layout/LayoutAuth'
import app from './firebase.config'
import { ToastContainer } from 'react-toastify'
import Cart from './Pages/Cart/Cart'
import Favorite from './Pages/Favorite/Favorite'
import CategoryPage from './Pages/CategoryPage/CategoryPage'
import Offers from './Pages/OffersPage/OffersPage'
import SearchResult from './Pages/SearchResult/SearchResult'
import SingleProductPage from './Pages/SingleProductPage/SingleProductPage'
import NotFound from './Pages/NotFound/NotFound'


function App() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route>
        <Route path='/' element={<LayoutOne/>}>
          <Route index element={<Home/>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/category' element={<CategoryPage />} />
          <Route path='/offer' element={<Offers />} />
          <Route path='/searchResult' element={<SearchResult />} />
          <Route path='/Product' element={<SingleProductPage />} />
          <Route path='/*' element={<NotFound />} />
        </Route>
        <Route path='/auth' element={<LayoutAuth />}>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
        </Route>
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
