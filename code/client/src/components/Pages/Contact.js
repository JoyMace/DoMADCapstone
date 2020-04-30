import React from 'react';
import './Contact.css';

function Contact() {

    return (
        <div className="contact">
            <div className="contact-style">
                <div className="contact-form-container">
                    <div className='contact-title'style={{fontSize: '36px'}}>Contact Us</div>
                    <form action="/api/contact-us/msg/contact" method="POST">
                        <div className="first-last-name-contact">
                            <div className="first-name-contact">
                                <p>First Name:</p>
                                <input required = "Required" type="text" name="firstname" className="input-contact" placeholder='First Name'/>
                            </div>
                            <div className="last-name-contact">
                                <p>Last Name:</p>
                                <input required = "Required" type="text" name="lastname" className="input-contact" placeholder='Last Name' /><br/>
                            </div>
                        </div>
                        <div className="email-contact">
                            <p>Email:</p>
                            <input required = "Required" type="text" name="email" className="input-contact" placeholder='Email Address'/><br/>
                        </div>
                        <div className="feedback-contact">
                            <p>Questions or Feedback</p>
                            <textarea required = "Required" rows="5" id="message" name="message" className="feedback-box-contact" placeholder='Type your message here'></textarea><br/>
                        </div>
                        <button type="submit" className="submit-contact-button">Sumbit Form</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;