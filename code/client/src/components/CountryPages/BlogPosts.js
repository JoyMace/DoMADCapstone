import React from 'react';
import './BlogPosts.css';

//import blogimage from '../../images/boulder_image.jpg';
import defaultblogimage from '../../images/png_icons/comingSoonIcon.svg';

import { FaStar } from 'react-icons/fa';
//import { FaStarHalf } from 'react-icons/fa';
import { IconContext } from "react-icons";

class BlogPosts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tripData: ""
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data) {
            if (this.props.data !== null) {
                
                this.setState({
                    tripData: this.props.data                   
                }) 
               console.log("Component did Update: ", this.props.data);
            }
        }
    }

    render() {
        console.log(this.state.tripData);
        return (
            <Blogs blog={this.state.tripData} />
        )
    }

}

function Blogs(props) { // function to take back end data and display it
    var trips = <div></div>
    console.log("this is the data coming into Blogs function: ", props.blog.blogData);
    if(props.blog.loading === "false"){
        var tripData = props.blog.blogData.trips;
        console.log("This is the trips data that will be mapped: ", tripData)
        trips = tripData.map(trip => {
        return  <div className='country-blog-container-wrapper'>
                    <BlogInfo tripInfo={trip} />
                </div>
        });
        //console.log("trips updated: ", trips);
        trips = <div className="country-blog-trips-container">
            {trips.reverse()} {}
        </div>
    }
    return ( console.log("TRIPS: ", trips),
        <div className="blogposts">
            {trips}
        </div>
    );
}

class BlogInfo extends React.Component { // this is what pull the back end trip info and assigns it to variables set in the state
    constructor(props) {
        super(props)
        console.log("This is what is being passed to BlogInfo", props);
        
        var tripDate = new Date(this.props.tripInfo.tripDate);
        tripDate = (tripDate.getMonth() +1) +"/" +tripDate.getDate() + "/" + tripDate.getFullYear();
    }

    /* TO DO STARS AND DATE NOT SHOWING PROPERLY */
	render() {
        var star_amount; // star amount is the amount of stars shown for the donation rating based on the rating pulled from the back end
        if(this.props.tripInfo.donationRating === 1) {
            star_amount = <div><FaStar /></div> // <FaStar /> is a separate package that is imported into the file in order to use the star icons
        }
        else if(this.props.tripInfo.donationRating === 2) {
            star_amount = <div><FaStar /> <FaStar /></div>
        }
        else if(this.props.tripInfo.donationRating === 3) {
            star_amount = <div><FaStar /> <FaStar /> <FaStar /></div>
        }
        else if(this.props.tripInfo.donationRating === 4) {
            star_amount = <div><FaStar /> <FaStar /> <FaStar /> <FaStar /></div>
        }
        else if(this.props.tripInfo.donationRating === 5) {
            star_amount = <div><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></div>
        }

        return (
        <div className="country-blog-container">
            <div className="country-blog-entry">
                <div className="top-image">
                    <img src={ defaultblogimage } alt="icon of person donating something" /> {/* default image used for blogs image since currently there is no functionality to upload images*/}
                </div>
                <div className="bottom-content">
                    <div className="blog-same-line">Location: {this.props.tripInfo.locationID.country} {/* props is needed in order to pull the data from another class - in this case the class BlogInfo */}
                    </div>
                    <div className="blog-same-line">Travel Date: {this.tripDate}</div>
                    <div className="blog-same-line">Donation Item: {( this.props.tripInfo.donations && this.props.tripInfo.donations.length > 1) ? this.props.tripInfo.donations[1].itemName : "None"}</div>
                    <div className="star-rating">
                        <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}> {/* this sets styling for the star icons used */}
                            <div className="star-blog-rating">Rating: {star_amount} {/* stars are returned in brackets in order to render */}
                            </div>
                        </IconContext.Provider>
                    </div>
                    <div className="blog-same-line">Travel Story: </div>
                    {this.props.tripInfo.notes}
                </div>
            </div>
        </div>
    );
	}
}

export default BlogPosts;