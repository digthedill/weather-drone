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
    fetch(
      //need to figure a good way to dynamically alter the location based off the above data
      //until I intersect the API requests => Charlotte will display
      `http://api.weatherstack.com/current?access_key=018e1f64a66c47e9d00410505708983b&query=${
        this.state.location || "charlotte"
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ weather: data, loading: false });
      });
    fetch("https://freegeoip.app/json/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ location: data.city });
      });
  }

  render() {
    const { weather, loading, location } = this.state;

    return (
      <div className="container">
        {loading ? (
          <div className="loading-screen">
            <h1>Loading ...</h1>
          </div>
        ) : (
          <div className="jumbotron weather-box">
            <div className="main">
              <h1>
                {weather.location.name}, {weather.location.region}
              </h1>
              <h1>
                {((weather.current.temperature / 5) * 9 + 32).toFixed(1)}{" "}
              </h1>
              <div className="row">
                <h4 className="col">
                  {weather.current.weather_descriptions[0]}
                </h4>
                <div className="col">
                  <img
                    src={weather.current.weather_icons[0]}
                    width="30"
                    height="30"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Weather;
