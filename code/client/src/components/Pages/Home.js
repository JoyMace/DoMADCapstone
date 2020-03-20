import React from 'react';
import './Home.css'
import bg from '../../images/home-filler-girl_running.jpg';
import bg_alt from '../../images/home-filler-inspire.jpg';
import logo_wh from '../../images/CompleteDoMADLogo.svg';
import logo_bl from '../../images/DoMADLogoDark.svg';
import StepsGraphic from '../../images/123DoMADGraphic.png';


import dons from '../../images/home-filler-volunteers.jpg';

function Home() {
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
                            <a href="/how_it_works">Log In</a>
                            <a href="/about">Register</a>
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