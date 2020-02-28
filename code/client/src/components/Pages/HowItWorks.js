import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
    return (
        <div className="how">
            <hr className="about"></hr>

            <h1 class="header1"> How It Works</h1>
        < div class="divl">
            <p class="origin">After planning a trip, visit DoMAD.org before traveling to gather information on what items are needed for the area you are visiting.
            For example, if you are planning to go trekking in Peru, you would consult DoMAD before departing, enter your trekking location 
            and learn that tarps and rain ponchos are most needed items in that area.
            </p>
        </div>

        <div class="divr">
            <p class="origin">
            Based on this data, pack a few extra items to be donated to local organizations or directly to the local community when you arrive.
            </p>
        </div>

        <div class="divl">
            <p class="origin">
            Since DoMAD relies heavily on user feedback, visit DoMAD.org after your trip to provide feedback regarding your experience. 
            This includes providing feedback on whether the donation item was benficial, recommending a different donation item, 
            or providing other travelers with helpful information!
            </p>
        </div> 
         
        </div>
    )
}

export default HowItWorks;