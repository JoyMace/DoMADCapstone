import React from 'react';
import './Contact.css';

function Contact() {

    return (
        <div className="contact">
            <h1 className="contact-us-header">Contact Us</h1>
            <div className="contact-style">
                <div className="contact-form-container">
                    <form action="/api/contact-us/msg/contact" method="POST">
                        <div className="first-last-name-contact">
                            <div className="first-name-contact">
                                <p>First Name:</p>
                                <input type="text" name="firstname" className="input-contact"/>
                            </div>
                            <div className="last-name-contact">
                                <p>Last Name:</p>
                                <input type="text" name="lastname" className="input-contact"/><br/>
                            </div>
                        </div>
                        <div className="email-contact">
                            <p>Email:</p>
                            <input type="text" name="email" className="input-contact"/><br/>
                        </div>
                        <div className="feedback-contact">
                            <p>Questions or Feedback</p>
                            <textarea rows="5" id="message" name="message" className="feedback-box-contact"></textarea><br/>
                        </div>
                        <button type="submit" className="submit-contact-button">Sumbit Form</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;