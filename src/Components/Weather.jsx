import React, { Component } from "react";
import "./Weather-Box.css";
import bootstrap from "bootstrap/dist/css/bootstrap.css";

class Weather extends Component {
  state = {
    loading: true,
    weather: [],
    location: "",
  };

  componentDidMount() {
    //how to use this dynamically: may need to set this up as a different render to feed this component location via props

    fetch("https://freegeoip.app/json/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ location: data });
      });
    fetch(
      //need to figure a good way to dynamically alter the location based off the above data
      `http://api.weatherstack.com/current?access_key=018e1f64a66c47e9d00410505708983b&query=$Chicago`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ weather: data, loading: false });
      });
  }
  render() {
    const { weather, loading, location } = this.state;

    return (
      <div className="container weather-box">
        {console.log(location)}
        {loading ? (
          <h1>Loading ...</h1>
        ) : (
          <>
            <h1>
              {weather.location.name}, {weather.location.region}
            </h1>
            <h1>{((weather.current.temperature / 5) * 9 + 32).toFixed(1)} </h1>
            <h3>{weather.current.weather_descriptions[0]}</h3>
            <img src={weather.current.weather_icons[0]} />
          </>
        )}
      </div>
    );
  }
}

export default Weather;
