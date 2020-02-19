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

        <StickyContainer id='top-container'>
            <img id='bg_img' src={bg} alt={bg_alt} />

            <div id="navbar-wrapper">
                <div id='nav-container'>
                    <a id='ham-btn' href='javascript:void(0);' onClick={myHamButton}>
                        <b>&#9776;</b>
                    </a>
                    
                    <div id='left'>
                        <div className='dropdown'>
                            <a className="DD-btn" href="javascript:void(0);">
                                Get Started<i className="down-up-arrow"></i>
                            </a>
                            <div className="dropdown-content">
                                <a href="/about">Explore</a>
                                <a href="#share">Share A Trip</a>
                                <a href="/blogs">Go to Blogs</a>
                            </div>
                        </div>
                    </div>

                    <div id='right'>
                        <div className='dropdown'>
                            <a className="DD-btn" href="/about">
                                Learn More<i className="down-up-arrow"></i>
                            </a>
                            <div className="dropdown-content">
                                <a href="/about">Our Mission</a>
                                <a href="/contact">Contact Us</a>
                                <a href="/faq">FAQ</a>
                                <a href="/disclaimer">Disclaimer</a>
                            </div>
                        </div>

                        <div className='dropdown'>
                            <a id='login-btn' className='DD-btn' href="/login">
                                Log in
                            </a>
                            <div id='signup-dd' className="dropdown-content">
                                <a  href="/register">No account? Create one!</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        
            <div id="block-wrapper">
                <div>
                    <img id='block-logo' src={logo_wh} alt={logo_bl} />
                    <h3 id='block-logo-text'>Donations Make a Difference</h3>
                    <br/>
                </div>
                <div id='block-content'>
                    <div className='block-box'>
                        <a href="/search_locations">Explore</a>
                    </div>
                    <div className='block-box'>
                        <a href="/blogs">Blogs</a>
                    </div>
                </div>
            </div>
        </StickyContainer>

        <article id='steps-wrapper'>
            <header className='section_heads_foots'>
                <h4>Empowering Global Travelers To Make A Difference Locally</h4>
                <hr className='hr-spacer'/>
            </header>

            <div id='all-steps-container'>
                <div className="step-container">
                    <div><svg className='step-svg'>
                        <g>
                            <circle cx="50" cy="50" r="35" stroke="#010925" stroke-width="3" fill="lightgray" />
                            <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="20px" stroke-width="2px" dy=".3em">1</text>
                        </g>
                    </svg></div>
                    <div className='step-box'>
                        <p>
                            Reference our interactive and localized database to 
                            gather information about your destination.
                            Discover <i>what, how, and where </i> to make your donation.
                        </p>
                    </div>
                </div>
                <div className="step-container">
                    <div><svg className='step-svg'>
                        <g>
                            <circle cx="50" cy="50" r="35" stroke="#010925" stroke-width="3" fill="lightgray" />
                            <text x="50%" y="50%" text-anchor="middle" font-size="20px" stroke-width="2px" dy=".3em">2</text>
                        </g>
                    </svg></div>
                    <div className='step-box'>
                        <p>Pack a few items to be donated, then DONATE!</p>
                    </div>
                </div>
                <div className="step-container">
                    <div><svg className='step-svg'>
                        <g>
                            <circle cx="50" cy="50" r="35" stroke="#010925" stroke-width="3" fill="lightgray" />
                            <text x="50%" y="50%" text-anchor="middle" font-size="20px" stroke-width="2px" dy=".3em">3</text>
                        </g>
                    </svg></div>
                    <div className='step-box'>
                        <p>
                            Inspire others by sharing content and experiences, commending
                            other's <i>NoMAD's</i>, and providing useful information
                        </p>
                    </div>
                </div>
            </div>
            
            <footer className='section_heads_foots'>
                <h5>Click <a className='hyperl-txt' href='/About'>Here</a> to learn more about DoMAD</h5>
                <hr className='hr-spacer'/>
            </footer>
        </article>

        <article id='donations-wrapper'>
            <header className='section_heads_foots'>
                <h4>Recent Donation Trips</h4>
            </header>

            <div id="donations-container">
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

        <footer className='section_heads_foots'>
            <h5>Something unclear? Checkout our <a className='hyperl-txt' href='/faq'>FAQ</a> page.</h5>
            <br/>
        </footer>
    </div>
    )
}


/* Adds a custom event listener for when the window width < 500 to rename a class */
/*function ResponsiveHammedDD ({ children, className, ...rest }) {
    const [isHammed, setIsHammed] = React.useState(false);
    let ref = React.createRef();

    function updateWidth () {
        setIsHammed((window.innerWidth < 550 ? true : false));
    }

    React.useLayoutEffect(() => {
        window.addEventListener ("resize", updateWidth); // mount
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth); // unmount
    }, [])

    return (
        <div className={(isHammed ? "hammed" : "nav")} ref={ref} {...rest}> 
            {children}
        </div>
    )
}*/
function myHamButton() {
    let x = document.getElementById("nav-container");
    if (x.className === "") {
        x.className += "hammed";
    } else {
        x.className = "";
    }
}

/* Sets an Observer on the  for viewport visibility*/
function StickyContainer({ children, sticky=false, className, ...rest }){
    const [isSticky, setIsSticky] = React.useState(false);
    const ref = React.createRef();
    
    // mount observer
    React.useEffect(() => {
        const cachedRef = ref.current, 
            observer = new IntersectionObserver(
                ([e]) => setIsSticky(e.intersectionRatio < 0.1), 
                    { threshold: [0.1] }  
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