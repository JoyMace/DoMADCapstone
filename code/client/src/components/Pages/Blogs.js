import React from 'react';
import './Blogs.css';
import blogimage from '../../images/boulder_image.jpg'

function Blogs() {
    return (
        <div className="blogs">
            <h1>Blogs</h1>
            <p>This is the blog page.</p>
            <div className="blog-container">
                <div className="blog-entry">
                    <div className="top-image">
                        <img src={ blogimage } alt="boulder" />
                    </div>
                    <div className="bottom-content">
                        <span><h3>Location: </h3>Boulder</span>
                        <p>Donation: Tarp</p>
                        <p>Rating: </p>
                    </div>
                </div>
                <div className="blog-entry">
                <div className="top-image">
                        <img src={ blogimage } alt="boulder" />
                    </div>
                    <div className="bottom-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <p>Rating: </p>
                    </div>
                </div>
                <div className="blog-entry">
                <div className="top-image">
                        <img src={ blogimage } alt="boulder" />
                    </div>
                    <div className="bottom-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <p>Rating: </p>
                    </div>
                </div>
                <div className="blog-entry">
                <div className="top-image">
                        <img src={ blogimage } alt="boulder" />
                    </div>
                    <div className="bottom-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <p>Rating: </p>
                    </div>
                </div>
                <div className="blog-entry">
                <div className="top-image">
                        <img src={ blogimage } alt="boulder" />
                    </div>
                    <div className="bottom-content">
                        <p>Location: Boulder</p>
                        <p>Donation: Tarp</p>
                        <p>Rating: </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogs;