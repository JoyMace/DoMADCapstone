import React from 'react';
import './Blogs.css';
import blogimage from '../../images/boulder_image.jpg';
import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { FaCaretDown } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

function Blogs() {
    return (
        <div className="blogs">
            <div className="page-info">
                <p>View Donation Stories by country or scroll down to see the most recent posts. All stories are sorted by country and then by date with most recent stories appearing first. Click on the name of a continent to see where DoMAD users have been!</p>
            </div>
            <div className="country-button-container">
                <IconContext.Provider value={{ className: "global-class-name", style: { verticalAlign: "middle" } }}>
                    <li className='dropdown'>
                        <button href="javascript:void(0)" className="country-buttons">
                            Africa  <FaCaretDown />
                        </button>
                        <div className="dropdown-content">
                            <a href="/about">Country 1</a>
                            <a href="/account">Country 2</a>
                            <a href="/blogs">Country 3</a>
                        </div>
                    </li>
                    <button className="country-buttons">Africa <FaCaretDown /></button>
                    <button className="country-buttons">Asia <FaCaretDown /></button>
                    <button className="country-buttons">Australia <FaCaretDown /></button>
                    <button className="country-buttons">North America <FaCaretDown /></button>
                    <button className="country-buttons">South America <FaCaretDown /></button>
                    <button className="country-buttons">Europe <FaCaretDown /></button>
                </IconContext.Provider>
            </div>
            <div className="blog-container">
                <div className="blog-entry">
                    <div className="top-image">
                        <img src={ blogimage } alt="boulder" />
                    </div>
                    <div className="bottom-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <div className="star-rating">
                            <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}>
                                <div>
                                    <p>Rating: <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalf /></p>
                                </div>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
                <div className="blog-entry">
                <div className="top-image">
                        <img src={ blogimage } alt="boulder" />
                    </div>
                    <div className="bottom-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <div className="star-rating">
                            <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}>
                                <div>
                                    <p>Rating: <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalf /></p>
                                </div>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
                <div className="blog-entry">
                <div className="top-image">
                        <img src={ blogimage } alt="boulder" />
                    </div>
                    <div className="bottom-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <div className="star-rating">
                            <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}>
                                <div>
                                    <p>Rating: <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalf /></p>
                                </div>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
                <div className="blog-entry">
                <div className="top-image">
                        <img src={ blogimage } alt="boulder" />
                    </div>
                    <div className="bottom-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <div className="star-rating">
                            <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}>
                                <div>
                                    <p>Rating: <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalf /></p>
                                </div>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
                <div className="blog-entry">
                <div className="top-image">
                        <img src={ blogimage } alt="boulder" />
                    </div>
                    <div className="bottom-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <div className="star-rating">
                            <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}>
                                <div>
                                    <p>Rating: <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalf /></p>
                                </div>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-buttons">
                <IconContext.Provider value={{ className: "global-class-name", style: { verticalAlign: "middle" } }}>
                    <button className="country-buttons">Next Page <FaArrowRight /></button>
                </IconContext.Provider>
                <p>Page 1/15</p>
            </div>
        </div>
    )
}

export default Blogs;