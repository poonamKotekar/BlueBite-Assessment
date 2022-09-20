import React, {  PureComponent } from 'react'
import ImageCard from "./Image/ImageCard";
import ShowHideCard from "./ShowHideCard";
import _ from "lodash";

const locations = [
    {name: 'New York', id: 'new-york', selected : true, showImage: true},
    {name: 'Chicago', id: 'chicago', selected: false, showImage: false},
    {name: 'San Francisco', id: 'san-francisco', selected: false, showImage: false},
]
const locationsSFO = [
    {name: 'New York', id: 'new-york', selected : true, showImage: true},
    {name: 'Chicago', id: 'chicago', selected: false, showImage: false},
    {name: 'San Francisco', id: 'san-francisco', selected: false, showImage: false},
]
class Components extends React.Component <any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            selectedLocation: 'new-york',
            isImageHidden: false,
            locations: locations,
        }
        this.handleShowHideEvent = this.handleShowHideEvent .bind(this);
        this.updateComponentState = this.updateComponentState .bind(this);
    }


    handleShowHideEvent(event: { target: any; }) {
        this.setState({ isImageHidden: !this.state.isImageHidden});
        const updatedLocationProperties: any[] = []
        _.map(this.state.locations, (location) => {
            if(location.id === this.state.selectedLocation) {
                location.showImage= !location.showImage
            }
        });
    }
    updateComponentState(updatedLocations: any) {
        this.setState({locations: updatedLocations})
        this.render()
    }
    render() {

        return (
            <div className="container"  >
                <ShowHideCard {...this.state}  isImageHidden={this.state.isImageHidden}
                              handleShowHideEvent={this.handleShowHideEvent}></ShowHideCard>
                {this.state.locations.map((location: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<ImageCard> & Readonly<any> & Readonly<{ children?: React.ReactNode; }>, index: React.Key | null | undefined) =>
                    (<ImageCard key={index}  {...location}
                                updateComponentState ={this.updateComponentState}
                                isImageHidden={this.state.isImageHidden}
                    locations={this.state.locations}/>))}
            </div>
        )
    }
}
export default Components
