import React, { useEffect, useState } from 'react'
import './OffersPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus, FaSitemap } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { offerFilter } from '../../slice/offerFilterSlice'
import SingleProduct from '../../Components/SingleProduct/SingleProduct'

const Offers = () => {
    const offersFilter = useSelector((state)=>state.currentOfferFilter.value)
    const dispatch = useDispatch()
    const [productData,setProductData] = useState([])
    const options = document.querySelectorAll(".offerSelect option")
    useEffect(()=>{
        fetch('https://api.jsonbin.io/v3/b/677d420aad19ca34f8e7076f')
            .then(response => response.json())
            .then((json) => {
                const filteredProducts =
                offersFilter == "null"
                    ? json.record.filter(
                        (product) => product.productDiscount !== null
                    )
                    : json.record.filter(
                        (product) => product.productDiscount === offersFilter
                    );
                setProductData(filteredProducts);
            })
    },[offersFilter])
    const handleSelect = (e)=>{
        dispatch(offerFilter(e.target.value))
    }
    useEffect(()=>{      
        if (offersFilter != "null") {
        options.forEach((item)=>{
            if (item.value == offersFilter) {
            item.setAttribute("selected","selected")
            }
            else{
            item.removeAttribute("selected","selected")
            }
        })
        }
    },[offersFilter,options])
    window.scrollTo(0, 0)
  return (
    <div>
        <div className="container">
            <div className="offer-heading flex justify-between items-center">
                <h1>Discount <span>Items <FaSitemap className='inline' /></span></h1>
                <select className='offerSelect' onChange={handleSelect}>
                    <option value="null">All</option>
                    <option value="Christmas">Christmas</option>
                    <option value="Black Friday">Black Friday</option>
                    <option value="Eid ul Fitr">Eid ul Fitr</option>
                </select>
            </div>
            <div className="offer-row flex justify-center gap-[30px] flex-wrap">
                {
                productData.map((item)=>(
                    <SingleProduct item={item}/>
                ))
                }
            </div>
        </div>
    </div>
  )
}

export default Offers