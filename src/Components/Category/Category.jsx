import React from 'react'
import './Category.css'
import { Link } from 'react-router-dom'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from 'react-redux';
import { productFilter } from '../../slice/productfiterSlice';

const Category = () => {
    const dispatch = useDispatch()
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        }
        ]
    };
return (
    <section id='category'>
        <div className="container">
            <div className="common-heading">
                <h2><span>Trending</span> Categories</h2>
            </div>
            <div className="category-row">
                <Slider {...settings}>
                    <Link to={"/category"} onClick={()=>dispatch(productFilter("Clothing"))} className='category-wrap'>
                        <div className="category-card">
                            <div className="category-overlay">
                                <Link to={"/category"} onClick={()=>dispatch(productFilter("Clothing"))}>T-shirt</Link>
                            </div>
                            <div className="round"></div>
                            <img src="images/category1.png" alt="category" />
                        </div>
                    </Link>
                    <Link to={"/category"} onClick={()=>dispatch(productFilter("Electronic"))} className='category-wrap'>
                        <div className="category-card">
                            <div className="category-overlay">
                                <Link to={"/category"} onClick={()=>dispatch(productFilter("Electronic"))}>Electronics</Link>
                            </div>
                            <img src="images/category2.png" alt="category" />
                            <div className="round"></div>
                        </div>
                    </Link>
                    <Link to={"/category"} onClick={()=>dispatch(productFilter("Beauty"))} className='category-wrap'>
                        <div className="category-card">
                            <div className="category-overlay">
                                <Link to={"/category"} onClick={()=>dispatch(productFilter("Beauty"))}>Beauty</Link>
                            </div>
                            <img src="images/category3.png" alt="category" />
                            <div className="round"></div>
                        </div>
                    </Link>
                    <Link to={"/category"} onClick={()=>dispatch(productFilter("Furnitures"))} className='category-wrap'>
                        <div className="category-card">
                            <div className="category-overlay">
                                <Link to={"/category"} onClick={()=>dispatch(productFilter("Furnitures"))}>Furnitures</Link>
                            </div>
                            <img src="images/category4.png" alt="category" />
                            <div className="round"></div>
                        </div>
                    </Link>
                    <Link to={"/category"} onClick={()=>dispatch(productFilter("Cars"))} className='category-wrap'>
                        <div className="category-card">
                            <div className="category-overlay">
                                <Link to={"/category"} onClick={()=>dispatch(productFilter("Cars"))}>Cars</Link>
                            </div>
                            <img src="images/category5.png" alt="category" />
                            <div className="round"></div>
                        </div>
                    </Link>
                </Slider>
            </div>
        </div>
    </section>
  )
}

export default Category