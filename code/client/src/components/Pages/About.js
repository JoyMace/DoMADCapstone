import React from 'react';
import './About.css';
import AboutImage from '../../images/AboutImage.jpg'

function About() {
    return (
        <div className="about">
            <div className="tinted" >
                <img className="about" src={AboutImage} width="900" alt="person in peru"/>
            </div>


            <div className="aboutPad">
                <header className="about">Our Mission</header>
            </div>             
                       
            <div className="centered">
                Donations Make a Difference (DoMAD) is a website to inform international travelers
                about items they can contribute to address local needs in communities they will visit on
                their travels. This enables travelers to bring from home, or buy locally, needed items
                and contribute them directly to individuals, to families, schools, hospitals, orphanages,
                animal shelters and/or to other organizations.
                <p className="white">After traveling, DoMAD users are asked to post what they learned about local needs
                during their travels. Users are encouraged to rate their experience donating specific
                items and to recommend new items to help inform future travelers.</p>
                <p className="white">As a non-profit organization, DoMAD is dedicated to inspiring and facilitating travelers to
                give back to the communities they visit, thus improving the quality of life for those less
                fortunate.</p>
            </div>

            <p className="origin">If even a small percentage of the roughly 1.24 billion people who travel internationally each year donated a single item once at their 
                destination, it would help enhance the quality of life for a substantial number of people in less developed communities. 
            </p>    

            <hr className="about"></hr>

            <h1 className="header1">
                About Us
            </h1>
            <p className="top">
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