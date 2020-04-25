import React from 'react';
import './BlogPosts.css';

import blogimage from '../../images/boulder_image.jpg';

import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
import { IconContext } from "react-icons";

class BlogPosts extends React.Component {
    constructor(props) {
        super(props);

        /*trips = tripData.map(trip => {
            return <div className='blog-container-wrapper'>
                <BlogInfo tripInfo={trip} />
            </div>
            });

        this.state = {
            city: tripInfo.locationID.city,
            country: tripInfo.locationID.country,
            tripDate: (tripDate.getMonth() + 1) + "/" +  tripDate.getDate() + "/" +  tripDate.getFullYear(),
            notes: tripInfo.notes,
            donationItem: tripInfo.donations[0].itemName,
            donationRating: tripInfo.donations[0].rating,
            privatePost: tripInfo.isPrivate
        }*/
        
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
            console.log(data);
            
            // FILL DATA
            /*this.setState({ });*/
            return;
        }
    }

    render() {
        return (
            /*if(props.blog.loading === "false"){
                var tripData = props.blog.trips.trips;
        
                trips = tripData.map(trip => {
                return <div className='blog-container-wrapper'>
                    <BlogInfo tripInfo={trip} />
                </div>
                });
        
                trips = <div className="blog-trips-container">
                    {trips.reverse()}
                </div>
            }
        
            return (
                <div className="blogs">
                    {trips}
                </div>*/
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

/*
function BlogEntry(props) {
    var star_amount;
    if(props.blog.donationRating === 1) {
        star_amount = <div><FaStar /></div>
    }
    else if(props.blog.donationRating === 2) {
        star_amount = <div><FaStar /> <FaStar /></div>
    }
    else if(props.blog.donationRating === 3) {
        star_amount = <div><FaStar /> <FaStar /> <FaStar /></div>
    }
    else if(props.blog.donationRating === 4) {
        star_amount = <div><FaStar /> <FaStar /> <FaStar /> <FaStar /></div>
    }
    else if(props.blog.donationRating === 5) {
        star_amount = <div><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></div>
    }

    return (
        <div className="blog-container">
            <div className="blog-entry">
                <div className="top-blog-image">
                    <img src={ defaultblogimage } alt="boulder" />
                </div>
                <div className="bottom-blog-content">
                    <div className="blog-same-line">
                        <h4>Location: </h4>
                        {props.blog.country}
                    </div>
                    <div className="blog-same-line">
                        <h4>Travel Date: </h4>
                        {props.blog.tripDate}
                    </div>
                    <div className="blog-same-line">
                        <h4>Donation Item: </h4>
                        {props.blog.donationItem}
                    </div>
                    <div className="star-blog-rating">
                        <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}>
                            <div className="star-blog-rating">
                                <h4>Rating: </h4>
                                {star_amount}
                            </div>
                        </IconContext.Provider>
                    </div>
                    <h4>Travel Story:</h4>{props.blog.notes}
                </div>
            </div>
        </div>
    );
}
*/

export default BlogPosts;