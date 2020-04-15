import React from 'react';
import './Home.css'
import bg from '../../images/home-filler-girl_running.jpg';
import bg_alt from '../../images/home-filler-inspire.jpg';
import logo_wh from '../../images/CompleteDoMADLogo.svg';
import logo_bl from '../../images/DoMADLogoDark.svg';
import StepsGraphic from '../../images/123DoMADGraphic.png';

import { FaStar } from 'react-icons/fa';
import { IconContext } from "react-icons";


import dons from '../../images/home-filler-volunteers.jpg';

class HomeBlogInfo extends React.Component {
    constructor(props) {
		super(props)

        var tripInfo = this.props.tripInfo;

        this.state = {
            city: tripInfo.locationID.city,
            country: tripInfo.locationID.country,
            donationItem: tripInfo.donations[0].itemName,
            donationRating: tripInfo.donations[0].rating,
            privatePost: tripInfo.isPrivate
        }
    }

	render() {
		return <HomeBlogEntry homeblog={this.state} />
	}
}

function HomeBlogEntry(props) {
    var star_amount;
    if(props.homeblog.donationRating == 1) {
        star_amount = <div><FaStar /></div>
    }
    else if(props.homeblog.donationRating == 2) {
        star_amount = <div><FaStar /> <FaStar /></div>
    }
    else if(props.homeblog.donationRating == 3) {
        star_amount = <div><FaStar /> <FaStar /> <FaStar /></div>
    }
    else if(props.homeblog.donationRating == 4) {
        star_amount = <div><FaStar /> <FaStar /> <FaStar /> <FaStar /></div>
    }
    else if(props.homeblog.donationRating == 5) {
        star_amount = <div><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></div>
    }

    return (
        <div className="slides-container">
            <div className="slide-entry">
                <div className="top-image">
                    <img src={ dons } alt="boulder" />
                </div>
                <div className="donation-content">
                    <div className="blog-same-line">
                        <h4>Location: </h4>
                        {props.homeblog.country}
                    </div>
                    <div className="blog-same-line">
                        <h4>Donation Item: </h4>
                        {props.homeblog.donationItem}
                    </div>
                    <div className="star-blog-rating">
                        <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}>
                            <div className="star-blog-rating">
                                <h4>Rating: </h4>
                                {star_amount}
                            </div>
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
        </div>
    );
}

class HomeBlogContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            loading: 'true', reloadAccount: this.reload
        };
    }

    reload = () => {
        console.log('READLOAD');
        this.setState({ loading: 'true', reloadAccount: this.reload });
        this.getTrips(this).
          then(res => {
            this.setState({
              trips: res,
              loading: 'false',
              reloadAccount: this.reload
            });
          });
      }

    getTrips = async () => {        
        const response = await fetch('/api/user/trip/all-trips');
        const data = await response.json();
        if (response.status != 200) {
            throw Error(response.message)
        }
        return data;
    };
    
    componentDidMount() {
        this.getTrips(this).
        then(res => {
            this.setState({
                trips: res,
                loading: 'false',
                reloadAccount: this.reload
            });
        })
      .catch(err => console.log(err)); // TODO: handle all errors and relay to user
    }

	render() {
        if(this.state.loading == 'false'){
            return <Home homeblog={this.state} />
        }
        return (
            <div>
                <Home homeblog={this.state} />
            </div>
        )
	}
}

function Home(props) {

    var trips = <div></div>

    if(props.homeblog.loading == "false"){
        var tripData = props.homeblog.trips.trips;

        var trips = tripData.map(trip => {
        return <div className='blog-container-wrapper'>
            <HomeBlogInfo tripInfo={trip} />
        </div>
        });

        trips = <div className="blog-trips-container">
            {trips.reverse().slice(0,3)}
        </div>
    }

    return (
        <div className="home">
            <StickyContainer className='top-container'>
                <img id='bg_img' src={bg} alt={bg_alt} />
                <div className="navbar-wrapper">
                    <ul className='nav-list'>
                        <li className='dropdown'>
                        </li>
                        <li className='dropdown'>
                            <a id='ham-btn' href="javascript:void(0)" className="DD-btn">
                                Log In  <i className="down-up-arrow"></i>
                            </a>
                            <div className="dropdown-content">
                                <a href="/login">Log In</a>
                                <a href="/register">Register</a>
                            </div>
                        </li>
                        <li className='dropdown'>
                            <a id='ham-btn' href="javascript:void(0)" className="DD-btn">
                                Info  <i className="down-up-arrow"></i>
                            </a>
                            <div className="dropdown-content">
                                <a href="/how_it_works">How It Works</a>
                                <a href="/about">About Us</a>
                                <a href="/faq">FAQ</a>
                                <a href="/contact">Contact Us</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="block-wrapper">
                    <div>
                        <img id='block-logo' src={logo_wh} alt={logo_bl} />
                    </div>
                    <div id='block-content'>
                        <div id='exp' className='block-box'>
                            <a href="/search_locations">Explore</a>
                        </div>
                        <div id='blog' className='block-box'>
                            <a href="/blogs">Blogs</a>
                        </div>
                    </div>
                </div>
            </StickyContainer>
            <article className='steps-wrapper'>
                <h4 className='spacer-caption'>
                    Empowering Global Travelers To Make A Difference Locally
                </h4>
                <div className='all-steps-container'>
                    <img className='steps-graphic' src={StepsGraphic} alt="Steps to donate" />
                </div>
                <h4 className='spacer-caption'>
                    Click <a className='text-hyperl' href='/how_it_works'>here</a> to learn more.
                </h4>
                <hr style={{width: '70%', margin:'0px 15%'}}/>
            </article>
            <article className='donations-wrapper'>
                <h2>Recent Donations</h2>
                {trips}
            </article>
        </div>
    );
}

/* Sets an Observer on the  for viewport visibility*/
function StickyContainer({ children, sticky=false, className, ...rest }){
    const [isSticky, setIsSticky] = React.useState(false);
    const ref = React.createRef();
    
    // mount observer
    React.useEffect(() => {
        const cachedRef = ref.current, 
                observer = new IntersectionObserver(
                    ([e]) => setIsSticky(e.intersectionRatio < 0.1), {
                        threshold: [0.1]
                    } 
                );
        observer.observe(cachedRef);
      
        // unmount
        return function(){ observer.unobserve(cachedRef); }
    }, [])
    
    return (
        <div className={className + (isSticky ? " isSticky" : "")} ref={ref} {...rest}>
            {children}
        </div>
    );
}

export default HomeBlogContainer;