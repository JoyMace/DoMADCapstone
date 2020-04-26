import React from 'react';
import './CountryInfo.css';
import { Link } from 'react-router-dom';

import WorldMapImage from '../../images/Map_soon.svg';


class CountryInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cname: null,
            genInfo: null,
            statistics: null
        };
    
        this.getInfo = this.getInfo.bind(this);
        this.fillCountryInfo = this.fillCountryInfo.bind(this);
    }

    getInfo = async (country) => {
        let ping_CI = '/api/country-page/country/get-country-info?country=' + country;
        const response = await fetch(ping_CI);
        const data = await response.json();

        if (response.status !== 200) {
            throw Error(data.message);
        } 
        else {
            console.log('received country info.');
            let dataJSON = data.countryInfoData;
            let abbr = dataJSON.abbreviation;
            let name = dataJSON.countryName;
            console.log('INFO:', name, abbr);
            // send to self to populate, callback to tabs
            //fillCountryInfo(dataJSON);
            return [name, abbr];
        }
    }

    fillCountryInfo(countryJSON) {
        //console.log(countryJSON);
        this.setState({
            name: countryJSON.countryName,
            genInfo: countryJSON.generalInformation,
            statistics: countryJSON.countryInfoData.statistics
        });
    }
    

    render() {
        return (
            <div className="countryinfo">
                <div className="country-column1">
                    <div className="map-row">
                        <img src={ WorldMapImage } alt="map" className="map_image"/>
                    </div>
                    <div className="below-map-row">
                        <p>
                            Have a trip you'd like to share? Log In or Register to submit your info!
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
                        <div className="info-results-row">% Pop. Below Poverty Level Info</div>
                        <div className="info-results-row">% Pop. in Urban Areas Info</div>
                        <div className="info-results-row">% Pop. in Rural Areas Info</div>
                        <div className="info-results-row">Air Quality Info</div>
                        <div className="info-results-row">Access to Clean Water</div>
                        <div className="info-results-row">Access to Electricity</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CountryInfo;