import React from 'react';
import './BlogPosts.css';

import defaultblogimage from '../../images/png_icons/comingSoonIcon.svg';

import { FaStar } from 'react-icons/fa';
import { IconContext } from "react-icons";

class CountryBlogInfo extends React.Component { // this is what pull the back end trip info and assigns it to variables set in the state
    constructor(props) {
		super(props)

        var tripInfo = this.props.tripInfo;
        var tripDate = new Date(tripInfo.tripDate);

        this.state = {
            city: tripInfo.locationID.city,
            country: tripInfo.locationID.country,
            tripDate: (tripDate.getMonth() + 1) + "/" +  tripDate.getDate() + "/" +  tripDate.getFullYear(),
            notes: tripInfo.notes,
            donationItem: tripInfo.donations ? tripInfo.donations[0].itemName : "None",
	        donationRating: tripInfo.donations ? tripInfo.donations[0].rating : "None",
            privatePost: tripInfo.isPrivate
        }
    }

	render() {
        console.log("This function is called");
		return <CountryBlogEntry blog={this.state} /> // the state with all back end info is returned to the function CountryBlogEntry so it can be shown on the page
	}
}

function CountryBlogEntry(props) { // need to take in props in order to pull from class BlogInfo
    console.log("This function is being called");
    var star_amount; // star amount is the amount of stars shown for the donation rating based on the rating pulled from the back end
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
        <div className="blogposts">
            <div className="country-blog-container">
                <div className="country-blog-entry">
                    <div className="top-image">
                        <img src={ defaultblogimage } alt="icon of person donating something" />
                    </div>
                    <div className="bottom-content">
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
        </div>
    );
}

class BlogPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: 'true', reloadAccount: this.reload // loading is used to know when to reload the page after changes have been made
        };
        this.base_path_BL = '/api/user/trip/all-trips?country='
        this.getBlogs = this.getBlogs.bind(this);
    }

    componentWillReceiveProps() {
        
    }

    reload = () => { // this function is used to reload the information needed
        this.setState({ loading: 'true', reloadAccount: this.reload });
        this.getBlogs(this) // reload calls getTrips so that the function can call the api again after loading
          .then(res => {
            this.setState({
              trips: res,
              loading: 'false',
              reloadAccount: this.reload
            });
          });
      }

    getBlogs = async (country) => {
        let ping_blogs = this.base_path_BL + country;
        console.log("This is the api call: ", ping_blogs);
        const response = await fetch(ping_blogs);
        console.log("response: ", response);
        const data = await response.json();
        console.log("This is the blog data", data)
        if (response.status !== 200) {
            throw Error(data.message);
        }
        return data;
    }

    componentDidMount() {
        this.getBlogs(this)
        .then(res => {
            this.setState({
                trips: res,
                loading: 'false',
                reloadAccount: this.reload
            });
        })
      .catch(err => console.log(err)); // TODO: handle all errors and relay to user
    }

    render() {
        if(this.state.loading === 'false') {
            return (
                <div>
                    <p>These are the blogs: </p>
                    <CountryBlogs blog={this.state} />
                </div>
            )
        }
        return (
            <div>
                <p>These are the blogs: </p>
                <CountryBlogs blog={this.state} />
            </div>
        )
    }
}

function CountryBlogs(props) { // function to take back end data and display it

    var trips = <div></div>

    console.log("This function CountryBlogs is called");

    console.log("These are the trips", trips);

    if(props.blog.loading === "false"){
        var tripData = props.blog.trips.trips;
        console.log("Trip data: ", tripData)

        trips = tripData.map(trip => {
        return <div className='blog-container-wrapper'>
            <CountryBlogInfo tripInfo={trip} />
        </div>
        });
        trips = <div className="blog-trips-container">
            {trips.reverse()} {/* trips needs to be displayed in reverse order to show newest to oldest */}
        </div>
        console.log("trips: ", trips);
    }

    return (
        <div className="blogs">
            {trips}
        </div>
    );
}

export default BlogPosts;