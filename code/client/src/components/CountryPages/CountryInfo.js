import React from 'react';
import './CountryInfo.css';
import { Link } from 'react-router-dom';
import WorldMapImage from '../../images/Map_soon.svg';


class CountryInfo extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props.data);
        this.state = {
            countryName: "boo",
            languages: "",
            GNI: "",
            HDIRank: "",
            averageSchooling: "",
            cleanWaterAccess: "",
            electricityAccessRuralPop: "",
            electricityAccessTotalPop: "",
            lifeExpectancy: "",
            popUrbanPercent: "",
            population: "",
            povertyPercent: ""
        }
    }
    
    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data) {
            if (this.props.data !== null) {
                this.setState({
                    countryName: this.props.data.countryName ? this.props.data.countryName : "No Data Available",
                    languages: this.props.data.generalInformation.languages[0] ? this.props.data.generalInformation.languages[0] : "No Data Available",
                    GNI: this.props.data.statistics.GNI ? this.props.data.statistics.GNI.$numberDecimal: "No Data Available",
                    HDIRank: this.props.data.statistics.HDIRank ? this.props.data.statistics.HDIRank.$numberDecimal : "No Data Available",
                    averageSchooling: this.props.data.statistics.averageSchooling ? this.props.data.statistics.averageSchooling.$numberDecimal : "No Data Available",
                    cleanWaterAccess: this.props.data.statistics.cleanWaterAccess ? this.props.data.statistics.cleanWaterAccess.$numberDecimal : "No Data Available",
                    electricityAccessRuralPop: this.props.data.statistics.electricityAccessRuralPop ? this.props.data.statistics.electricityAccessRuralPop.$numberDecimal : "No Data Available",
                    electricityAccessTotalPop: this.props.data.statistics.electricityAccessTotalPop ? this.props.data.statistics.electricityAccessTotalPop.$numberDecimal : "No Data Available",
                    lifeExpectancy: this.props.data.statistics.lifeExpectancy ? this.props.data.statistics.lifeExpectancy.$numberDecimal : "No Data Available",
                    popUrbanPercent: this.props.data.statistics.popUrbanPercent ? this.props.data.statistics.popUrbanPercent.$numberDecimal : "No Data Available",
                    population: this.props.data.statistics.population ? this.props.data.statistics.population.$numberDecimal : "No Data Available",
                    povertyPercent: this.props.data.statistics.povertyPercent ? this.props.data.statistics.povertyPercent.$numberDecimal : "No Data Available"

                })
               // console.log("This is the country data: ", this.props.data);
                
                    //console.log(this.props.data);
                }
            }
        
    }    
    render() {
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
                        <div className="info-row">Most Common Languages</div>
                        <div className="info-row">Gross National Income (GNI) (2018)</div>
                        <div className="info-row">Human Development Index (HDI) Rank (2018)</div>
                        <div className="info-row">Average Years of School (2018)</div>
                        <div className="info-row">% Population with Clean Water Access (2017)</div>
                        <div className="info-row">% Rural Population with Electricity Access</div>
                        <div className="info-row">% Total Population with Electricity Access</div>
                        <div className="info-row">Life Expectancy (years) (2018)</div>
                        <div className="info-row">% Population Urban</div>
                        <div className="info-row">Total Population (millions) (2018)</div>
                        <div className="info-row">% Population in Poverty</div>
                    </div>
                    <div className="info-results-column">
                        <div className="info-results-row">{this.state.languages}</div>{/*Languages*/}
                        <div className="info-results-row">{this.state.GNI}</div>{/*GNI*/}
                        <div className="info-results-row">{this.state.HDIRank}</div>{/*HDI*/}
                        <div className="info-results-row">{this.state.averageSchooling}</div>
                        <div className="info-results-row">{this.state.cleanWaterAccess}</div>
                        <div className="info-results-row">{this.state.electricityAccessRuralPop}</div>
                        <div className="info-results-row">{this.state.electricityAccessTotalPop}</div>
                        <div className="info-results-row">{this.state.lifeExpectancy}</div>
                        <div className="info-results-row">{this.state.popUrbanPercent}</div>
                        <div className="info-results-row">{this.state.population}</div>
                        <div className="info-results-row">{this.state.povertyPercent}</div>

                    </div>
                </div>
            </div>
        )
    }
    
}

export default CountryInfo;