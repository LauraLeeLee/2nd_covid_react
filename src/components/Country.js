import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Header from './Header.js';
import SelectedCountry from './SelectedCountry.js';
import DateComp  from './Date.js';
// import DayPicker from './DayPicker.js';
import { formatDate } from '../today-date.js';
// import { apiKey } from '../data/clientInfo.js';
// import { REACT_APP_API_KEY } from '../.env'; don't need to import the .env file, it is accessed with process.env.variableName

class Country extends Component {
  state = {
    apiData: [],
    selectCountry: '',
    selectedApiData: {},
    apiError: '',
    testSet: false,
    // selectState: '',
    // selectedStateApi: []
  }

  static propTypes = {
    selectedDate1: PropTypes.instanceOf(Date),
    formattedDate1: PropTypes.string,
    handleDateChange: PropTypes.func,
    name: PropTypes.string,
    componentName: PropTypes.string,
    handleCountryOrState: PropTypes.func,
  }


  handleChange =async(event) => {
    // console.log(event.value);
    await this.setState({selectCountry: event.value});
    // console.log("SELECTED: ", this.state.selectCountry)
    const formattedAgain = Moment(this.props.formattedDate1).format('YYYY-MM-DD');
    // console.log(formattedAgain);
    this.selectedCountryFetch(this.state.selectCountry, formattedAgain);
    // this.displayErrorMessage();
  }

  displayErrorMessage = () => {
    const errorEl = document.getElementsByClassName('api-error');
    // console.log('error el:', errorEl[0]);
    // console.log('api error: ',this.state.apiError);

    let dataDiv;
    // console.log(this.state.selectedApiData.length);
    if(Object.keys(this.state.selectedApiData).length > 0) {
      console.log('%c%s','background: #1233c4; color: #fff;',"DISPLAYERRORMESSAGE FIRED");
      dataDiv = document.getElementsByClassName('selected-data-div');
      // console.log(dataDiv[0]);
    }

    // const checkObject = this.state.selectedApiData.response === 0;
    // console.log(errorEl[0]);
    // console.log(this.state.apiError);
    // console.log(this.state.selectedApiData.response[0]);
    // console.log('what is api error name: ', this.state.apiError.name);
    // console.log('selected api data', this.state.selectedApiData);
    // console.log('checkObject: ',checkObject);

    if(this.state.testSet === true) {
      errorEl[0].style.display = 'block';
        // checks to make sure dataDiv is rendered.
      if(dataDiv[0]) {
      dataDiv[0].style.display = 'none';
      }
      console.error('TypeError');
      this.setState({apiError: ''});
    } else {
      errorEl[0].style.display = 'none';
      dataDiv[0].style.display = 'inline-block';
      console.log('%c%s','background: #1233c4; color: #fff;','NoTypeError');
    }
  }

fetchCovid = async (country) => {
  const API_KEY = process.env.REACT_APP_COUNTRIES_API_KEY;

  await fetch(
    `https://covid-19-data.p.rapidapi.com/country?format=json&name=${country}`,
    // `https://covid-19-data.p.rapidapi.com/report/country/name?date=${inputDate}&name=$(country)`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      }
    }
  )
  .then(response => response.json()
  ).then(data => {
    console.log("fetchCovd:", data);
    // console.log(data[0].country);
    // console.log('date-', data[0].lastChange);

    this.setState({apiData: [...this.state.apiData, data]});
    // console.log('the-state:', this.state);
    if(this.state.apiData.length > 0) {
    // console.log(this.state.apiData[0][0].confirmed, this.state.apiData[1], this.state.apiData[2]);
    }
    return data;
  })
    .catch(err => {
      console.log(err);
  });
}// end fetchCovid


selectedCountryFetch = async (country, date) => {
  console.log('selected country in fetch', country);
  const API_KEY2 = process.env.REACT_APP_COUNTRIES_API_KEY;
  console.log('%c%s','background: #1233c4; color: #fff;',"SELECTED FETCH FIRED");
  console.log('%c%s','background: #1233c4; color: #fff;','date: ', date);
  console.log('%c%s','background: #1233c4; color: #fff;','selected country: ', country);
  const response = await fetch(
    `https://covid-193.p.rapidapi.com/history?day=${date}&country=${country}`,
    {
      'method': 'GET',
      'headers': {
        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
        'x-rapidapi-key': API_KEY2,
      }
    }
  )
  .then(response => response.json()
  ).then(data => {
    console.log("fetchSelected:", data);
    // console.log(country);
    console.log(data);
    // console.log(data.response[0]);
    // console.log((typeof data.response[0]) != "undefined");
    // console.log(data.response[0].cases.total);
    // console.log(data.response[0].deaths.total);
  this.setState({selectedApiData: data});
    // console.log('selected state:', this.state.selectedApiData);
    if((typeof data.response[0]) === "undefined") {
      this.setState({testSet: true});
    } else {
      this.setState({testSet: false});
    }
    // if(this.state.selectedApiData.length !== 0) {
    // // console.log(this.state.selectedApiData.response[0].cases.total);
    // }
    return data;
  }).catch(err => {
    this.setState({apiError: err.name, testSet: true});
      console.warn("CATCH runs");
      console.error(err);
      console.error(err.name);
      // this.forceUpdate();
  }).finally(err => {
    // console.log(this.state.apiError);
    // console.log('test set state: ', this.state.testSet);

    this.displayErrorMessage();
  });
}

componentDidMount() {
  this.props.handleCountryOrState("country-component");

  this.fetchCovid('USA');
  setTimeout(function() {
    this.fetchCovid('Italy')
  }.bind(this), 1500);
  setTimeout(function() {
    this.fetchCovid('Australia')
  }.bind(this), 3000);

  this.setState({
    name: "country-component"
  });
}


render() {
  const { name } = this.state;
  const {selectedDate1, formattedDate1, componentName } = this.props;
  const {apiData, selectedApiData, selectCountry, apiError} = this.state;
  // console.log('selected country api:', selectedApiData);
  // console.log("apiError in render()",this.state.apiError);

  const errorEl = document.getElementsByClassName('api-error');
  // console.log('error el:', errorEl[0]);

  let reformatted;
  console.log("apiData length", apiData.length);
  if(apiData.length>0){
    console.log("apiData countries: ", apiData);
  }
  if(apiData.length> 0) {
    const dataDate = apiData[0][0].lastUpdate;
    const date = new Date(dataDate);
    const year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if(month < 10) {
      month = '0' + month;
    }
    reformatted = `${month}/${dt}/${year}`;
    // console.log(reformatted);
  }

  return (
      <div>
        <Header />
        <h3>Country Data</h3>
        {apiData.length > 0 && apiData.map(data =>
        <div key={data[0].code}
          className="data-div">
          <p> <span className="data-titles">Date:</span> {formatDate(data[0].lastUpdate) || "Date not loaded"}</p>
          <p> <span className="data-titles">Country:</span> {data[0].country || "country name not loaded"}</p>
          <p> <span className="data-titles">Confirmed Cases:</span> {data[0].confirmed.toLocaleString() || "confirmed cases not loaded"}</p>
          <p> <span className="data-titles">Deaths:</span> {data[0].deaths.toLocaleString() || 0 ||  "total deaths not loaded"}</p>
        </div>
        )}

        <h2>Select date and country</h2>
      <DateComp selectedDate1={selectedDate1}
                formattedDate1={formattedDate1}
                handleDateChange={this.props.handleDateChange}
                name={name}
                componentName={componentName}
                />
      {/* <DayPicker />               */}
      <SelectedCountry  selectCountry={selectCountry}
                        handleChange={this.handleChange}
                        selectedApiData={selectedApiData}
                        apiError={apiError}
                        />
      {/* {selectedApiData.length > 0 && selectedApiData.map(data =>
          <div key={data.code}
          className="data-div">
        <p> <span className="data-titles">Date:</span> {data.lastUpdate || "Date not loaded"}</p>
        <p> <span className="data-titles">Country:</span> {data.country || "country name not loaded"}</p>
        <p> <span className="data-titles">Confirmed Cases:</span> {data.confirmed || "confirmed cases not loaded"}</p>
        <p> <span className="data-titles">Deaths:</span> {data.deaths || 0 }</p>
      </div>
        )}
                         */}
    </div>
  )
}
}
export default Country;