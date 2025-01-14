import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagramSquare, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
        <div className="container">
            <div className="footer_row row1">
                <div className="footer_logo">
                    <img src="images/logo.png" alt="" />
                </div>
                <div className="footer_text1">
                    <p>This is a E-commerce website made by Zakin Ghani and Raiyaan Hossain. Spacial thanks to Nahid Hasan.</p>
                </div>
            </div>
        </div>
        <div className="line1"/>
        <div className="container">
            <div className="footer_row row2">
                <div className="singleDrop">
                    <h2>Product</h2>
                    <ul>
                        <li><Link to={''}>Features</Link></li>
                        <li><Link to={''}>Pricing</Link></li>
                        <li><Link to={''}>Case studies</Link></li>
                        <li><Link to={''}>Reviews</Link></li>
                        <li><Link to={''}>Updates</Link></li>
                    </ul>
                </div>
                <div className="singleDrop">
                    <h2>Company</h2>
                    <ul>
                        <li><Link to={''}>About</Link></li>
                        <li><Link to={''}>Contact us</Link></li>
                        <li><Link to={''}>Careers</Link></li>
                        <li><Link to={''}>Culture</Link></li>
                        <li><Link to={''}>Blog</Link></li>
                    </ul>
                </div>
                <div className="singleDrop">
                    <h2>Support</h2>
                    <ul>
                        <li><Link to={''}>Getting started</Link></li>
                        <li><Link to={''}>Help center</Link></li>
                        <li><Link to={''}>Server status</Link></li>
                        <li><Link to={''}>Report a bug</Link></li>
                        <li><Link to={''}>Chat support</Link></li>
                    </ul>
                </div>
                <div className="singleDrop">
                    <h2>Downloads</h2>
                    <ul>
                        <li><Link to={''}>iOS</Link></li>
                        <li><Link to={''}>Android</Link></li>
                        <li><Link to={''}>Mac</Link></li>
                        <li><Link to={''}>Windows</Link></li>
                        <li><Link to={''}>Chrome</Link></li>
                    </ul>
                </div>
                <div className="singleDrop">
                    <h2>Subscribe to our newsletter</h2>
                    <div className="dropText">
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam mauris sed ma</p>
                        <input type="email" placeholder='Enter your email' />
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="line1"/>
            <div className="footer_row row3">
                <h3>Copyright © 2025 Molts | All Rights Reserved</h3>
                <div className="footer_buttons">
                    <Link to={''}><FaFacebookF /></Link>
                    <Link to={''}><FaTwitter /></Link>
                    <Link to={''}><FaInstagramSquare /></Link>
                    <Link to={''}><FaLinkedinIn /></Link>
                    <Link to={'https://www.youtube.com/@RevilsOmniverse-g1i'}><FaYoutube /></Link>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer