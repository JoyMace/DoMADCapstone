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
                    <div className="top-buttons-blog">
                        <li className="dropdown-africa">
                            <button href="javascript:void(0)" className="country-buttons">Africa<FaCaretDown /></button>
                            <div className="dropdown-content-africa">
                                <a href="/#country1">Country 1</a>
                                <a href="/#country2">Country 2</a>
                                <a href="/#country3">Country 3</a>
                            </div>
                        </li>
                        <li className="dropdown-asia">
                            <button href="javascript:void(0)" className="country-buttons">Asia<FaCaretDown /></button>
                            <div className="dropdown-content-asia">
                                <a href="/#country1">Country 1</a>
                                <a href="/#country2">Country 2</a>
                                <a href="/#country3">Country 3</a>
                            </div>
                        </li>
                        <li className="dropdown-australia">
                            <button href="javascript:void(0)" className="country-buttons">Australia<FaCaretDown /></button>
                            <div className="dropdown-content-australia">
                                <a href="/#country1">Country 1</a>
                                <a href="/#country2">Country 2</a>
                                <a href="/#country3">Country 3</a>
                            </div>
                        </li>
                    </div>
                    <div className="bottom-buttons-blog">
                        <li className="dropdown-europe">
                            <button href="javascript:void(0)" className="country-buttons">Europe<FaCaretDown /></button>
                            <div className="dropdown-content-europe">
                                <a href="/#country1">Country 1</a>
                                <a href="/#country2">Country 2</a>
                                <a href="/#country3">Country 3</a>
                            </div>
                        </li>
                        <li className="dropdown-north">
                            <button href="javascript:void(0)" className="country-buttons">North America<FaCaretDown /></button>
                            <div className="dropdown-content-north">
                                <a href="/#country1">Country 1</a>
                                <a href="/#country2">Country 2</a>
                                <a href="/#country3">Country 3</a>
                            </div>
                        </li>
                        <li className="dropdown-south">
                            <button href="javascript:void(0)" className="country-buttons">South America<FaCaretDown /></button>
                            <div className="dropdown-content-south">
                                <a href="/#country1">Country 1</a>
                                <a href="/#country2">Country 2</a>
                                <a href="/#country3">Country 3</a>
                            </div>
                        </li>
                    </div>
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