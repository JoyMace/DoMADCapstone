import React from 'react';
import './CountryInfo.css';
import mapfiller from '../../images/map_filler.PNG';
import { Link } from 'react-router-dom';

const CountryInfo = props => (
    <div className="countryinfo">
        <div className="country-column1">
            <div className="map-row">
                <img src={ mapfiller } alt="map" className="map_image"/>
            </div>
            <div className="below-map-row">
                <p>
                    Have a trip you'd like to share to CountryName? Click <Link to="/account" className="shareaccountlink">here</Link> to submit your info!
                </p>
            </div>
        </div>
        <div className="country-column2">
            <div className="info-column">
                <div className="info-row">Languages</div>
                <div className="info-row">Population</div>
                <div className="info-row">Human Development Index (HDI)</div>
                <div className="info-row">% Pop Below Poverty Level</div>
                <div className="info-row">% Pop in Urban Areas</div>
                <div className="info-row">% Pop in Rural Areas</div>
                <div className="info-row">Air Quality</div>
                <div className="info-row">Access to Clean Water</div>
                <div className="info-row">Access to Electricity</div>
            </div>
            <div className="info-results-column">
                <div className="info-results-row">Languages Info</div>
                <div className="info-results-row">Population Info</div>
                <div className="info-results-row">Human Development Index (HDI) Info</div>
                <div className="info-results-row">% Pop Below Poverty Level Info</div>
                <div className="info-results-row">% Pop in Urban Areas Info</div>
                <div className="info-results-row">% Pop in Rural Areas Info</div>
                <div className="info-results-row">Air Quality Info</div>
                <div className="info-results-row">Access to Clean Water</div>
                <div className="info-results-row">Access to Electricity</div>
            </div>
        </div>
    </div>
);

export default CountryInfo;