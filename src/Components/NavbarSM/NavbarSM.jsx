import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavbarSM.css'
import { FaBars, FaRegHeart, FaRegUser } from 'react-icons/fa'
import { FiSearch, FiShoppingCart } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { productFilter } from '../../slice/productfiterSlice'
import { IoCloseSharp } from 'react-icons/io5'
import { productData } from '../../slice/productSlice'
import { setQuery } from '../../slice/searchSlice'

const NavbarSM = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state)=>state.currentUser.value)
    const [showNavbar, setShowNavbar] = useState(false);
    // Vars
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState('')
    
    // Functions
    useEffect(() => {
        fetch('https://api.jsonbin.io/v3/b/677d420aad19ca34f8e7076f')
            .then(response => response.json())
            .then(json => setProducts(json.record))
    }, []);
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setQuery(searchInput.toLowerCase()));
        const filtered = products.filter((product) => {
            const matchesKeyword = product.productKeyword?.some((keyword) =>
                keyword.toLowerCase() === searchInput.toLowerCase()
            );
            const nameWords = product.productName?.toLowerCase().split(' ') || [];
            const matchesName = nameWords.some((word) => word === searchInput.toLowerCase());
            const matchesCategory = searchInput.length >= 3 && 
                product.productCategory?.toLowerCase().includes(searchInput.toLowerCase());
            return matchesKeyword || matchesName || matchesCategory;
        });
        localStorage.setItem('product',JSON.stringify(filtered))
        dispatch(productData(filtered));
        setShowNavbar(!showNavbar)
        navigate('/searchResult');
        };
  return (
    <nav id='navbarsm'>
        <div className="container">
            <div className="menu_row">
                <div className="menu_logo">
                    <Link className='text-2xl font-Poppins font-bold text-secendary block' to={'/'}> <img src="images/logo.png" alt="" /> </Link>
                </div>
                <div className="menu-toggle">
                    <button onClick={()=>setShowNavbar(!showNavbar)}><FaBars /></button>
                </div>
                <div className={`sidenavbar ${showNavbar ? "left-0" : "left-[-110%]"}`}>
                    <div className="sidenavbar-row">
                        <div className="sidenavbar-logo flex justify-between">
                            <Link className='text-2xl font-Poppins font-bold text-secendary block' to={'/'}> <img src="images/logo.png" alt="" /> </Link>
                            <button className='text-3xl text-white' onClick={()=>setShowNavbar(!showNavbar)}><IoCloseSharp /></button>
                        </div>
                        <form onSubmit={handleSearch} className="sidenavbar-search">
                            <input type="text" onChange={(e) => setSearchInput(e.target.value)} placeholder='Search anything here' />
                            <button type='submit'><FiSearch /></button>
                        </form>
                        <div className="sidenavbar-buttons">
                        {
                            currentUser == null ?
                            <Link to={'/auth/login'} className="navbar-button">
                                <FaRegUser />
                                <div className="navbar-button-text">
                                    <h3>Account</h3>
                                    <h4>Login</h4>
                                </div>
                            </Link>
                            :
                            <div className='flex flex-col gap-[10px] pb-[30px] border-b-[2px] border-white border-dashed'>
                                <Link to={'/'} className="navbar-button !py-[20px]">
                                    <FaRegUser />
                                    <div className="navbar-button-text">
                                        <h3>{currentUser.displayName}</h3>
                                    </div>
                                </Link>
                                <Link to={'/favorite'} onClick={()=>setShowNavbar(!showNavbar)} className="navbar-button">
                                    <FaRegHeart />
                                    <div className="navbar-button-text">
                                        <h4>Favorite</h4>
                                        <h3>Items</h3>
                                    </div>
                                </Link>
                                <Link to={'/cart'} onClick={()=>setShowNavbar(!showNavbar)} className="navbar-button">
                                    <FiShoppingCart />
                                    <div className="navbar-button-text">
                                        <h4>Cart</h4>
                                        <h3>Items</h3>
                                    </div>
                                </Link>
                            </div>
                        }
                        </div>
                        <div className="sidenavbar-links">
                            <li><Link to={"/"} onClick={()=>setShowNavbar(!showNavbar)}>Home</Link></li>
                            <li><Link to={"/offer"} onClick={()=>setShowNavbar(!showNavbar)}>Exclusive offers</Link></li>
                            <li><Link to={"/cart"} onClick={()=>setShowNavbar(!showNavbar)}>Shopping Cart</Link></li>
                            <li><Link to={"/category"} onClick={()=>{dispatch(productFilter("Electronic")),setShowNavbar(!showNavbar)}}>Electronics</Link></li>
                            <li><Link to={"/category"} onClick={()=>{dispatch(productFilter("Beauty")),setShowNavbar(!showNavbar)}}>Beauty</Link></li>
                            <li><Link to={"/category"} onClick={()=>{dispatch(productFilter("Furnitures")),setShowNavbar(!showNavbar)}}>Furnitures</Link></li>
                            <li><Link to={"/category"} onClick={()=>{dispatch(productFilter("Clothing")),setShowNavbar(!showNavbar)}}>Clothings</Link></li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default NavbarSM