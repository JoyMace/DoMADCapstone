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
                <img id='bg' src={bg} alt={bg_alt} />

                <StickyNavbar className="navbar-container">
                    <div className='nav-list'>
                        <li className='dropdown'>
                            <a href="javascript:void(0)" className="DD-btn">
                                Get Started</a>
                            <div className="dropdown-content">
                                <a href="/about">Explore</a>
                                <a href="#share">Share A Trip</a>
                                <a href="/blogs">Go to Blogs</a>
                            </div>
                        </li>
                        <li className='dropdown'>
                            <a href="javascript:void(0)" className="DD-btn">
                                Learn More</a>
                            <div className="dropdown-content">
                                <a href="/about">Our Mission</a>
                                <a href="/contact">Contact Us</a>
                                <a href="/faq">FAQ</a>
                                <a href="/disclaimer">Disclaimer</a>
                            </div>
                        </li>
                        <li className='nav-cell'>
                            <a href="/register">Sign up</a>
                        </li>
                        <li className='nav-cell'>
                            <a href="/account">Log in</a>
                        </li>
                    </div>
                </StickyNavbar>

                <div className="block-wrapper">
                    <img id="block-logo" src={logo_wh} alt={logo_bl} />
                    <h2>Donations Make a Difference</h2><br/>
                    <div className='block-text'>
                        <span id='exp'>
                            <a href="/search_locations">Explore Locations</a>
                        </span>
                        <span id='blog'>
                            <a href="/blogs">Blogs</a>
                        </span>
                    </div>
                </div>
            </div>

    <section className='horz-spacer'>
        <a target='_blank'>
            <h4>Empowering Global Travelers To Make A Difference Locally</h4>
        </a>
    </section> 
           
            <div className='middle-wrapper'>
                <div className="step-container">
                    <h2>1</h2>
                    <hr/>
                    <p>Utilize DoMAD's interactive database of localized 
                        donations to help you to find <i>what, how, and where</i> to 
                        make simple donations around the world.</p>
                </div>
                <div className="step-container">
                    <h2>2</h2>
                    <hr/>
                    <p>Pack your items however you'd like.</p>
                </div>
                <div className="step-container">
                    <h2>3</h2>
                    <hr/>
                    <p>Donate your items! (The fun part)</p>
                </div>
                <div className="step-container">
                    <h2>4</h2>
                    <hr/>
                    <p>Inspire others by sharing your experiences on our 
                        blogs, commending peers, and validating their donations.</p>
                </div>
            </div>

    <div className="horz-spacer">
        <h4 id='learn_more'>Click <a href='/About'>Here</a> to learn more.</h4>
    </div>

    <hr/>
       
            <div className='container-donate'>
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

            <div className='more_qs'>
                <h4>Something unclear? Checkout our <a href='/faq'>FAQ</a> page</h4>
            </div>
        </div>
    )
}

/* Sets an Observer on the wrapper after top-container */
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

/*document.addEventListener('sticky-nav-change', e => {
    const header = e.detail.target;  // header became sticky or stopped sticking.
    const sticking = e.detail.stuck; // true when header is sticky.
    header.classList.toggle('shadow', sticking); // add drop shadow when sticking.
  
    document.querySelector('.who-is-sticking').textContent = header.textContent;
}); */


export default Home;