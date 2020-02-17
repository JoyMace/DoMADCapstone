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
            <p>If even a small percentage of the roughly 1.24 billion people who travel internationally each year donated a single item once at their 
                destination, it would help enhance the quality of life for a substantial number of people in less developed communities. 
            </p>
            <h1> How It Works
            </h1>
            < div class="divl">
                <p>After planning a trip, visit DoMAD.org before traveling to gather information on what items are needed for the area you are visiting.
                     For example, if you are planning to go trekking in Peru, you would consult DoMAD before departing, enter your trekking location 
                     and learn that tarps and rain ponchos are most needed items in that area.
                </p>
            </div>
            <div class="divr">
                <p>
                Based on this data, pack a few extra items to be donated to local organizations or directly to the local community when you arrive.
                </p>
            </div>
            <div class="divl">
                <p>
                Since DoMAD relies heavily on user feedback, visit DoMAD.org after your trip to provide feedback regarding your experience. 
                This includes providing feedback on whether the donation item was benficial, recommending a different donation item, 
                or providing other travelers with helpful information!
                </p>
            </div>
        </div>
    )
}

export default About;