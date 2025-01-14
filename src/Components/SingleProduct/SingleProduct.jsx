import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { productData } from '../../slice/productSlice'
import './SingleProduct.css'
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { Slide, toast } from 'react-toastify'

const SingleProduct = ({item}) => {
    const dispatcher = useDispatch()
    const currentUser = useSelector((state)=>state.currentUser.value)
    const [localCart, setLocalCart] = useState([]);
    const [localFavorites, setLocalFavorites] = useState([]);
    let handleProduct = (item)=>{
        localStorage.setItem('product',JSON.stringify(item))
        dispatcher(productData(item))
    }
    // Add to cart
const handleAddToCart = (currentProduct) => {
    if (currentUser == null) {
        toast.error('User not logged in', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
        return;
    }
    const alreadyInCart = localCart.some(item => item.productId === currentProduct.productId);
    if (alreadyInCart) {
        toast.error('You already added this to your cart', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
    } else {
        const db = getDatabase();
        set(push(ref(db, 'Cart/')), {
        productId: currentProduct.productId,
        productName: currentProduct.productName,
        productDescription: currentProduct.productDescription,
        productImage: currentProduct.productImage,
        productDiscount: currentProduct.productDiscount || "null",
        productCategory: currentProduct.productCategory,
        productRating: currentProduct.productRating,
        price: currentProduct.price,
        userId: currentUser.uid,
        });
        setLocalCart(prevCart => [...prevCart, currentProduct]);
        toast.success('New item added to your cart', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
    }
    };
    // Add to favorites
    useEffect(() => {
    const db = getDatabase();
    const favRef = ref(db, 'Favorite/');
    onValue(favRef, (snapshot) => {
        const userCart = Object.values(snapshot.val()).filter(
        item => item.userId === currentUser.uid
        );
        setLocalCart(userCart); 
    });
    }, []);
    const handleAddToFav = (currentProduct) => {
    if (currentUser == null) {
        toast.error('User not logged in', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
        return;
    }
    const alreadyInFavorites = localFavorites.some(item => item.productId === currentProduct.productId);
    if (alreadyInFavorites) {
        toast.error('You already added this to your favorites', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
    } else {
        // Add product to Firebase favorites and update localFavorites state
        const db = getDatabase();
        set(push(ref(db, 'Favorite/')), {
        productId: currentProduct.productId,
        productName: currentProduct.productName,
        productDescription: currentProduct.productDescription,
        productImage: currentProduct.productImage,
        productDiscount: currentProduct.productDiscount && "null",
        productCategory: currentProduct.productCategory,
        productRating: currentProduct.productRating,
        price: currentProduct.price,
        userId: currentUser.uid,
        });
        setLocalFavorites(prevFavorites => [...prevFavorites, currentProduct]);
        toast.success('New item added to your favorites', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
    }
    };
  return (
    <Link onClick={() => handleProduct(item)} to={"/product"}>
        <div className="product-card">
            {item.productDiscount && (
                <div className="offerTag">
                    <span>{item.productDiscount}</span>
                </div>
            )}
            <div className="product-img">
                <div className="round"></div>
                <img src={item.productImage} alt="category" />
            </div>
            <div className="product-body">
                <h2>{item.productName}</h2>
                <p>{item.productDescription}</p>
                <h3>{item.price}$</h3>
                <div className="flex gap-[5px] singleProductBtnGroup">
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(item); }}><FaPlus /> Add to Cart</button>
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToFav(item); }} className="!p-[10px]"><FaHeart /></button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default SingleProduct