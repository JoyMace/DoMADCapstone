import React from 'react';
import './About.css';
import AboutImage from '../../images/AboutImage.jpg'
import HeaderImage from '../../images/Frequent-Traveler-Successful.jpg'

function About() {
    return (
        <div className="about">
            <StickyContainer className="about-container">
                <div className="tinted" >
                    <img className="about-image" src={HeaderImage} alt="person backpacking"/>
                </div>
                <div className="about-content">
                    <div className="about-pad">
                        <h1 className="mission-header">
                            Our Mission
                        </h1>
                    </div>
                    <div className="mission-paragraph-container">
                        <p className="mission-paragraphs">
                            Donations Make A Difference (DoMAD) is a website to inform international travelers about items they can contribute to address local needs in communities they will visit.
                        </p>
                        <p className="mission-paragraphs">
                            In many parts of the world, local citizens need various items such as soap, bandages, flashlights, tarps and reading glasses, but these are either not readily available to them or they cannot afford to buy them.  For most international travelers, however, these items are easy to find and rather inexpensive to buy. So, if even a small percentage of the roughly 1.24 billion people who travel internationally each year brought with them and then donated just ONE such item to a local individual or organization at their destination, it would significantly help enhance the quality of life for a substantial number of people.
                        </p>
                        <p className="mission-paragraphs">
                            After traveling, please help future travelers by posting about your experience.  DoMAD is intended to be a crowd-sourced website, meaning it relies on users like you to help update its content.  You can keep it quick & simple by rating your experience donating specific items on a scale of one (low) to five (high) stars. You can also propose new donation ideas and specify where and/or how to donate.
                        </p>
                        <p className="mission-paragraphs">
                        As a non-profit organization, DoMAD is dedicated to inspiring and facilitating travelers to give back to the communities they visit, thus improving the quality of life for those less fortunate.
                        </p>
                    </div>
                </div>            
            </StickyContainer>
            <div className="under-image-content">
                <p className="under-image-paragraph">
                    If even a small percentage of the roughly 1.24 billion people who travel internationally each year donated a single item once at their 
                    destination, it would help enhance the quality of life for a substantial number of people in less developed communities. 
                </p>

                <hr className="separator-line"></hr>

                <h1 className="about-us-header">
                    About Us
                </h1>

                <p className="learn-more-paragraph">
                    Learn more about DoMAD, our mission and our team.
                </p>

                <div className="sponsor-about-us">
                    <div className="sponsor-text-section">
                        <h3>Founders</h3>
                        <p className="sponsor-names">Jill Drury</p>
                        <p className="sponsor-title">Founder & Executive Director, Donations Make A Difference (DoMAD)</p>
                        <p className="sponsor-info">
                            Jill is a retired federal executive who, during her government career, worked for the US Army Corps of Engineers, Department of the Army, and Department of Homeland Security.   For more than a decade, Jill worked in international relations and traveled extensively – often to less developed countries.  She frequently thought about items she could have brought with her, such as bandages or hand sanitizer, that she could have easily donated once in-country.  That idea further evolved on a recent trekking trip through remote parts of Peru.  It was at the tail end of the rainy season and it was evident the local people could benefit from having tarps to prevent their roofs from leaking.  Since there was no electricity, solar lights would also have been beneficial.  Unfortunately, neither of those items was available locally.  Jill and her husband, Stuart, wished they had known those types of items were needed — they would have gladly brought items to donate either directly to an individual or to a church or other village entity for dissemination to local residents.  After returning from Peru, Jill and Stu submitted a Capstone senior project proposal to the CU Boulder Computer Science Department.  Fortunately, that proposal was accepted.  And through the efforts highly capable senior computer science students, Donations Make A Difference, or “DoMAD,” was created, providing a resource that will enable travelers to make a difference by donating needed items directly to the people or communities they visit on their travels.  
                            Jill is a graduate of the University of Maryland, with a Master of Public Policy from Georgetown University.  She is a passionate traveler, horse lover, ballet dancer and dog owner.  She has been delighted to develop DoMAD with an awesome team of CU Boulder computer science students.  Jill can be reached at DoMAD24901@gmail.com.
                        </p>
                        <p className="sponsor-names"> Stuart Drury</p>
                        <p className="sponsor-title">Co-Founder, Donations Make A Difference (DoMAD)</p>
                        <p className="sponsor-info">
                            Stu is a retired federal civil servant and retired Army Reserve officer.  After eleven years as an active duty Army officer, Stu became a reservist and a civilian employee of the Department of Defense.  He worked for the Army in Europe before being transferred to the Pentagon, where he met Jill.  They are approaching 25 years of wedded bliss.  After a very brief stint with the legacy Immigration and Naturalization Service, Stu served on the Joint Staff, attended the National War College, worked at the U.S. Mission to NATO in Brussels, and served in the Office of the Secretary of Defense before taking early retirement in 2008.  Stu is a graduate of the U.S. Military Academy at West Point, has a Masters of Public Administration from the Kennedy School of Government at Harvard University, and a Masters of National Security Strategy from the National War College.  He is a recovering runner, avid skier, occasional mountaineer, aspiring cyclist and enthusiastic reader.  Stu can be reached at DoMAD40075@gmail.com. 
                        </p>
                    </div>
                    <div className="sponsor-images">
                        <img className="sponsor-image-styling" src={HeaderImage} alt="person backpacking"/>
                        <img className="sponsor-image-styling" src={HeaderImage} alt="person backpacking"/>
                        <img className="sponsor-image-styling" src={HeaderImage} alt="person backpacking"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

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

export default About;