import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section id='notFound'>
        <div className="container">
            <h1 className='text-center font-bold font-Poppins text-brandColor text-[40px]'>Batpari kom kor</h1>
            <div className="flex justify-center">
                <Link to={"/"} className='font-Poppins text-white text-[20px] bg-brandColor py-[10px] px-[30px]'>Bait ja</Link>
            </div>
        </div>
    </section>
  )
}

export default NotFound