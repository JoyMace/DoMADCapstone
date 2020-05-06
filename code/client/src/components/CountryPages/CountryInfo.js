import React from 'react';
import './CountryInfo.css';

//import { Link } from 'react-router-dom';

import WorldMapImage from '../../images/Map_soon.svg';


class CountryInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            abbr: null,
            currency: '',
            languages: [],
            GNI: '', 
            HDIrank: '',
            avgSchooling: '',
            waterAccess: '',
            electricityRuralPop: '',
            electricityTotal: '',
            lifeExpectancy: '',
            popUrbanPercent: '',
            popTotal: '',
            povertyPercent: ''
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data && this.props.data !== null) {
            let load = this.props.data[0];
            this.populateInfo(load);
        }
    }

    populateInfo(data) {
        console.log(data);
        this.setState({
            name: data.countryName,
            abbr: data.abbreviation,
            continent: data.generalInformation.continentName,
            currency: data.generalInformation.currency,
            electricityRuralPop: data.generalInformation.electricityAccessRuralPop,
            electricityTotal: data.statistics.electricityAccessTotalPop,
            popUrbanPercent: data.statistics.population,
            popTotal: data.statistics.population,
            GNI: data.statistics.GNI, 
            HDIrank: data.statistics.HDIRank,
            avgSchooling: data.statistics.averageSchooling,
            waterAccess: data.statistics.cleanWaterAccess,
            lifeExpectancy: data.statistics.lifeExpectancy,
            povertyPercent: data.statistics.povertyPercent,
            languages: data.generalInformation.languages.map((lang) => {
                return lang.substring(0, lang.indexOf(":"));
            })
        });
    }

    
    render() {
        let data = this.props.data[0];
        console.log(data);
        return (
            <div className="countryinfo">
                <div className="country-column1">
                    <div className="map-row">
                        <img src={ WorldMapImage } alt="map" className="map_image"/>
                    </div>
                    <div>
                        <p>Digit Code: {}</p>
                        <p>Continent:</p>
                        <p>{}</p>
                        <p>Currency:</p>
                        <p>{}</p>
                        <p>Languages:</p>
                        {/*this.state.languages.map(lang => {
                            return <p>{lang}</p>
                        });*/
                        }
                    </div>
                    <div className="below-map-row">
                        <p>Have a trip you'd like to share? Log In or Register to submit your info!</p>
                    </div>
                </div>
                <div className="country-column2">
                    <div className="info-column">
                        <div className="info-row"> Population (2018) </div>
                        <div className="info-row"> Electricity </div>
                        <div className="info-row"> Human Development Index (HDI) (2018) </div>
                        <div className="info-row"> Gross National Income per capita (GNI) (2018) </div>
                        <div className="info-row"> Average Schooling (in years) (2018) </div>
                        <div className="info-row"> Access to Clean Water (2017) </div>
                        <div className="info-row"> Life Expectancy (2018) </div>                        
                    </div>
                    <div className="info-results-column">
                        <div className="info-results-row">
                            <div> Total (millions): {/*this.state.popTotal*/} </div>
                            <div> Urban %: {/*this.state.popUrbanPercent*/} </div>
                            <div> Poverty %: {/*this.state.povertyPercent*/} </div>
                        </div>
                        <div className="info-results-row">
                            <div> Overall Access %: {/*this.state.electricityTotal*/} </div>
                            <div> Urban Access %: {/*this.state.electricityRuralPop*/} </div>
                        </div>
                        <div className="info-results-row"> {this.state.HDIrank} </div>
                        <div className="info-results-row"> {this.state.GNI} </div>
                        <div className="info-results-row"> {this.state.avgSchooling} </div>
                        <div className="info-results-row"> {this.state.waterAccess} </div>
                        <div className="info-results-row"> {this.state.lifeExpectancy} </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CountryInfo;