import React from 'react'
import { useSelector } from 'react-redux'
import './SearchResult.css'
import { Link } from 'react-router-dom'
import { FaPlus, FaSitemap } from 'react-icons/fa'
import SingleProduct from '../../Components/SingleProduct/SingleProduct'

const searchResult = () => {
    const searchProducts = useSelector((state)=>state.currentProduct.value)
    window.scrollTo(0, 0)
  return (
    <div>
        <div className="container">
            <div className="search-heading flex justify-between items-center">
                <h1>Discount <span>Items <FaSitemap className='inline' /></span></h1>
            </div>
            <div className="search-row flex justify-center gap-[30px] flex-wrap">
                {
                searchProducts.map((item)=>(
                    <SingleProduct item={item} />
                ))
                }
            </div>
        </div>
      </div>
  )
}

export default searchResult