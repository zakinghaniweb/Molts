import React, { useEffect, useState } from 'react'
import './Cart.css'
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { IoCartOutline } from 'react-icons/io5'
import { FaMinus, FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
    const currentUser = useSelector((state)=>state.currentUser.value)
    const [cartData,setCartData] = useState([])
    const db = getDatabase();
    useEffect(()=>{
        onValue(ref(db, 'Cart/'), (snapshot) => {
            let array = []
            snapshot.forEach((item)=>{
                if (item.val().userId == currentUser.uid) {
                    array.push({...item.val(),key:item.key,quantity: 1,totalPrice: item.price})
                }
            })
            setCartData(array)
        });
    },[])
    console.log(cartData)
    const handleCartRemove = (currentProduct)=>{
        remove(ref(db, 'Cart/' + currentProduct.key))
    }
    let handleProduct = (item)=>{
        localStorage.setItem('product',JSON.stringify(item))
        dispatcher(productData(item))
    }
    const updateQuantity = (productId, action) => { 
        setCartData(prevCart =>
        prevCart.map(item =>
            item.productId === productId
            ? {
                ...item,
                quantity:
                    action === "increment"
                    ? item.quantity + 1
                    : item.quantity > 1
                    ? item.quantity - 1
                    : 1
                }
            : item
        )
        );
    };
    const calculateTotalPrice = (price, quantity) => {
        return (price * quantity).toFixed(2); // Ensure two decimal places
    };
  return (
    <div>
        <div className="container">
            <div className="cart-heading">
                <h1>Your <span> Shopping Cart <IoCartOutline className='inline' /></span></h1>
            </div>
            <div className="cart-list">
                {
                    cartData.map((item)=>(
                    <div className="single-cart-item" key={item.productId}>
                        {
                            item.productDiscount != "null" &&
                            <div className="cart-discount">
                                <span>{item.productDiscount}</span>
                            </div>
                        }
                        <Link className="cart-image" onClick={() => handleProduct(item)} to={"/product"}>
                            <img src={item.productImage} alt="product" />
                        </Link>
                        <div className="cart-text">
                            <h2>{item.productName}</h2>
                            <p>{item.productDescription}</p>
                        </div>
                        <div className="cart-info">
                            <h2>${calculateTotalPrice(item.price, item.quantity)}</h2>
                            <button className='cart-remove' onClick={()=>handleCartRemove(item)}>Remove <FaRegTrashAlt /></button>
                            <div className="cart-count">
                                <button onClick={()=>updateQuantity(item.productId, "increment")}><FaPlus /></button>
                                <h3>{item.quantity}</h3>
                                <button onClick={()=>updateQuantity(item.productId, "decrement")}><FaMinus /></button>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
            <div className="checkOut">
                
            </div>
        </div>
    </div>
  )
}

export default Cart