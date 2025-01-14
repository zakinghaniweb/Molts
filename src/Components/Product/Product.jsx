import React, { useEffect, useState } from 'react'
import './Product.css'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { productData } from '../../slice/productSlice'
import SingleProduct from '../SingleProduct/SingleProduct'

const Product = () => {
  // ========================= API
  const [productData,setProductData] = useState([])
  const [visibleProduct, setVisibleProduct] = useState(20);
  const [allProductCount, setAllProductCount] = useState();
  console.log(allProductCount)
  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/677d420aad19ca34f8e7076f")
      .then((response) => response.json())
      .then((json) => {
        setProductData(json.record.slice(0, visibleProduct));
        setAllProductCount(json.record.length);
      })
  }, [visibleProduct]);


  return (
    <section id='product'>
        <div className="container">
            <div className="common-heading">
                <h2>Our Latest <span>Products</span></h2>
            </div>
            <div className="product-row">
              {
                productData.map((item)=>(
                  <SingleProduct key={item.productId} item={item} />
                ))
              }
            </div>
            {
              visibleProduct <= allProductCount&&
              <button onClick={()=>setVisibleProduct((prev)=>prev+10)} className='loadMore'>See More</button>
            }
        </div>
    </section>
  )
}
export default Product