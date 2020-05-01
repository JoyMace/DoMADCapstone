import React from 'react';
import './Contact.css';

function Contact() {

    return (
        <div className="contact">
            <div className="contact-row">
                <div className='contact-left'>
                    <div className='contact-title'style={{fontSize: '36px'}}>Contact Us</div>
                    <form className='contact-form' action="/api/contact-us/msg/contact" method="POST">
                        <div className="first-last-name-contact">
                            <div className="first-name-contact">
                                <label>First Name:</label>
                                <input required = "Required" type="text" name="firstname" className="input-contact" placeholder='First Name'/>
                            </div>
                            <div className="last-name-contact">
                                <label>Last Name:</label>
                                <input required = "Required" type="text" name="lastname" className="input-contact" placeholder='Last Name' /><br/>
                            </div>
                        </div>
                        <div className="email-contact">
                            <label>Email:</label>
                            <input required = "Required" type="text" name="email" className="input-contact" placeholder='Email Address'/><br/>
                        </div>
                        <div className="feedback-contact">
                            <label>Questions or Feedback</label>
                            <textarea required = "Required" rows="9" id="message" name="message" className="feedback-box-contact" placeholder='Type your message here'></textarea><br/>
                        </div>
                        
                        <button type="submit" className="submit-contact-button">Sumbit Form</button>
                    </form>
                </div>
                <div className="contact-right-info">
              <h1 className="title">We'd love to hear from you!</h1>
              
                  <div className="right-info-content">
                    <br></br>
                    <h2>Fill out the form to the left to share your thoughts, concerns, questions or comments.</h2>
                    <br></br>
                    <h2>DoMAD will never sell your personal information.</h2>
                  </div>
              </div>
            </div>
            
        </div>
        
    )
}

export default Contact;