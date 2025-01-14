import React from 'react'
import './Offers.css'
import { Link } from 'react-router-dom'
import { FaArrowRightArrowLeft } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { offerFilter } from '../../slice/offerFilterSlice'

const Offers = () => {
    const dispatch = useDispatch()
  return (
    <div className="container mt-[100px] flex flex-col gap-[30px]">
        <div className="offers">
            <div className="round-circle"></div>
            <div className="offers-text">
                <h1>Spacial Offers For <span>Christmas</span></h1>
                <p>Don't miss out your 50% discount on any product you buy in the day of christmas. Use the coupon code NahidHasanJayHo to get above 50% discount on any product.</p>
                <Link onClick={()=>dispatch(offerFilter("Christmas"))} to={"/offer"}>Shop Now <FaArrowRightArrowLeft/></Link>
            </div>
        </div>
        <div className="offers offer2">
            <div className="round-circle"></div>
            <div className="offers-text">
                <h1>Black <span>Friday</span></h1>
                <p>Black Friday is here! 🎉 Shop now and save big with up to 50% OFF on a wide range of items. From must-have gadgets to everyday essentials, find unbeatable deals on your favorites. Don’t wait—these offers are only available for a limited time. 🛒✨</p>
                <Link onClick={()=>dispatch(offerFilter("Black Friday"))} to={"/offer"}>Shop Now <FaArrowRightArrowLeft/></Link>
            </div>
        </div>
        <div className="offers offer3">
            <div className="round-circle"></div>
            <div className="offers-text">
                <h1>Eid Ul <span>Fitr</span></h1>
                <p>Celebrate Eid with joy and amazing offers! 🌙✨ Enjoy exclusive discounts on a wide range of products to make your celebrations even more special. Shop now and share the happiness with loved ones—offers valid for a limited time! 🛍️💫</p>
                <Link onClick={()=>dispatch(offerFilter("Eid ul Fitr"))} to={"/offer"}>Shop Now <FaArrowRightArrowLeft/></Link>
            </div>
        </div>
    </div>
  )
}

export default Offers