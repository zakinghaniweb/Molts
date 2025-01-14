import React, { useEffect, useState } from 'react'
import './Favorite.css'
import { FaMinus, FaPlus, FaRegHeart, FaRegTrashAlt } from 'react-icons/fa'
import { getDatabase, onValue, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'
import { Slide, toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Favorite = () => {
    const currentUser = useSelector((state)=>state.currentUser.value)
    const [cartData,setCartData] = useState([])
    const [toastShown, setToastShown] = useState(false);
    const [localCart, setLocalCart] = useState([]);
    const db = getDatabase();
    useEffect(()=>{
        onValue(ref(db, 'Favorite/'), (snapshot) => {
            let array = []
            snapshot.forEach((item)=>{
                if (item.val().userId == currentUser.uid) {
                    array.push({...item.val(),key:item.key})
                }
            })
            setCartData(array)
        });
    },[])
    const handleFavRemove = (currentProduct)=>{
        remove(ref(db, 'Favorite/' + currentProduct.key))
    }
    let handleProduct = (item)=>{
        localStorage.setItem('product',JSON.stringify(item))
        dispatcher(productData(item))
    }
    useEffect(() => {
        const db = getDatabase();
        const cartRef = ref(db, 'Cart/');
        onValue(cartRef, (snapshot) => {
        if (snapshot.val() != null) {
            setLocalCart(Object.values(snapshot.val()));
        }
        });
    }, []);
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
        set(ref(db, 'Cart/' + currentProduct.productId), {
            productId: currentProduct.productId,
            productName: currentProduct.productName,
            productDescription: currentProduct.productDescription,
            productImage: currentProduct.productImage,
            productDiscount: currentProduct.productDiscount || "null",
            productCategory: currentProduct.productCategory,
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
    window.scrollTo(0, 0)
  return (
    <div>
        <div className="container">
            <div className="favorite-heading">
                <h1>Your <span> Favorite Items <FaRegHeart className='inline' /></span></h1>
            </div>
            <div className="favorite-list">
                {
                    cartData.map((item)=>(
                    <div className="single-favorite-item" key={item.productId}>
                        <Link onClick={() => handleProduct(item)} to={"/product"} className="favorite-image">
                            <img src={item.productImage} alt="" />
                        </Link>
                        <div className="favorite-text">
                            <h2>{item.productName}</h2>
                            <p>{item.productDescription}</p>
                        </div>
                        <div className="favorite-info">
                            <h2>${item.price}</h2>
                            <button className='favorite-remove' onClick={()=>handleFavRemove(item)}>Remove <FaRegTrashAlt /></button>
                            <button onClick={()=>handleAddToCart(item)}>Add To Cart <FaPlus /></button>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Favorite