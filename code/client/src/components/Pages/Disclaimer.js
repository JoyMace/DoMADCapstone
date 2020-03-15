import React from 'react';
import './Disclaimer.css';
import { Link } from 'react-router-dom';

function Disclaimer() {
    return (
        <div className="disclaimer">
            <h2 className="disclaimer-header">DoMAD Disclaimer</h2>
            <p className="disclaimer-paragraphs">
                DoMAD provides a platform for travelers to learn about needed donation items as well as to share their donation ideas and experiences.  As such, the views, thoughts, suggestions and opinions expressed belong solely to the author(s) and do not reflect the view of the DoMAD organization.
            </p>
            <p className="disclaimer-paragraphs">
                None of the authors, contributors, or anyone else connected with DoMAD are responsible for the information contained in or linked from the DoMAD website.  DoMAD accepts no liability for loss or damage, including personal injury, resulting from use, reference to, or reliance on any information or content contained within this website.
            </p>
            <p className="disclaimer-paragraphs">
                The information contained in this site is provided on an "as is" basis with no guarantees of completeness, accuracy, usefulness or timeliness.  If you believe the content of any of our pages is inaccurate, you can also address this by providing feedback on the site and rating your donation experiences.  You can also email us at domad24901@gmail.com or visit <Link to="/contact" className="contact-us-link">our contact us page.</Link>
            </p>
            <p className="disclaimer-paragraphs">
                Links to other websites does not mean that DoMAD approves of or endorses the views, information, products or services contained on those sites.  Furthermore, DoMAD is not responsible for the accuracy or content of information contained on those sites.  We accept no liability for damage caused by malware or viruses on external websites linked to via DoMAD.
            </p>
        </div>
    )
}

export default Disclaimer;