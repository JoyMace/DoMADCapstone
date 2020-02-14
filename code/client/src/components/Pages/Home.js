import React from 'react';
import './Home.css'
import bg from '../../images/home-filler-girl_running.jpg';
import bg_alt from '../../images/home-filler-inspire.jpg';
import logo_wh from '../../images/WhiteDOMADlogo.svg';
import logo_bl from '../../images/DoMADLogoDark.svg';

import dons from '../../images/home-filler-volunteers.jpg';

function Home() {
    return (

    <div className="home">

        <div className='top-container'>
            <img id='bg_img' src={bg} alt={bg_alt} />

            <StickyNavbar className="navbar-wrapper">
                <div className='nav-list'>
                    <li className='dropdown'>
                        <a href="javascript:void(0)" className="DD-btn">Get Started</a>
                        <div className="dropdown-content">
                            <a href="/about">Explore</a>
                            <a href="#share">Share A Trip</a>
                            <a href="/blogs">Go to Blogs</a>
                        </div>
                    </li>
                    <li className='dropdown'>
                        <a href="/login" className='DD-btn'>Log in</a>
                        <div id='signup-dd' className="dropdown-content">
                            <a  href="/register">No account? Create one!</a>
                        </div>
                    </li>
                    <li className='dropdown'>
                        <a href="javascript:void(0)" className="DD-btn">Learn More</a>
                        <div className="dropdown-content">
                            <a href="/about">Our Mission</a>
                            <a href="/contact">Contact Us</a>
                            <a href="/faq">FAQ</a>
                            <a href="/disclaimer">Disclaimer</a>
                        </div>
                    </li>
                </div>
            </StickyNavbar>
        
            <div className="block-wrapper">
                <img id="block-logo" src={logo_wh} alt={logo_bl} />
                <h2>Donations Make a Difference</h2><br/>

                <div className='block-content'>
                    <div id='exp'>
                        <a href="/search_locations">Explore</a>
                    </div>
                    <div id='blog'>
                        <a href="/blogs">Blogs</a>
                    </div>
                </div>
            </div>
        </div>

        <div className='steps-wrapper'>
            <h4 className='spacer-caption'>
                Empowering Global Travelers To Make A Difference Locally
            </h4>

            <div className='steps-container'>
                <div className="step-entry">
                    <div className='top-util'>
                        <h2>1</h2>
                    </div>
                    <hr/>
                    <div className='bottom-content'>
                        <p>
                            Reference our interactive and localized database to 
                            gather information about your destination as we.
                            Discover <i>what, how, and where </i> to make your donation.
                        </p>
                    </div>
                </div>
                <div className="step-entry">
                    <div className='top-util'>
                        <h2>2</h2>
                    </div>
                    <hr/>
                    <div className='bottom-content'>
                        <p>Pack a few items to be donated, then DONATE!</p>
                    </div>
                </div>
                <div className="step-entry">
                    <div className='top-util'>
                        <h2>3</h2>
                    </div>
                    <hr/>
                    <div className='bottom-content'>
                        <p>
                            Inspire others by sharing content and experiences, commending
                            other's <i>NoMAD's</i>, and providing useful information
                        </p>
                    </div>
                </div>
            </div>
            <div className="spacer-caption">
                <h4>Click <a id='learn_more' href='/About'>Here</a> to learn more.</h4>
                <br/>
                <hr style={{width: '70%', margin:'0px 15%'}}/>
            </div>
        </div>

        <div className='donations-wrapper'>
            <h2>Recent Donation Trips</h2>
            <div className="slides-container">
                <div className="slide-entry">
                    <div className="top-image">
                        <img src={ dons } alt="boulder" />
                    </div>
                    <div className="bottom-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <p>Rating: </p>
                    </div>
                </div>
                <div className="slide-entry">
                <div className="top-image">
                        <img src={ dons } alt="boulder" />
                    </div>
                    <div className="bottom-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <p>Rating: </p>
                    </div>
                </div>
                <div className="slide-entry">
                <div className="top-image">
                        <img src={ dons } alt="boulder" />
                    </div>
                    <div className="bottom-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <p>Rating: </p>
                    </div>
                </div>
            </div>
        </div>

        <div className='pre_footer-container'>
            <h4>Something unclear? Checkout our <a href='/faq'>FAQ</a> page</h4>
        </div>
    </div>
    )
}

/* Sets an Observer on the top-container for viewport visibility*/
function StickyNavbar({ children, sticky=false, className, ...rest }){
    const [isSticky, setIsSticky] = React.useState(false);
    const ref = React.createRef();
    
    // mount observer
    React.useEffect(() => {
        const cachedRef = ref.current, 
                observer = new IntersectionObserver(
                    ([e]) => setIsSticky(e.intersectionRatio < 1), {threshold: [1]} 
                );
        observer.observe(cachedRef);
      
        // unmount
        return function(){ observer.unobserve(cachedRef); }
    }, [])
    
  return (
        <div className={className + (isSticky ? " isSticky" : "")} ref={ref} {...rest}>
            {children}
        </div>
    )
}

export default Home;