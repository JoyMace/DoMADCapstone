import React from 'react';
import './About.css';
import AboutImage from './AboutImage.jpg'

function About() {
    return (
        <div className="about">
            <div class="tinted" >
                <img src={AboutImage} width="900" alt="Image"/>
            </div>

            <div class="centered1">
                <div class="header">Our Mission</div>
            </div>   
            
            <div class="centered2">
                Donations Make a Difference (DoMAD) is an initiative that encourages international travelers to 
                positively affect the less developed communities they visit by donating needed items.
                
                International travelers often focus on their own needs rather than those of the communities through which they travel.  
                Although items like soap, bandages, and mosquito nets are relatively inexpensive for most international travelers, 
                they are not readily available or affordable to locals in many parts of the world. Recognizing this during our own travels, 
                we decided to start this initiative to facilitate “giving back” to the places we visit.
            </div>
        </div>
    )
}

export default About;