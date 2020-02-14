import React from 'react';
import './Footer.css'
import logo from '../../images/WhiteDOMADlogo.svg';

const Footer = () => {
    return (
        <footer>
            <div className='footer-wrapper'>
                <div className='wrapper-column'>
                    <ul className='foot-items'>
                        <li><h4>Discover</h4></li>
                        <li><a href="/search_locations">Explore Locations</a></li>
                        <li><a href="/blogs">Country Blogs</a></li>
                    </ul>
                </div>
                <div className="wrapper-logo">
                    <a href="/"><img id="link-logo" src={logo} alt="" /></a>
                </div>
                <div className="wrapper-column">
                    <ul className='foot-items'>
                        <li><h4>Community</h4></li>
                        <li><a href="/account">Share A Trip</a></li>
                        <li><a href="/account">DoMAD Account</a></li>
                        <li><a href="/Faq">FAQ</a></li>
                    </ul>
                </div>
                <div className="wrapper-column">
                    <ul className='foot-items'>
                        <li><h4>Company</h4></li>
                        <li><a href="/About">About</a></li>
                        <li><a href="/Contact">Contact Us</a></li>
                        <li><a href="/Disclaimer">Disclaimer</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;