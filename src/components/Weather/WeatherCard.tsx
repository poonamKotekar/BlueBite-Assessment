import React, {  PureComponent } from 'react'
import _ from 'lodash'
import cloudy from '../../icons/cloudy.svg'
import clearDay from '../../icons/clear-day.svg'
import rain from '../../icons/rain.svg'
const weatherUrlObj = [
    {
        cloudy: cloudy
    },
    {
        'clear-day': clearDay
    },
    {
        rain: rain
    }
]
class WeatherComponent extends PureComponent <any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            locations : props.locations,
            isImageHidden: props.isImageHidden,
            isSelected: props.isSelected
        }

    }
    getUrlForWeatherCondition(weatherCondition: string) {
        if(weatherUrlObj != null ) {
            return weatherUrlObj
        }
    }
    render() {

        const sourceUrl = '/locations/'+this.props.selectedLocation+'.png';
        const imageDetails = this.props.componentData;
        const temperature = this.props.weatherDetails && this.props.weatherDetails.temperature;
        const currentCondition = this.props.weatherDetails && this.props.weatherDetails.condition;
        let currentConditionSrc ;
        const elements: { condition: string; dayOfTheWeek: any; src: string }[] = []
        if(this.props.weatherDetails.upcomming && this.props.weatherDetails.upcomming.length > 0) {
            this.props.weatherDetails.upcomming.map((detailsObj: { condition: string; day: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) =>{

                const conditionObj = this.getUrlForWeatherCondition(detailsObj.condition);
                const object = _.filter(conditionObj, detailsObj.condition)[0]
                if(detailsObj.condition == currentCondition) {
                    currentConditionSrc = _.values(object)[0]
                }
                elements.push( {condition: detailsObj.condition, dayOfTheWeek: detailsObj.day, src: _.values(object)[0] });
            })
        }
        const locations = this.props.locationProperties
        const isSelected = this.props.isSelected
        const isImageHidden = this.props.isImageHidden;
            return (
                <div>
                    <img className="ImageUrlClass" src={sourceUrl} style={{display: isImageHidden && isSelected ? 'block' : 'none' }}/>
                    <div className="WeatherClass" style={{display: isSelected ? 'block' : 'none' }}>
                        <div className="Location">{this.props.selectedLocation}</div>
                        <div className="WeatherCardContainer">
                            <img className="CurrentCondition" id={currentCondition} src={currentConditionSrc} />
                            <p className="temperature">{temperature}&deg;C</p>
                            <div className="RHSContainer">

                            {elements.map((elem, i) =>
                                <div  className="ImageContainer" key={i}>
                                    {/*<img className="TodayWeatherImage" src={elem.src} alt={imageDetails.alt} />*/}
                                    <p className="DayOfTheWeek">{elem.dayOfTheWeek}</p>
                                    {<img className="ForecastImage" src={elem.src} />}
                                </div>
                            )}
                            </div>
                        </div>
                        </div>
                    </div>
            )
        }
}
export default WeatherComponent

