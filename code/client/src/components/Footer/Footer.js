import React from 'react';
import './Footer.css'
import logo from '../../images/CompleteDoMADLogo.svg';

import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className='footer-wrapper'>
                <div className='wrapper-column'>
                    <ul className='foot-items'>
                        <li><Link to="/search_locations">Explore</Link></li>
                        <li><Link to="/how_it_works">How It Works</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                    </ul>
                </div>
                <div className="logo-wrapper-column">
                    <Link to="/"><img id="link-logo" src={logo} alt="DoMAD Logo" /></Link>
                </div>
                <div className="wrapper-column">
                    <ul className='foot-items'>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/disclaimer">Disclaimer</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;