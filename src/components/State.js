import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './Header.js';
import SelectedState from './SelectedState.js';
import  DateComp  from './Date.js';
import { yesterday, formatDate2 } from '../today-date.js';

class StateComp extends React.Component {
  state = {
    apiData2: [],
    apiProvinces: [],
    myProvinces: []
  }

  static propTypes = {
    selectedDate2: PropTypes.instanceOf(Date),
    formattedDate2: PropTypes.string,
    componentName: PropTypes.string,
    handleDateChange: PropTypes.func,
    handleCountryOrState: PropTypes.func,
  }

fetchStateCovid = async(state, date) => {
  const response = await fetch(
    `https://api.covidtracking.com/v1/states/${state}/${date}.json`
  )
  .then(response => response.json()
  ).then(data => {
    // console.log(`${state} ${date}`);
    // console.log(data.positive);
    // console.log(data.death);
    // console.log("newApiData:", data);
    this.setState({apiData2: [...this.state.apiData2, data]});
    // console.log'%c%s','background: #fcf40f; color: #000;','stateData', this.state.apiData2);
  }).catch(err => {
    console.log(err);
  });
}

  componentDidMount() {

    this.props.handleCountryOrState("state-component");

    this.fetchStateCovid('pa', yesterday);
    // this.fetchStateCovid('ca', yesterday);
    this.fetchStateCovid('fl', yesterday);
    this.fetchStateCovid('nc', yesterday);
    // this.fetchStateCovid('ga', yesterday);
    // this.fetchStateCovid('az', yesterday);
    console.log(yesterday);
  }

  render() {
    const {apiData2 } = this.state;
    // console.log('%c%s','background: #fcf40f; color: #000;',"state api", apiData2);
    const {selectedDate2, formattedDate2, componentName} = this.props;
    // console.log('%c%s','background: #fcf40f; color: #000;', apiData2.length > 0 && apiData2.map(data =>
    //   data.positve.toLocaleString()));

    console.log('%c%s','background: #fcf40f; color: #000;',"state component componentName: ", componentName);

    return(
      <div>
        <Header />
        <h2>State Data</h2>
      { apiData2.length > 0 && apiData2.map(data =>
        <div className="data-div"
              key={data.state}>
          <p> <span className="data-titles">State:</span> {data.state || "State name not loaded"}</p>
          <p> <span className="data-titles">Date:</span> {formatDate2(data.date) || "Date not loaded"}</p>
          <p> <span className="data-titles">Confirmed Cases:</span> {data.positive.toLocaleString() || "confirmed cases not loaded"}</p>
          <p> <span className="data-titles">New Cases:</span> {data.positiveIncrease.toLocaleString() || 0 ||  "new cases not loaded"}</p>
          <p> <span className="data-titles">Deaths:</span> {data.death.toLocaleString() || 0 ||  "total deaths not loaded"}</p>
          <p> <span className="data-titles">New Deaths:</span> {data.deathIncrease.toLocaleString() || 0 ||  "new deaths not loaded"}</p>
        </div>
        )}
    <SelectedState selectedDate2={selectedDate2}
                   formattedDate2={formattedDate2}
                   handleDateChange={this.props.handleDateChange}
                   componentName={componentName}
                  />
    </div>
  )}
}

export default StateComp