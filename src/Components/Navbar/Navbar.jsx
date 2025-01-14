import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate} from 'react-router-dom'
import { FiSearch, FiShoppingCart } from 'react-icons/fi'
import { FaHeart, FaRegHeart, FaRegUser } from 'react-icons/fa'
import { RiAccountCircle2Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { productFilter } from '../../slice/productfiterSlice'
import { setFilteredProducts, setQuery } from '../../slice/searchSlice'
import { productData } from '../../slice/productSlice'
import NavbarSM from '../NavbarSM/NavbarSM'

const Navbar = () => {
    // ===================== custom useStates
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch()
    const [searchBarShow,setSearchBarShow] = useState(false)
    const currentUser = useSelector((state)=>state.currentUser.value)
    const [searchInput, setSearchInput] = useState('');
    const query = useSelector((state) => state.search.query);
    const navigate = useNavigate()
    // Functions
    useEffect(() => {
        fetch('https://api.jsonbin.io/v3/b/677d420aad19ca34f8e7076f')
            .then(response => response.json())
            .then(json => setProducts(json.record))
            .catch((error) => console.error('Error fetching products:', error));
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
    navigate('/searchResult');
    };
    const handleLogOut = ()=>{
        localStorage.removeItem('user')
        navigate('/')
        window.location.reload()
    }
  return (
    <div className="flex flex-col">        
        <nav id='nav'>
            <div className="container">
                <div className="menu_row">
                    {/* ================= logo and searchBar start =========== */}
                    <div className=' flex gap-[8px] xl:gap-16 items-center'>
                        <div className="menu_logo">
                            <Link className='text-2xl font-Poppins font-bold text-secendary hidden sm:block' to={'/'}> <img src="images/logo.png" alt="" /> </Link>
                        </div>
                        <form onSubmit={handleSearch} className="searchBar searchBar1">
                            <input type="text" onChange={(e) => setSearchInput(e.target.value)} placeholder='Search anything here' />
                            <button type='submit'><FiSearch /></button>
                        </form>
                    </div>
                    {/* ================= logo and searchBar end// =========== */}
                    {/* ================= Login and Register start =========== */}
                    <div className="authBar">
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
                            <div className='flex gap-[10px]'>
                                <Link to={'/favorite'} className="navbar-button">
                                    <FaRegHeart />
                                    <div className="navbar-button-text">
                                        <h4>Favorite</h4>
                                        <h3>Items</h3>
                                    </div>
                                </Link>
                                <Link to={'/cart'} className="navbar-button">
                                    <FiShoppingCart />
                                    <div className="navbar-button-text">
                                        <h4>Cart</h4>
                                        <h3>Items</h3>
                                    </div>
                                </Link>
                                <Link to={'/'} className="navbar-button !py-[20px]">
                                    <FaRegUser />
                                    <div className="navbar-button-text">
                                        <h3>{currentUser.displayName}</h3>
                                    </div>
                                    <div className="account-dropdown">
                                        <li>
                                            <Link className='logout' onClick={handleLogOut}>Logout</Link>
                                        </li>
                                    </div>
                                </Link>
                            </div>
                        }
                    </div>
                    {/* ================= Login and Register end =========== */}
                </div>
            </div>
        </nav>
        <nav id="nav2">
            <div className="container">
                <div className="nav2-row">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/offer"}>Exclusive offers</Link></li>
                    <li><Link to={"/cart"}>Shopping Cart</Link></li>
                    <li><Link to={"/category"} onClick={()=>dispatch(productFilter("Electronic"))}>Electronics</Link></li>
                    <li><Link to={"/category"} onClick={()=>dispatch(productFilter("Beauty"))}>Beauty</Link></li>
                    <li><Link to={"/category"} onClick={()=>dispatch(productFilter("Furnitures"))}>Furnitures</Link></li>
                    <li><Link to={"/category"} onClick={()=>dispatch(productFilter("Clothing"))}>Clothings</Link></li>
                </div>
            </div>
        </nav>
        <NavbarSM />
    </div>
  )
}

export default Navbar