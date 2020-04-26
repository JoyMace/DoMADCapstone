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
        
        console.log(props);
        //this.fillBlogs = this.fillBlogs.bind(this);
    }

    componentDidUpdate(props) {
        console.log(this.props.data);
        if (props.data !== null) {
            //console.log(props.data);
            /* populate data here */
        }
    }

    render() {
        return (
            <Blogs tripInfo={this.props.data} loading={false} />
        )
    }

}


class BlogInfo extends React.Component { // this is what pull the back end trip info and assigns it to variables set in the state
    constructor(props) {
		super(props)

        var tripInfo = this.props.tripInfo;
        var tripDate = new Date(tripInfo.tripDate);
        console.log('blog info');
        this.state = {
            city: tripInfo.locationID.city,
            country: tripInfo.locationID.country,
            tripDate: (tripDate.getMonth() + 1) + "/" +  tripDate.getDate() + "/" +  tripDate.getFullYear(),
            notes: tripInfo.notes,
            donationItem: tripInfo.donations ? tripInfo.donations[1].itemName : "None",
	        donationRating: tripInfo.donations ? tripInfo.donations[1].rating : "None",
            privatePost: tripInfo.isPrivate
        }
    }

	render() {
		return <BlogEntry blog={this.state} /> // the state with all back end info is returned to the function BlogEntry so it can be shown on the page
	}
}




/*** ONE BLOG ****/
function BlogEntry(props) { // need to take in props in order to pull from class BlogInfo
    var star_amount; // star amount is the amount of stars shown for the donation rating based on the rating pulled from the back end
    console.log('blog entry');
    if(props.blog.donationRating === 1) {
        star_amount = <div><FaStar /></div> // <FaStar /> is a separate package that is imported into the file in order to use the star icons
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
                    <img src={ defaultblogimage } alt="icon of person donating something" /> {/* default image used for blogs image since currently there is no functionality to upload images*/}
                </div>
                <div className="bottom-blog-content">
                    <div className="blog-same-line">
                        <h4>Location: </h4>
                        {props.blog.country} {/* props is needed in order to pull the data from another class - in this case the class BlogInfo */}
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
                        <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}> {/* this sets styling for the star icons used */}
                            <div className="star-blog-rating">
                                <h4>Rating: </h4>
                                {star_amount} {/* stars are returned in brackets in order to render */}
                            </div>
                        </IconContext.Provider>
                    </div>
                    <h4>Travel Story:</h4>{props.blog.notes}
                </div>
            </div>
        </div>
    );
}

function Blogs(props) { // function to take back end data and display it
    console.log('blogs');
    var trips = <div></div>

    /*if(props.blog.loading === "false"){
        var tripData = props.blog.trips.trips;
        trips = tripData.map(trip => {
        return <div className='blog-container-wrapper'>
            <BlogInfo tripInfo={trip} />
        </div>
        });
        trips = <div className="blog-trips-container">
            {trips.reverse()} {}
        </div>
    }*/

    return (
        <div className="blogs">
            {trips}
        </div>
    );
}

export default BlogPosts;