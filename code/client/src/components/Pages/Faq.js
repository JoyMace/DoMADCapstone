import React from 'react';
import './Faq.css';
import { Link } from 'react-router-dom';

function Faq() {
    return (
        <div className="faq">
		<body>
			
            <h1>Frequently Asked Questions</h1>	
			<br></br>
			<section>
            <p>Can’t find what you’re looking for? <Link to="/contact" className="contact-us-link">Contact us now.</Link></p>
			<br></br>
			</section>
			
			<section>			
			<h2>What is DoMAD? </h2>
			<br></br>
			<p>DoMAD is a 501c3 organization based in Colorado.  
			Donations Make a Difference or “DoMAD” is a website 
			to inform international travelers about items they can 
			contribute toaddress local needs in communities they will 
			visit on their travels.</p>
			</section>
			
			<br></br>
			
			<section>
			<h2>How does DoMAD work?</h2>
			<br></br>
			<p>When you are planning your trip, 
			especially to a less developed country, 
			consult DoMAD to see what items are needed 
			for the area you will visit. 
			</p>
			<br></br>
			<p>For example, if you are planning to go trekking in Peru 
			in the rainy season, you would consult DoMAD before departing, 
			enter your trekking location and learn that tarps and 
			rain ponchos are needed in that area.
			</p>
			<br></br>
			<p>DoMAD also provides information on how you can make a donation
			– either directly to a person, or to a local Peruvian organization
			that will distribute the tarp or rain poncho.
			</p>
			<br></br>
			<p>After traveling and donating items, users are asked to rate the
			benefit of the item(s) donated and provide feedback regarding their
			experience; kind of like “Trip Advisor” for donations.  
			If you didn’t think the tarp donation was beneficial, 
			you can provide that information on DoMAD and recommend a 
			different type of donation.   
			Also, if you don’t find a recommended item in DoMAD for your destination,
			please update DoMAD after your trip to let others know what they should 
			bring on future trips. 
			</p>
			</section>
			
			<br></br>
			
			<section>
			<h2>Does making a single donation really help?</h2>
			<br></br>
			<p>Yes! If even a small percentage of the roughly
			1.24 billion people who travel internationally each year donated a needed
			item once at their destination, it would help enhance the quality of life
			for a substantial number of people.
			</p>
			</section>
			
			<br></br>
			
			<section>
			<h2>Why not donate money instead of making an in-kind donation?</h2>
			<br></br>
			<p>We are not asking for any monetary donations.  In fact, DoMAD does accept 
			monetary donations nor does it in any way discourage or preclude travelers 
			from making monetary donations to charitable organizations.  Instead, DoMAD
			provides a new and complementary mechanism for travelers to contribute directly
			and personally to the people and communities they will encounter on their travels.
			</p>
			</section>
			
			<br></br>
			
			<section>
			<h2>What is an in-kind donation?</h2>
			<br></br>
			<p>When people donate a specific good or item, those are known as in-kind donations.
			</p>
			</section>
			
			<br></br>
			
			<section>
			<h2>Is DoMAD a religious organization?</h2>
			<br></br>
			<p>DoMAD is a non-sectarian international donation organization.</p>
			</section>
			
			<br></br>
			
			<section>
			<h2>What kinds of donations does DoMAD accept?</h2>
			<br></br>
			<p>DoMAD does not accept donations or money.  Instead, DoMAD provides a platform for 
			travelers to learn about needed items they can donate once at their travel destination.
			DoMAD also allows travelers to rate their donation experiences and spread important
			donation ideas to the traveling community.
			</p>
			</section>
			
			<br></br>
			
			<section>
			<h2>Where does DoMAD operate?</h2>
			<br></br>
			<p>In the near term, DoMAD is primarily focused on less-developed countries where 
			donations are critically needed.  In many parts of the world, items like soap, 
			bandages, flashlights, tarps and reading glasses that are relatively inexpensive
			for most international travelers are not readily available or affordable.
			</p>
			</section>
			
			<br></br>
			
			<section>
			<h2>How can I donate items?</h2>
			<br></br>
			<p> Your donation can be given directly to an individual or to a local organization or an actual DoMAD organization page.</p>
			<p> For example, if you are going to a country in Sub-Saharan Africa, you could bring a mosquito net to donate upon arrival.
			Alternatively, you could buy your donation item upon arrival at your destination to help support the local economy.</p>
			</section>
			
			<br></br>
			
			<section>
			<h2>What kinds of items can I donate?</h2>
			<br></br>
			<p>DoMAD provides suggested items for travelers to donate at their travel destination.
			</p>
			<br></br>
			<p>In many parts of the developing world, items that are relatively inexpensive
			   for most international travelers such as soap, bandages, flashlights, tarps and reading glasses 
			are not readily available or affordable.
			</p>			
			</section>
			
			<br></br>
			
			<section>
			<h2>Why should I report a trip? </h2>
			<br></br>
			<p> By providing DoMAD with your donation details, we can see what is needed
			    where and use this data to encourage more travelers to donate, 
				plus provide easy ways for users to donate across the globe!
			</p>
			</section>
			
			<br></br>
			
			<section>
			<h2>How can I contribute to DoMAD? </h2>
			<br></br>
			<p> DoMAD does not ask for (or accept) monetary contributions – 
				we do ask you to share your travel experiences!
			</p>
			<br></br>
			<p>We need your donation ideas and experiences to inspire other travelers to give back when they travel. 
				Travelers are asked to rate their donation experience to help others identify most needed and appreciated items.
			</p>
			</section>
		</body>
        </div>
    )
}

export default Faq;