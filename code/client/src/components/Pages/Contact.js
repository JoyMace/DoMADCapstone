import React from 'react';
import './Contact.css';

function Contact() {

    return (

        <div className="contact">
            <form action="/api/contact-us/msg/contact" method="POST">
                  First Name: <input type="text" name="firstname" />
                  Last Name: <input type="text" name="lastname" /><br/>
                  email: <input type="text" name="email" /><br/>

                  <h4>Questions or Feedback</h4>
                  <textarea rows="5" id="message" name="message"></textarea><br/>
                  <button type="submit">Sumbit</button>
            </form>
        </div>
    )
}


export default Contact;


// <div className="contact">
//     <h1>Contact Us</h1>
//     <p>This is the contact us page.</p>
// </div>
