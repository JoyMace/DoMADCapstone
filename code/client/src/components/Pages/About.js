import React from 'react';
import './About.css';
import AboutImage from '../../images/AboutImage.jpg'

function About() {
    return (
        <div className="about">
            <div class="tinted" >
                <img class="about" src={AboutImage} width="900" alt="Image"/>
            </div>

            <div class="centered1">
                <div class="header">Our Mission</div>
            </div>   
            
            <div class="centered2">
                Donations Make a Difference (DoMAD) is an initiative that encourages international travelers to 
                positively affect the less developed communities they visit by donating needed items.
            </div>
            <div class="centered3">
                International travelers often focus on their own needs rather than those of the communities through which they travel.  
                Although items like soap, bandages, and mosquito nets are relatively inexpensive for most international travelers, 
                they are not readily available or affordable to locals in many parts of the world. Recognizing this during our own travels, 
                we decided to start this initiative to facilitate “giving back” to the places we visit.
            </div>

            <p class="origin">If even a small percentage of the roughly 1.24 billion people who travel internationally each year donated a single item once at their 
                destination, it would help enhance the quality of life for a substantial number of people in less developed communities. 
            </p>

            <hr></hr>

            <h1 class="header1"> How It Works
            </h1>
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

            <hr></hr>

            <h1 class="header1">
                About Us
            </h1>
            <p class="top">
                Learn more about DoMAD, our mission and our team.
            </p>
            <div class="divl2">
                <pthick> Founders</pthick>
                <p class="bottom">
                    Jill Drury
                </p>
                
                
                <p class="top"> Founder & Executive Director, Donations Make A Difference (DoMAD)</p>
                <p class="origin">Jill is a retired federal executive who, during her government career, 
                    worked for the US Army Corps of Engineers, Department of the Army, 
                    and Department of Homeland Security. For more than a decade, 
                    Jill worked in international relations and traveled extensively − 
                    often to less developed countries. She frequently thought about items she could have brought with her, 
                    such as bandages or hand sanitizer, that she could have easily donated once in-country. 
                    That idea further evolved on a recent trekking trip through remote parts of Peru. 
                    It was at the tail end of the rainy season and it was evident the local people 
                    could benefit from having tarps to prevent their roofs from leaking. Since there was no electricity, 
                    solar lights would also have been beneficial. Unfortunately, neither of those items was available locally.
                     Jill and her husband, Stuart, wished they had known those types of items were needed − 
                     they would have gladly brought items to donate either directly to an individual or
                      to a church or other village entity for dissemination to local residents. After returning from Peru, Jill and Stu submitted a Capstone senior project proposal to the CU Boulder
                       Computer Science Department. Fortunately, that proposal was accepted. And through the efforts of six dedicated, highly capable senior computer science students, Donations Make A Difference, 
                       or "DoMAD," was created, providing a resource that will enable travelers to make a difference by donating needed items directly to the people or communities they encounter on their travels. 
                       Jill is a graduate of the University of Maryland, with a Masters of Public Policy from Georgetown University. She is a passionate traveler, horse lover, ballet dancer and dog owner. 
                       She has been delighted to develop DoMAD with an awesome team of CU Boulder computer science students. Jill can be reached at DoMAD24901@gmail.com.
                    </p>
                <p class="bottom"> Stuart Drury</p>
                <p class="top"> Co-Founder & Executive Assistant, Donations Make A Difference (DoMAD)</p>
                <p class="origin">
                Stu is a retired federal civil servant and retired Army Reserve officer. After eleven years as an active duty Army officer, 
                Stu became a reservist and a civilian employee of the Department of Defense. He worked for the Army in Europe before being
                 transferred to the Pentagon, where he met Jill. They are approaching 25 years of wedded bliss. After a very brief stint with the legacy 
                 Immigration and Naturalization Service, Stu served on the Joint Staff, attended the National War College, worked at the U.S. Mission to NATO in Brussels, 
                 and served in the Office of the Secretary of Defense before taking early retirement in 2008. Stu is a graduate of the U.S. Military Academy at West Point, 
                 has a Masters of Public Administration from the Kennedy School of Government at Harvard University, and a Masters of National Security Strategy from the 
                 National War College. He is a recovering runner, avid skier, occasional mountaineer, aspiring cyclist and enthusiastic reader.
                 Stu can be reached at DoMAD40075@gmail.com.
                </p>
            </div>
        </div>
    )
}

export default About;