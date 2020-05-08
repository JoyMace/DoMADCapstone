import React from 'react';
import './Organizations.css';
import WorldMapImage from '../../images/Map_soon.svg';
import { Link } from 'react-router-dom';

class Organizations extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            orgsData: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data)
        {
            if (this.props.data !== null) {

                this.setState({
                    orgsData: this.props.data.organizations
                })
                console.log("Component did update in Organizations class: " , this.props.data.organizations);                
            }
        }
    }
    render () {
        let orgs = this.state.orgsData
        let org = orgs[0]        
        //console.log(orgs[1]);
        //console.log(org);
        for (var i in orgs)
        {
            console.log(orgs[i]['link']); // jfc
            
        }
        return (
            <div className="organizations">
                <div className="organizations-column1">
                    <div className="map-row">
                        <img src={ WorldMapImage } alt="map" className="map_image"/>
                    </div>
                    <div className="below-map-row">
                        <p>Have a trip you'd like to share? Log In or Register to submit your info!</p>
                    </div>
                </div>
                <div className="organizations-column2">                    
                    <div className="orginfo-col">
                    <h3 className="country-organizations-header">Organization Name</h3>
                        {orgs.map(item =>
                        <div className='organization-list'>
                            <h4  key={item['_id']}>{item['orgName']} </h4>
                        </div>
                            )}
                    </div>
                    <div className="orginfo-col">
                    <h3 className="country-organizations-header">Organization Webiste Link</h3>
                    {orgs.map(item =>
                        <div className='organization-list'>
                            <Link className="organization-links" to={item['link']} style={{paddingLeft: "20px", display: "block", marginBlockStart: "1.33em", marginBlockEnd: "1.33em"}}>{item['link']}</Link>
                        </div>
                            )}
                    </div>
                    
                </div>
            </div>
        );
        
    }
    
        
    

}


class OrgInfo extends React.Component {
    constructor(props) {
        super(props)
console.log(props);
    }
    
}
export default Organizations;