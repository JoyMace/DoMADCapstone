import React from 'react';
import './Home.css'
import bg from '../../images/home-filler-girl_running.jpg';
import bg_alt from '../../images/home-filler-inspire.jpg';
import logo_wh from '../../images/CompleteDoMADLogo.svg';
import logo_bl from '../../images/DoMADLogoDark.svg';

import dons from '../../images/home-filler-volunteers.jpg';

function Home() {
    return (

    <div className="home">

        <StickyHeadContainer id='top-container'>
            <img id='bg_img' src={bg} alt={bg_alt} />

            <div id="navbar-wrapper">
                <div id='nav-container'>
                    <a id='ham-btn' onClick={myHamButton}>
                        <b>&#9776;</b>
                    </a>
                    
                    <div id='left'>
                        <div className='dropdown'>
                            <a className="DD-btn">
                                Get Started<i className="down-up-arrow"></i>
                            </a>
                            <div className="dropdown-content">
                                <a href="/search_locations">Explore</a>
                                <a href="#====================================================">Share A Trip</a>
                                <a href="/blogs">Community Blogs</a>
                            </div>
                        </div>
                    </div>

                    <div id='right'>
                        <div className='dropdown'>
                            <a className="DD-btn">
                                Learn More<i className="down-up-arrow"></i>
                            </a>
                            <div className="dropdown-content">
                                <a href="/about">Our Mission</a>
                                <a href="/how_it_works">How It Works</a>
                                <a href="/faq">FAQ</a>
                                <a href="/contact">Contact Us</a>
                            </div>
                        </div>

                        <div className='dropdown'>
                            <a id='login-btn' className='DD-btn' href="/login">
                                Log in
                            </a>
                            <div id='signup-dd' className="dropdown-content">
                                <a  href="/register">Or click to join our community now!</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        
            <div id="block-wrapper">
                <div>
                    <img id='block-logo' src={logo_wh} alt={logo_bl} />
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
        </StickyHeadContainer>

        <article id='steps-wrapper'>
            <header className='section_heads_foots'>
                <h4>A Community that Empowers Global Travelers To Make A Difference Locally</h4>
                <hr className='hr-spacer'/>
                <h5><i>How does DoMAD work?</i></h5>
            </header>

            <div id='all-steps-container'>
                <div className="step-container">
                    <div className="step-head">
                        <svg><g>
                            <circle cx="50" cy="50" r="35" stroke="#CBB95A" stroke-width="4" fill="whitesmoke" />
                            <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="28px" stroke-width="2px" dy=".3em">1</text>
                        </g></svg>
                        <p><b>Collect</b></p>
                    </div>
                    <div className='step-box'>
                        <p>Our interactive database of information provides extensive 
                            data of locales around the world, their specific and comprehensive 
                            donations needs, tips for how to donate, partnering organizations, and donation
                            stories from peers in the DoMAD community.
                        </p>
                    </div>
                </div>
                <div className="step-container">
                    <div className="step-head">
                        <svg><g>
                            <circle cx="50" cy="50" r="35" stroke="#CBB95A" stroke-width="4" fill="whitesmoke" />
                            <text x="50%" y="50%" text-anchor="middle" font-size="28px" stroke-width="2px" dy=".3em">2</text>
                        </g></svg>
                        <p><b>Pack</b></p>
                    </div>
                    <div className='step-box'>
                        <p>Donating should not only be easy but painless, so we provide tips for preparing, 
                            packing, and delivering your items on your own terms. We make sure your items 
                            ends up in the right recipient's hands, hassle free. Its that easy!</p>
                    </div>
                </div>
                <div className="step-container">
                    <div className="step-head">
                        <svg><g>
                            <circle cx="50" cy="50" r="35" stroke="#CBB95A" stroke-width="4" fill="whitesmoke"/>
                            <text x="50%" y="50%" text-anchor="middle" font-size="28px" stroke-width="2px" dy=".3em">3</text>
                        </g></svg>
                        <p><b>Share and Inspire</b></p>
                    </div>
                    <div className='step-box'>
                        <p>The DoMAD community is the best source for authentic donation stories. 
                            Share your donation stories to inspire other <i>NoMad's</i>, commend
                            your peer's efforts, and find inspiration for your next donation.
                        </p>
                    </div>
                </div>
            </div>
            
            <footer className='section_heads_foots'>
                <hr />
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
            <div id="post-steps-links">
                <div>
                    <p><b>Want to learn more?</b></p>
                    <div className="post-steps-box">
                        <a className="hyperl-text" href="/About">Read our Mission</a>
                    </div>
                </div>
                <div>
                    <p><b>Ready to find your donation?</b></p>
                    <div className="post-steps-box">
                        <a className="hyperl-text">Go to Explore</a>
                    </div>
                </div>
            </div>
            <br/>
            <h5>Still have questions? Check out our <a className='hyperl-txt' href='/faq'>FAQ</a> page.</h5>
            <br/>
        </footer>
    </div>
    )
}

function myHamButton() {
    let x = document.getElementById("nav-container");
    if (x.className === "") {
        x.className += "hammed";
    } else {
        x.className = "";
    }
}

/* Sets an Observer on the  for viewport visibility*/
function StickyHeadContainer({ children, sticky=false, className, ...rest }){
    const [isSticky, setIsSticky] = React.useState(false);
    const ref = React.createRef();
    
    // mount viewport observer
    React.useEffect(() => {
        const cachedRef = ref.current, 
            observer = new IntersectionObserver(
                ([e]) => setIsSticky(e.intersectionRatio < 0.1), 
                    { threshold: [0.1] }  
            );
        observer.observe(cachedRef);
      
        // unmount
        return function() { 
            observer.unobserve(cachedRef); 
        }
    }, [])
    
    return (
        <div className={className + (isSticky ? " isSticky" : "")} ref={ref} {...rest}>
            {children}
        </div>
    )
}

export default Home;