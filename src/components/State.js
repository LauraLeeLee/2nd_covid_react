import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header.js';
import SelectedState from './SelectedState.js';
// import  DateComp  from './Date.js';
import { formatDate } from '../today-date.js';

class StateComp extends React.Component {
  state = {
    apiData2: [],
    stateData: [],
    apiProvinces: [],
    myProvinces: [],
    // selectState: '',
    // selectedApi: [],
    stateApiError: false,
  }

  static propTypes = {
    selectedStateDate1: PropTypes.instanceOf(Date),
    formattedStateDate1: PropTypes.string,
    componentName: PropTypes.string,
    handleDateChange: PropTypes.func,
    handleCountryOrState: PropTypes.func,
  }

fetchStateCovid = async(state, date) => {
  await fetch(
    `https://api.covidtracking.com/v1/states/${state}/${date}.json`
  )
  .then(response => response.json()
  ).then(data => {
    // console.log(`${state} ${date}`);
    // console.log(data.positive);
    // console.log(data.death);
    // console.log("newApiData:", data);
    this.setState({apiData2: [...this.state.apiData2, data]});
    // console.log('%c%s','background: #fcf40f; color: #000;','stateData', this.state.apiData2);
  }).catch(err => {
    console.log(err);
  });
}

  fetchStateAPI = async(state) => {
    // console.log("what state in api?", state);
    // await fetch(` https://api.theuscovidatlas.org/domain/v1/lisa/?state=il&category=data&start=20200901&end=20201001&type=death`
    // await fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global_and_us?country=US&state=Pennsylvania&min_date=2020-04-22T00:00:00.000Z&max_date=2020-04-27T00:00:00.000Z&hide_fields=_id,%20country,%20country_code,%20country_iso2,%20country_iso3,%20loc,%20state`
    await fetch(`https://api.covidactnow.org/v2/state/${state}.timeseries.json?apiKey=c2e7c321b9384535b36fd92e1fc64bd5`
    ).then(response => response.json()
    ).then(data => {
        // console.log("newAPIdata: ", data);
        // console.log("stateName:", data.state);
        // console.log("stateCases: ", data.actuals.cases);
        // console.log("date: ", data.actualsTimeseries[0].date);
        // console.log("check if date ", data.actualsTimeseries.some(d => d.date === "2021-04-21"));
        this.setState({stateData: [...this.state.stateData, data]});
        console.log("trialStateData: ", this.state.stateData);
    }).catch(err => {
      console.log('%c%s', 'color: yellow; background: red; font-size: 24px;', err);
    });
  }

  componentDidMount() {
    this.props.handleCountryOrState("state-component");
    // console.log(yesterday);

    this.fetchStateAPI('PA');

    setTimeout(function() {
      this.fetchStateAPI('FL');
    }.bind(this), 1000);

    setTimeout(function() {
      this.fetchStateAPI('NC');
    }.bind(this), 1500);
  }

  render() {
    const {apiData2, stateData} = this.state;
    // console.log('%c%s','background: #fcf40f; color: #000;',"state api", apiData2);
    const {selectedStateDate1, formattedStateDate1, componentName} = this.props;
    // console.log('%c%s','background: #fcf40f; color: #000;', apiData2.length > 0 && apiData2.map(data =>
    //   data.positve.toLocaleString()));

    // console.log('%c%s','background: #fcf40f; color: #000;',"state component componentName: ", componentName);

    let renderStateData;
    let timedData = stateData.actualsTimeseries;
    let selectedDate;

    // if(stateData.length > 0){
    //   stateData.map(data => {
    //     console.log(data.state);
    //     console.log(data.actuals.cases);
    //     console.log(data.lastUpdatedDate);
    //     console.log(data.actualsTimeseries[0].date);
    //   })
    // }

    return(
      <div>
        <Header />
        <h2>State Data</h2>

      {renderStateData}
      {stateData.length > 0 && stateData.map(data =>
        <div key={data.state}
            className="data-div">
          <p> <span className="data-titles">State:</span> {data.state || "State name not loaded"}</p>
          <p> <span className="data-titles">Date:</span> {formatDate(data.lastUpdatedDate) || "Date not loaded"}</p>
          <p> <span className="data-titles">Total Confirmed Cases:</span> {data.actuals.cases.toLocaleString() || "confirmed cases not loaded"}</p>
          <p> <span className="data-titles">Total Deaths:</span> {data.actuals.deaths.toLocaleString() || 0 ||  "total deaths not loaded"}</p>
          <p> <span className="data-titles">New Cases:</span> {data.actuals.newCases.toLocaleString() || 0 ||  "new cases not loaded"}</p>
          <p> <span className="data-titles">New Deaths:</span> {data.actuals.newDeaths.toLocaleString() || 0 ||  "new deaths not loaded"}</p>


        </div>
        )
      }

        <SelectedState selectedStateDate1={selectedStateDate1}
                    formattedStateDate1={formattedStateDate1}
                    handleDateChange={this.props.handleDateChange}
                    componentName={componentName}
                    // selectState={selectState}
                    // selectApi={selectApi}
                    // sateApiError={stateApiError}
                  />
    </div>
  )}
}

export default StateComp

  {/* { apiData2.length > 0 && apiData2.map(data =>
        <div className="data-div"
              key={data.state}>
          <p> <span className="data-titles">State:</span> {data.state || "State name not loaded"}</p>
          <p> <span className="data-titles">Date:</span> {formatDate2(data.date) || "Date not loaded"}</p>
          <p> <span className="data-titles">Total Confirmed Cases:</span> {data.positive.toLocaleString() || "confirmed cases not loaded"}</p>
          <p> <span className="data-titles">Total Deaths:</span> {data.death.toLocaleString() || 0 ||  "total deaths not loaded"}</p>
          <p> <span className="data-titles">New Cases:</span> {data.positiveIncrease.toLocaleString() || 0 ||  "new cases not loaded"}</p>
          <p> <span className="data-titles">New Deaths:</span> {data.deathIncrease.toLocaleString() || 0 ||  "new deaths not loaded"}</p>
        </div>
        )} */}

        //     if(Object.keys(stateData).length !== 0) {
//       console.log(stateData);
//       console.log(timedData.some(d => d.date === "2021-04-21" ));

//       selectedDate = timedData.filter(d => d.date === "2021-04-21");
//       selectedDate.map(x => {
//           console.log("date: ", x.date);
//           console.log("Cases: ", x.cases);
//           console.log("deaths: ", x.deaths);
//           console.log("new cases: ", x.newCases);
//           console.log("new deaths: ", x.newDeaths);
//           console.log("vaccinations completed: ", x.vaccinationsCompleated);
//           console.log("vaccinations administered: ", x.vaccinationsAdministered);
//     });
//   } else {
//     console.log("loading loading loading");
//       }

// if(Object.keys(stateData).length > 0 && Object.keys(selectedDate).length > 0) {
//   console.log("date for state: ", selectedDate);
//   console.log(selectedDate[0].date);
//   renderStateData =
//         <div className="data-div"
//             key={stateData.state}>
//           <p> <span className="data-titles">State:</span> {stateData.state || "State name not loaded"}</p>
//           <p> <span className="data-titles">Date:</span> {selectedDate[0].date || "Date not loaded"}</p>
//           <p> <span className="data-titles">Total Confirmed Cases:</span> {selectedDate[0].cases || "confirmed cases not loaded"}</p>
//           <p> <span className="data-titles">Total Deaths:</span> {selectedDate[0].deaths || 0 ||  "total deaths not loaded"}</p>
//           <p> <span className="data-titles">New Cases:</span> {selectedDate[0].newCases || 0 ||  "new cases not loaded"}</p>
//           <p> <span className="data-titles">New Deaths:</span> {selectedDate[0].newDeaths || 0 ||  "new deaths not loaded"}</p>
//         </div>
//     } else {
//       renderStateData = <div><p>Please try again error occurred</p></div>
//     }
