import React from 'react';
import './CountryInfo.css';
import { Link } from 'react-router-dom';

import mapfiller from '../../images/map_filler.PNG';


class CountryInfo extends React.Component {
    constructor(props) {
        super(props);

        this.getInfo = this.getInfo.bind(this);
    }

    getInfo = async (country) => {
        // blogposts & donation items - OK
        // let ping_BP_DI = '/api/user/trip/all-trips?country=' + country;
        // Organizations - TEST
        // let ping_O = '/api/country-page/country/get-organizations?country=' + country;
        
        try {
            let info_ping = '/api/country-page/country/get-country-info?country=' + country;
            const response = await fetch(info_ping);
            const data = await response.json();

            console.log('STATUS:', response.status);
            if (response.status !== 200) {
                console.log('BAD COUNTRY, NOT FOUND:', response.status)
                //throw Error(data.message);
                return [false, null];
            } 
            else {
                this.callbackJSON = data.countryInfoData;
                this.setState({
                    name: data.countryInfoData.countryName,
                    abbr: data.countryInfoData.abbreviation,
                    genInfo: data.countryInfoData.generalInformation,
                    statistics: data.countryInfoData.statistics
                });
                console.log(this.state.name, this.state.abbr);
                console.log(this.state.genInfo);
                console.log(this.state.statistics); 
                //if (data.countryInfoData.generalInformation === null) {}
                return [true, this.state.abbr];
            }
            
        } catch (error) {
            console.log("DATA GET CAUGHT ERROR: ", error);
            throw error;
        }
    }

    /*getTrips = async () => {        
        if(countryselected === false) {
            const response = await fetch('/api/user/trip/all-trips');
            const data = await response.json();
            console.log("The main api was called.")
            if (response.status !== 200) {
                throw Error(response.message)
            }
            return data;
        } else {
            var response2 = await fetch(this.state.countryAppend);
            response2 = await fetch(this.state.countryAppend);
            console.log(response2);
            console.log("This api was called.");
            const data2 = await response2.json();
            console.log("This api was called.");
            if (response2.status !== 200) {
              throw Error(response2.message)
            }
            return data2;
        }
    };*/

    render() {
        return (
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
        )
    }
}

export default CountryInfo;