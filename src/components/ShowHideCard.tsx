import React from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import _ from "lodash";

class ShowHideCard extends React.Component <any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            isImageHidden: props.isImageHidden,
            locations: props.locations
        }
        this.handler = this.handler .bind(this);
    }
    handler(event: any) {
        this.props.handleShowHideEvent(event)
    }
render() {
        let showHideButton;
        const isImageHidden = this.props.isImageHidden;
        const selectedLocation = this.state.selectedLocation;
        let city;
        if (!isImageHidden) {
            city = 'Show';
            showHideButton = <BsEye className="showHideClass" id="Show" name={selectedLocation} onClick={this.handler} />;
        } else {
            city = 'Hide';
            showHideButton = <BsEyeSlash className="showHideClass" id="Hide" name={selectedLocation}  onClick={this.handler} />;
        }
        const locationObj = _.filter(this.state.locations, (location) => location.id === selectedLocation )
        return (
            <div className="ImageClass" >
                <p className="LocationName">{city}</p>
                {showHideButton}
            </div>
        );
    }
}

export default ShowHideCard

