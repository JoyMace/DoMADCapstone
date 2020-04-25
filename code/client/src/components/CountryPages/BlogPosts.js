import React from 'react';
import './BlogPosts.css';

import blogimage from '../../images/boulder_image.jpg';

import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
import { IconContext } from "react-icons";

class BlogPosts extends React.Component {
    constructor(props) {
        super(props);
        
        this.base_path_BL = "/api/user/trip/all-trips?country="
        this.getBlogs = this.getBlogs.bind(this);
    }

    getBlogs = async (country) => {
        let ping_blogs = this.base_path_BL + country;
        const response = await fetch(ping_blogs);
        const data = await response.json();

        if (response.status !== 200) {
            throw Error(data.message);
        } 
        else {
            //this.callbackJSON = data.countryInfoData;
            console.log('received blogs.')
            console.log(data);
            
            // FILL DATA
            /*this.setState({ });*/
            return;
        }
    }

    render() {
        return (
        <div className="blogposts">
            <div className="country-blog-container">
                <div className="country-blog-entry">
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
        </div>
        )
    }

}

export default BlogPosts;