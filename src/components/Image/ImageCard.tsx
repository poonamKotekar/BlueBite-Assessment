import React from 'react'
import _ from 'lodash';
import WeatherCard from "../Weather/WeatherCard";

class ImageComponent extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            imageDetails: '',
            componentData: [],
            optionData: [],
            weatherDetails: [],
            isImageDetailsPresent : false,
            isLocationClicked: false,
            isImageHidden: props.isImageHidden,
            selectedLocation: props.id,
            locations: props.locations,
            locationProperties: {
                name: props.name,
                id: props.id,
                selected : props.selected,
                showImage: props.showImage
            }
        };
        this.handleLocationClick = this.handleLocationClick .bind(this);
        this.initDefaultLocationData(this.state.selectedLocation);
   }
    handleLocationClick(event: { target: any; }) {
        const location = (event.target && event.target.id);
        this.setState({selectedLocation: location, isLocationClicked: true});
        let _locations: any[] = []
        this.getImageData(location). then((data) => {
            this.setImageDetails(data)
            this.setComponentData(data.data.components);
            this.setLatLonForLocation(data.data.components)


            _.map(this.state.locations, (locationData) => {
                if(location !== locationData.id) {
                    locationData.selected= false;
                    locationData.showImage= false;
                } else {
                    locationData.selected = true;
                    locationData.showImage = true;
                    this.setState({locationProperties: {
                            name: locationData.name,
                            id: locationData.id,
                            selected: true,
                            showImage: true
                        }})
                }
                _locations.push(locationData)
            });
            this.setState({locations: _locations});
            this.props.updateComponentState(_locations);

        })


    }
    initDefaultLocationData(location : string) {
        this.setState({selectedLocation: location,isLocationClicked : false });
        this.getImageData(location). then((data) => {
            this.setImageDetails(data)
            this.setComponentData(data.data.components);
            this.setLatLonForLocation(data.data.components)
        });
    }
    setComponentData(componentData: any) {
        const _componentData = _.filter(componentData, eachItem => eachItem.type === 'image');
        if(_componentData[0] && _componentData[0].options) {
            this.setState({componentData: _componentData[0].options});
        }

    }
    setLatLonForLocation(optionData: any) {
        const _optionData = _.filter(optionData, eachItem => eachItem.type === 'weather');
        this.getWeatherData(_optionData[0].options). then((weatherData) => {
            this.setState({weatherDetails: weatherData.data });
        });
        this.setState({optionData: _optionData[0].options});
    }
    getWeatherData = async(latLonObject: { lat: any; lon: any; }) =>  {
        const result = await fetch(`/integration/weather?lat=${latLonObject.lat}&lon=${latLonObject.lon}`)
        return await result.json();
    }
    componentDidMount() {

    }
    getNormalizedData(_data: any) {
        let variableNames: { options: Boolean; tempVar: any; }[] = [];
        _data.data && _.forEach(_data.data.variables, function(value, key) {
            _.forEach(_data.data.components, (component: {
                options: any;
                tempVar: any; }) =>{
                 if (component && component.options) {
                     const temp =  component.options;
                     const tempStr = component.options.variable;
                     if(tempStr === value.name) {
                         variableNames.push(component)
                     }
                 }
            })
        });
        return [];
    }

    setImageDetails(data: any){
        const normalizedData = this.getNormalizedData(data);
        this.setState({imageDetails: data, isImageDetailsPresent: true});
    }

   getImageData = async(id: string) =>  {
        const result = await fetch(`/page/${id}`, {method: 'GET'})
        return await result.json();
    }
    render() {
        const isImageHidden = this.props.isImageHidden;
        const locationProperties = this.props
        const isSelected = locationProperties.selected
            return (
                <div>
                    <div className="ImageClass" style={{display: isSelected ? 'none' : 'block' }}>
                        <p className="LocationName">{this.props.name}</p>
                        <div style={{display: locationProperties.selected ? 'none' : 'block' }} className="pin"
                             id={this.props.id} onClick={this.handleLocationClick}>
                            <div className="innerPin"  id={this.props.id} onClick={this.handleLocationClick}></div>
                        </div>
                    </div>
                    <WeatherCard {...this.state}
                                 isSelected={isSelected}
                                 style={{display: isSelected ? 'block' : 'none' }} isImageHidden={isImageHidden}  />
                </div>

            )

    }
}
export default ImageComponent

