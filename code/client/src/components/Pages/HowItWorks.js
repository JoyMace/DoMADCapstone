import React from 'react';
import './HowItWorks.css';
import Map from '../../images/Map.png'
import PackedBagPic from '../../images/PackedBagPic.png'
import RecentTravelStoryPic from '../../images/RecentTravelStoryPic.png'
import Step1 from '../../images/Step1.png'
import Step2 from '../../images/Step2.png'
import Step3 from '../../images/Step3.png'
import { Link } from 'react-router-dom';


function HowItWorks() {
    return (
        <div className="how">
            <h1 className="how" style={{fontSize: 40}}> How It Works</h1>
            <div className="step-row">
                <div className="step-column">                    
                    <img className="step1" src={Step1}  alt="number 1 icon"/>
                    <h1>Gather Info</h1>
                    <p>After planning a trip, visit <Link to="/search_locations" className='contact-us-link'>our exploration page</Link> before traveling to gather information on what items are needed for the area you are visiting. For example, if you are planning go trekking in Peru, you would consult DoMAD before departing, enter your trekking location and learn that tarps and rain ponchos are most needed items in that area.</p>
                    <p>DoMAD provides suggested items for travelers to donate at their travel destination.  In many parts of the developing world, items that are relatively inexpensive for international travelers -- soap, bandages, flashlights, tarps and reading glasses -- are not readily available or affordable.</p>
                </div>
                <div className="step-column">                    
                    <img className="map" src={Map}  alt="world map"/> 
                    {/* SEARCH BAR GOES HERE */}                   
                </div>
                    
            </div>

            <div className="step-row">
                <div className="step-column">                    
                    <img className="suitcase" src={PackedBagPic} alt="open suitcase"/>                    
                </div>
                <div className="step-column">                    
                        <img className="step2" src={Step2} alt="number 2 icon"/>                    
                        <h1>Pack Items</h1>
                        <p>Based on this data, pack a few extra items to be donated to local organizations or directly to the local community when you arrive. Make sure to check with destination’s embassy and your airline to avoid traveling with forbidden items.</p> 
                        <p>For example, if you are going to a country in Sub-Saharan Africa, you could bring a mosquito net in your luggage to donate, or you could buy your donation item upon arrival at your destination to help support the local economy.  Your donation can be given directly to an individual or to a local organization.</p>
                </div>
            </div>  
            <div className="step-row">
                <div className="step-column">
                    <img className="step3" src={Step3} alt="number 3 icon"/>
                    <h1>Share your Trip</h1>
                    <p>Visit DoMAD.org after your trip to provide feedback regarding your experience. This includes providing feedback on whether the donation item was benficial, recommending a different donation item, or providing other travelers with helpful information!</p>
                    <p>DoMAD does not ask for (or accept) monetary contributions – we do ask you to share your travel experiences! We need your donation ideas and experiences to inspire other travelers to give back when they travel.</p>  
                
                </div>
                <div className="step-column">
                    <img className="formpic" src={RecentTravelStoryPic} alt="travel story submission form"/>
                </div>
            </div>       
            {/* <div className="rightImg2">
                <img class="howSearchBar" src={HowItWorksSearchBar} width="450" alt="Image"/>
            </div> */}        
            <div className="bluePadding">
                <p className="downCenter" >If even a small percentage of the ~ 1.24 billion people who travel internationally each year donated
                 a needed item at their destination, it would help enhance the quality of life for a substantial number of people.</p>

            </div>
            
        </div>
    )
}

export default HowItWorks;