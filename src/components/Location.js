import React, {Component} from 'react';
import axios from 'axios';
import '../css/Location.css';

class Location extends Component {
    constructor(props) {
        super(props);
        this.toggleCelcius = this.toggleCelcius.bind(this);
        this.state = {
            location: 'Loading',
            country: 'Loading',
            latitude: '',
            longitude: '',
            weather: '',
            temperature: '',
            tempCelcius: '',
            id: '',
            icon: ''
        };
    }
    componentDidMount() {
        axios.get('http://ip-api.com/json').then(loc => {
            this.setState({location: loc.data.city, country: loc.data.country, latitude: loc.data.lat, longitude: loc.data.lon});
            axios.get('http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=imperial' + '&type=accurate' + '&APPID=8fd6d893c057f06c8178e93026a43e95').then(value => {
                this.setState({temperature: value.data.main.temp.toFixed(1), icon: value.data.weather[0].icon, weather: value.data.weather[0].description, id: value.data.weather[0].main, tempCelcius: ((value.data.main.temp - 32) * (5/9)).toFixed(1)});
                //Change background depending on weather
                switch (this.state.id) {
                    case 'Clouds':
                        document.querySelector('body').classList.add('cloud');
                        break;
                    case 'Rain':
                    case 'Thunderstorm':
                    case 'Drizzle':
                        document.querySelector('body').classList.add('rain');
                        break;
                    case 'Sunny':
                        document.querySelector('body').classList.add('sun');
                        break;
                    case 'Clear':
                        document.querySelector('body').classList.add('clear');
                        break;
                    case 'Snow':
                        document.querySelector('body').classList.add('snow');
                        break;
                    case 'Atmosphere':
                        document.querySelector('body').classList.add('atmosphere');
                        break;
                    case 'Extreme':
                        document.querySelector('body').classList.add('extreme');
                        break;

                    default:

                }

            });
        });
    }

    toggleCelcius() {
      var element = document.querySelector('.temperature').innerText;
      if (element.indexOf('F') > -1) {
        document.querySelector('.temperature').innerHTML = this.state.tempCelcius + '° C';
      }
      else{
        document.querySelector('.temperature').innerHTML = this.state.temperature + '° F';
      }
    }
    render() {

        return (
            <div className="Location">
                <h1>Local Weather App</h1>
                <div className="mapmarker">
                    <i className="fa fa-map-marker fa-1x"></i>
                    <span className="stateCountry">{this.state.location}, {this.state.country}</span>
                </div>

                <div className="weatherState">
                    <p className="temperature">{this.state.temperature}° F</p>
                    <button onClick={this.toggleCelcius}>F/C</button>
                    <p className="weather">
                        {this.state.weather}<span><img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt={'Weather Icon'}/></span>
                    </p>

                </div>
            </div>

        );
    }
}

export default Location;
