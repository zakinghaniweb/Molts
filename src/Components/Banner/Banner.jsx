import React from 'react'
import './Banner.css'
import { Link } from 'react-router-dom'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaTruckFast } from 'react-icons/fa6';
import { IoMdTimer } from 'react-icons/io';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { offerFilter } from '../../slice/offerFilterSlice';
import { useDispatch } from 'react-redux';
import { productFilter } from '../../slice/productfiterSlice';

const Banner = () => {
    const dispatch = useDispatch()
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed: 3000
      };
  return (
    <section id='banner'>
            <div className="banner-row flex justify-center gap-[20px]">
                <div className="banner-slider">
                    <Slider {...settings}>
                        <Link onClick={()=>dispatch(offerFilter("Black Friday"))} to={"/offer"} className='inline-block'>
                            <div className="banner-single-slide">
                            </div>
                        </Link>
                        <Link onClick={()=>dispatch(offerFilter("Christmas"))} to={"/offer"} className='inline-block'>
                            <div className="banner-single-slide slide-2">
                            </div>
                        </Link>
                        <Link onClick={()=>dispatch(offerFilter("Eid ul Fitr"))} to={"/offer"} className='inline-block'>
                            <div className="banner-single-slide slide-3">
                            </div>
                        </Link>
                    </Slider>
                </div>
                <div className="banner-image">
                    <Link to={"/category"} onClick={()=>dispatch(productFilter("Cars"))}>
                        <div className="banner-single-slide2">
                        </div>
                    </Link>
                </div>
            </div>
            <div className="service">
                <div className="container">
                    <div className="service-row">
                        <div className="service-card">
                            <div className="service-head">
                                <FaTruckFast className='!text-[40px] !text-[#333333]' />
                                <h2>Fast delevery</h2>
                            </div>
                            <p>We provide fast delevery ussually around 30 min</p>
                        </div>
                        <div className="service-card">
                            <div className="service-head">
                                <IoMdTimer className='!text-[40px] !text-[#333333]' />
                                <h2>24/7 support</h2>
                            </div>
                            <p>24/7 online support, buy our products from anywhere, anytime.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-head">
                                <RiSecurePaymentLine className='!text-[40px] !text-[#333333]' />
                                <h2>Secure Payment</h2>
                            </div>
                            <p>We provide a secure payment to the buyers</p>
                        </div>
                    </div>
                </div>
            </div>
    </section>
  )
}

export default Banner