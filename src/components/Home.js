import React from 'react';
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Moment from 'moment';
import Header from './Header.js';
// import Country from './Country.js';
// import StateComp from './State.js';

class Home extends React.Component {
  state = {
    worldData: []
  }

worldTotalFetch = async () => {
  const API_KEY = process.env.REACT_APP_COUNTRIES_API_KEY;
  await fetch("https://covid-19-data.p.rapidapi.com/totals", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
    }
  })
  .then(response => response.json()
  ).then(data => {
    // console.log("fetch world data: ", data);
    this.setState({worldData: data});
    return data;
  })
  .catch(err => {
    console.error(err);
  });
}

componentDidMount() {
  this.worldTotalFetch();
}
  render() {
    const {worldData} = this.state;
    // console.log(worldData);

    // const newToday = new Date();
    // let date = newToday.getDate();
    // let month = newToday.getMonth()+1;
    // const year = newToday.getFullYear();
    // const today = month + ' ' + date +',' + ' ' + year;

    let today = new Date().toLocaleString('en-us', {month: 'long', year: 'numeric', day: 'numeric'});
    // console.log("today: ", today);

    // if(worldData.length > 0 ) {
    //   const confirmed = worldData[0].confirmed;
    //   const deaths = worldData[0].deaths;
    //   console.log(confirmed, deaths);
    //   worldData.map(data => {
    //     console.log(data[0].confirmed)})
    //   }
    // }
    return  (
      <div className="covid-wrap">
        <Header />

        <div className="welcome-div">
          <h3 className="welcome"><span className="first-letter">W</span>elcome!</h3>
          <p>Search for Covid19 data
            for countries or for US states</p>
        </div>

        <div className="world-data">
        <h3>World Totals Today { today }</h3>
      {worldData.length > 0 && worldData.map(data =>
        <div key="today-world" className="today-world">
          <p><span className="confirmed">Confirmed:</span>{data.confirmed.toLocaleString() || "Data not loading"}</p>
          <p><span className="deaths">Deaths:</span>{data.deaths.toLocaleString() || "Data not loading"}</p>
        </div>
        )
      }
        </div>
    </div>
    )
  }
}

export default Home;