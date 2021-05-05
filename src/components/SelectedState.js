import React from 'react';
import PropTypes from 'prop-types';
import SelectComp from './Select.js';
import  DateComp  from './Date.js';
import  { yesterday, formatDate2, formatDate3 } from '../today-date.js';

class SelectedState extends React.Component {
  static propTypes = {
    apiData2: PropTypes.array,
    fetchStateCovid: PropTypes.func,
    selectedStateDate1: PropTypes.instanceOf(Date).isRequired,
    formattedStateDate1: PropTypes.string,
    name: PropTypes.string,
    componentName: PropTypes.string,
    handleDateChange: PropTypes.func,
    handleFormatChange: PropTypes.func,
    // selectState: PropTypes.string,
    // selectedApi: PropTypes.array,
    // stateApiError: PropTypes.bool,
  }

  state = {
    selectState: '',
    selectedApi: [],
    stateApiError: false,
  }

  handleChange = async(event) => {
    console.log('%c%s','background: #fc8a0f; color: #fff;',event.value.toLowerCase());
    await this.setState({selectState: event.value.toUpperCase()});
    // this.fetchStateCovid(this.state.selectState, this.props.formattedStateDate1);
    this.fetchTrialAPI(this.state.selectState);
  }

  displayStateErrorMessage = () => {
    console.log('%c%s','background: #fc8a0f; color: #fff;',"DISPLAY ERROR IN SELECT STATE FIRED" );
    const stateErrorEl = document.getElementsByClassName('api-error-state');
    console.log('%c%s','background: #fc8a0f; color: #fff;',stateErrorEl[0]);

    let stateDataDiv;
    if(this.state.selectedApi.length !== 0) {
      stateDataDiv = document.getElementsByClassName('selected-data-div');
      console.log('%c%s','background: #fc8a0f; color: #fff;',stateDataDiv[0]);
    }
    console.log('state error is true?:', this.state.stateApiError);
    if(this.state.stateApiError) {
      stateErrorEl[0].style.display = 'block';

      if(this.state.selectedApi.length !== 0) {
      stateDataDiv[0].style.display = 'none';
      }
      this.setState({stateApiError: false});
    } else {
      if(stateErrorEl[0]) {
        stateErrorEl[0].style.display = 'none';
      }
      if(this.state.selectedApi.length > 0) {
        stateDataDiv[0].style.display = 'inline-block';
      }
      console.log('%c%s','background: #fc8a0f; color: #fff;','No state api Error');
    }
  }

  fetchTrialAPI = async(state, date) => {
    let fetchDate = formatDate3(date);
    console.log("fetched date:", fetchDate);
    console.log("what state in api?", state);
    // await fetch(` https://api.theuscovidatlas.org/domain/v1/lisa/?state=il&category=data&start=20200901&end=20201001&type=death`
    // await fetch(`https://webhooks.mongodb-stitch.com/api/client/v2.0/app/covid-19-qppza/service/REST-API/incoming_webhook/global_and_us?country=US&state=Pennsylvania&min_date=2020-04-22T00:00:00.000Z&max_date=2020-04-27T00:00:00.000Z&hide_fields=_id,%20country,%20country_code,%20country_iso2,%20country_iso3,%20loc,%20state`
    await fetch(`https://api.covidactnow.org/v2/state/${state}.timeseries.json?apiKey=c2e7c321b9384535b36fd92e1fc64bd5`
    ).then(response => response.json()
    ).then(data => {
        console.log("newAPIdata: ", data);
        console.log("stateName:", data.state);
        console.log("stateCases: ", data.actuals.cases);
        console.log("date: ", data.actualsTimeseries[0].date);
        console.log("check if date ", data.actualsTimeseries.some(d => d.date === "2021-04-21"));
        this.setState({stateData: data});
        console.log("trialStateData: ", this.state.stateData);
    }).catch(err => {
      console.log('%c%s', 'color: yellow; background: red; font-size: 24px;', err);
    });
  }
  fetchStateCovid = async(state, date) => {
    console.log('date in select state: ', date);
    const response = await fetch(
      `https://api.covidtracking.com/v1/states/${state}/${date}.json`
    )
    .then(response => response.json()
    ).then(data => {
      console.log('%c%s','background: #fc8a0f; color: #fff;',data);
      console.log('%c%s','background: #fc8a0f; color: #fff;',data.error === true);
      console.log('select state error: ', data.message);
      if(data.error === true) {
        console.error('errror message exists');
        this.setState({stateApiError: true});
      } else {
      // console.log(`${state} ${date}`);
      // console.log(data.positive);
      // console.log(data.death);
      // console.log("newApiData:", data);
      this.setState({selectedApi: data, stateApiError: false});
      console.log('%c%s','background: #fc8a0f; color: #fff;','stateData', this.state.selectedApi);
      }
    }).catch(err => {
      console.error('is selected state error: ', err);
    }).finally(()=> {
      this.displayStateErrorMessage();
    });
  }

  componentDidMount() {
    this.setState({name: 'state-component'});
  }

  render() {
    const {selectedApi, stateApiError} = this.state;
    const { selectedStateDate1, formattedStateDate1, componentName, maxDate, name} = this.props;
    // console.log('selecteApi:', selectedApi);
    console.log('selected date in SS.js: ', selectedStateDate1);
    console.log('%c%s','background: #fc8a0f; color: #fff;', 'formatted STATE date: ', formattedStateDate1);
    // console.log('stateApiError: ', stateApiError);
    console.log("yyyy-mm-dd", formatDate3(formattedStateDate1));


    const stateErrorEl = document.getElementsByClassName('api-error-state');
    // console.log(stateErrorEl[0]);

    if(this.state.selectedApi.length !== 0) {
      const stateDataDiv = document.getElementsByClassName('selected-data-div');
      // console.log(stateDataDiv[0]);
    }else {
      // console.log('noStateDataDiv rendered yet')
    }

    if(selectedApi.length > 0) {
      // console.log("apiData2: ", selectedApi);
    }

    if(selectedApi.length !== 0) {
      // console.log('apiSelected', selectedApi);
    }
    // console.log(this.state.stateApiError);
    let stateDataRender;
    if(selectedApi.length !== 0) {
    //  console.log('selectedState:', selectedApi.date);
    stateDataRender =   <div className="selected-data-div">
    <p><span className="data-name">State: {(stateApiError !== true) ? selectedApi.state : "Name not loaded" }</span></p>
    <p> <span className="data-titles">Date:</span> { (stateApiError !== true) ? formatDate2(selectedApi.date) : "Date not loaded"}</p>
    <p> <span className="data-titles">Total Confirmed Cases:</span>{(stateApiError !== true) ? selectedApi.positive.toLocaleString() : "confirmed cases not loaded"}</p>
    <p> <span className="data-titles">Total Deaths:</span> {(stateApiError !== true) ? selectedApi.death.toLocaleString() : "deaths not loaded" }</p>
    <p> <span className="data-titles">New Cases:</span> {(stateApiError !== true) ? selectedApi.positiveIncrease.toLocaleString() : "new cases not loaded"}</p>
    <p> <span className="data-titles">New Deaths:</span> {(stateApiError !== true) ? selectedApi.deathIncrease.toLocaleString()  : "new deaths not loaded"}</p>
  </div>
  } else {
      stateDataRender = '';
  }

    return (
      <div>
        <h2>Select date and state</h2>
        <DateComp selectedStateDate1={selectedStateDate1}
                  formattedStateDate1={formattedStateDate1}
                  handleDateChange={this.props.handleDateChange}
                  name= {"state-component"}
                  componentName={componentName}
        />

        <SelectComp name="State"
                    handleChange={this.handleChange}
                    selectedStateDate1={selectedStateDate1}
          />
        <div className="api-error-state">
          <p className="error-state-p">Select Date Before Today</p>
        </div>
        {stateDataRender}
      </div>
    )
  }
}

export default SelectedState;

 {/* {selectedStateApi.length > 0 && selectedStateApi.map(data =>
             <div key={data.code}
             className="data-div">
          <p> <span className="data-titles">Date:</span> {data.lastUpdate || "Date not loaded"}</p>
          <p> <span className="data-titles">Confirmed Cases:</span> {data.confirmed || "confirmed cases not loaded"}</p>
          <p> <span className="data-titles">Deaths:</span> {data.deaths || 0 }</p>
        </div>
          )}  */}

        {/* {selectedStateApi.length > 0 && Object.entries(selectedStateApi).map(data => 
            <div className="data-div">
              <p><span className="data-name">State: {data.province || "Name not loaded" }</span></p>
              <p> <span className="data-titles">Date:</span> {data.lastUpdate || "Date not loaded"}</p>
              <p> <span className="data-titles">Confirmed Cases:</span> {data.confirmed || "confirmed cases not loaded"}</p>
              <p> <span className="data-titles">Deaths:</span> {data.deaths || 0 }</p>
            </div>
            )
          } */}
          {/* {selectedStateApi && apiData2.length > 0 &&
            <div className="data-div">
            <p><span className="data-name">State: {selectedStateApi.province || "Name not loaded" }</span></p>
            <p> <span className="data-titles">Date:</span> { apiData2[0].date || "Date not loaded"}</p>
            <p> <span className="data-titles">Confirmed Cases:</span>{selectedStateApi.confirmed || "confirmed cases not loaded"}</p>
            <p> <span className="data-titles">Deaths:</span> {selectedStateApi.deaths || 0 }</p>
          </div>
          } */}