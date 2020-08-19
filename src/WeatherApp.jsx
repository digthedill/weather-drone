import React from "react";
import Weather from "./Components/Weather";

class WeatherApp extends React.Component {
  state = {
    location: "",
  };

  componentDidMount() {
    fetch("https://freegeoip.app/json/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ location: data.city });
      });
  }

  render() {
    return (
      <>
        <h1>{this.state.city}</h1>
        <Weather city={this.state.location} />
      </>
    );
  }
}

export default WeatherApp;
