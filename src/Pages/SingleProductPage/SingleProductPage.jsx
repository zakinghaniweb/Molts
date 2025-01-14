import React, { useEffect, useState } from 'react'
import './SingleProductPage.css'
import { TiStarFullOutline } from "react-icons/ti";
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { FiShoppingCart } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Viewer from "react-viewer";
import { FaHeart, FaRegStar, FaShoppingCart, FaStar } from 'react-icons/fa';
import { Slide, toast } from 'react-toastify';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';



const SingleProduct = ({item}) => {
    console.log(item)
    window.scrollTo(0, 0);
    const [visible, setVisible] = useState(false);
    // =========== viewer plugin vari
    const [zoomStyle, setZoomStyle] = useState({});
    const [localCart, setLocalCart] = useState([]);
    const [localFavorites, setLocalFavorites] = useState([]);
    // ========================== Redux variables
    const currentUser = useSelector((state)=>state.currentUser.value)
    const searchProduct  = useSelector(state=>state.search.value)
    const showProduct = useSelector(state=>state.currentProduct?.value)
    //  ============== Functions
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i} />);
        } else {
            stars.push(<FaRegStar key={i} />);
        }
        }
        return stars;
    };
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
    <section id='singleProductPage'>
        <div className="container">
            <div className="mainProduct_row">
                {
                item?item.productDiscount:showProduct?.productDiscount&&
                <div className="offerTag">
                    <span>{item?item.productDiscount:showProduct?.productDiscount}</span>
                </div>
                }
                <div className="product_image">
                    <div className="cover flex justify-center">
                            <img
                                src={item?item.productImage:showProduct?.productImage}
                                alt="Zoomable"
                                onClick={()=>setVisible(true)}
                                style={{cursor: "pointer", maxWidth: "100%", maxHeight: "100%"}}
                                className='hover:scale-[103%] transition-all'
                            />
                            <Viewer
                                visible={visible}
                                onClose={()=>setVisible(false)}
                                images={[{ src: item?item.productImage:showProduct?.productImage, alt: "Zoomed" }]}
                                zoomable
                            />
                    </div>
                </div>
                <div className="product_text">
                    <div className="title">
                        <h1>{item?item.productName:showProduct?.productName}</h1>
                        <div className="review">
                            {renderStars(item?item.productName:showProduct?.productRating)}
                        </div>
                        <h2 className="price">
                        {item?item.price:showProduct?.price}$
                        </h2>
                    </div>
                    <p className="descripttion">
                    {item?item.productDescription:showProduct?.productDescription}
                    </p>
                    <div className="line"/>
                    <div className="product_buttons">
                        <button className='buy'>Buy Now</button>
                        <button className="single_button" onClick={()=>handleAddToFav(showProduct)}>
                            <FaHeart />
                        </button>
                        <button className="single_button" onClick={()=>handleAddToCart(showProduct)}>
                            <FaShoppingCart />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SingleProduct