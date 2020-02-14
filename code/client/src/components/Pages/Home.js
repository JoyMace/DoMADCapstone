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

        <StickyContainer className='top-container'>
            <img id='bg_img' src={bg} alt={bg_alt} />

            <div className="navbar-wrapper">
                <ul className='nav-list'>
                    <li className='dropdown'>
                        <a id='ham-btn' href="javascript:void(0)" className="DD-btn">
                            Get Started  <i className="down-up-arrow"></i>
                        </a>
                        <div className="dropdown-content">
                            <a href="/about">Explore</a>
                            <a href="#share">Share A Trip</a>
                            <a href="/blogs">Go to Blogs</a>
                        </div>
                    </li>
                    <li className='dropdown'>
                        <a className='DD-btn' href="/login">
                            Log in
                        </a>
                        <div id='signup-dd' className="dropdown-content">
                            <a  href="/register">No account? Create one!</a>
                        </div>
                    </li>
                    <li className='dropdown'>
                        <a id='ham-btn' href="javascript:void(0)" className="DD-btn">
                            Learn More  <i className="down-up-arrow"></i>
                        </a>
                        <div className="dropdown-content">
                            <a href="/about">Our Mission</a>
                            <a href="/contact">Contact Us</a>
                            <a href="/faq">FAQ</a>
                            <a href="/disclaimer">Disclaimer</a>
                        </div>
                    </li>
                </ul>
            </div>
        
            <div className="block-wrapper">
                <div>
                    <img id='block-logo' src={logo_wh} alt={logo_bl} />
                    <h3 id='block-logo-text'>Donations Make a Difference</h3>
                    <br/>
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
                <div className="step-container">
                    <div><svg className='step-circle' width="100" height="100">
                        <circle cx="50" cy="50" r="35" stroke="#010925" stroke-width="3" fill="lightgray" />
                    </svg></div>

                    <div className='step-box'>
                        <p>
                            Reference our interactive and localized database to 
                            gather information about your destination as we.
                            Discover <i>what, how, and where </i> to make your donation.
                        </p>
                    </div>
                </div>

                <div className="step-container">
                    <div><svg className='step-circle' width="100" height="100">
                        <circle cx="50" cy="50" r="35" stroke="#010925" stroke-width="3" fill="lightgray" />
                    </svg></div>

                    <div className='step-box'>
                        <p>Pack a few items to be donated, then DONATE!</p>
                    </div>
                </div>

                <div className="step-container">
                    <div><svg className='step-circle' width="100" height="100">
                        <circle cx="50" cy="50" r="35" stroke="#010925" stroke-width="3" fill="lightgray" />
                    </svg></div>
                    <div className='step-box'>
                        <p>
                            Inspire others by sharing content and experiences, commending
                            other's <i>NoMAD's</i>, and providing useful information
                        </p>
                    </div>
                </div>

            </div>
            
            <h4 className='spacer-caption'>
                Click <a className='text-hyperl' href='/About'>Here</a> to learn more.
            </h4>
            <hr style={{width: '70%', margin:'0px 15%'}}/>
        </article>

        <article className='donations-wrapper'>
            <h2>Recent Donation Trips</h2>
            <div className="slides-container">
                <div className="slide-entry">
                    <div className="top-image">
                        <img src={ dons } alt="boulder" />
                    </div>
                    <div className="donation-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <p>Rating: </p>
                    </div>
                </div>
                <div className="slide-entry">
                    <div className="top-image">
                        <img src={ dons } alt="boulder" />
                    </div>
                    <div className="donation-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <p>Rating: </p>
                    </div>
                </div>
                <div className="slide-entry">
                    <div className="top-image">
                        <img src={ dons } alt="boulder" />
                    </div>
                    <div className="donation-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <p>Rating: </p>
                    </div>
                </div>
            </div>
        </article>

        <h4 className='spacer-caption'>
            Something unclear? Checkout our <a className='text-hyperl' href='/faq'>FAQ</a> page
        </h4>
    </div>
    )
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
    )
}

export default Home;