import React from 'react';
import PropTypes from 'prop-types';
import SelectComp from './Select.js';
import  DateComp  from './Date.js';
import  { formatDate5 } from '../today-date.js';

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
    currentStateDiv: '',
  }

  handleChange = async(event) => {
    console.log('%c%s','background: #fc8a0f; color: #fff;',event.value.toLowerCase());
    await this.setState({selectState: event.value.toUpperCase()});
    this.fetchStateAPI(this.state.selectState);
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

  fetchStateAPI = async(state) => {
    console.log("what state in api?", state);

    await fetch(`https://api.covidactnow.org/v2/state/${state}.timeseries.json?apiKey=c2e7c321b9384535b36fd92e1fc64bd5`
    ).then(response => response.json()
    ).then(data => {
        console.log("newAPIdata: ", data);
        // console.log("stateName:", data.state);
        // console.log("stateCases: ", data.actuals.cases);
        // console.log('check for null:', data.actualsTimeseries[487].newCases);
        this.setState({selectedApi: data});
        console.log("selectStateAPI: ", this.state.selectedApi);

        this.selectedDateStateData(this.props.formattedStateDate1);
    }).catch(err => {
      console.log('%c%s', 'color: yellow; background: red; font-size: 15px;', err);
    });
  }

  selectedDateStateData = (date) => {
    // console.log("check for selected state api: ", this.state.selectedApi);
    // console.log("what is selected date: ", date);
    // console.log(this.state.selectedApi.length !== 0);
    // console.log(this.state.selectedApi.actualsTimeseries.find(d => d.date === date));

    // console.log(date);
    // console.log(this.state.selectedApi.length !== 0);

    if(this.state.selectedApi.length !== 0 ) {

      const selected = this.state.selectedApi.actualsTimeseries.find(d => d.date === date);
      if(selected.length !== 0) {
        // console.log(this.state.selectedApi.state);
        // console.log(this.props.formattedStateDate1);
        // console.log("check for selected state api: ", this.state.selectedApi);
        // console.log("selected: ", selected);
        // console.log(selected.cases.toLocaleString());
        // console.log(selected.deaths.toLocaleString());
        // console.log(selected.newCases.toLocaleString());
        // console.log(selected.newDeaths.toLocaleString());

      this.setState({currentStateDiv:   <div className="selected-data-div">
        <p><span className="data-name">State: {(this.state.stateApiError !== true) ? this.state.selectedApi.state : "Name not loaded" }</span></p>
        <p> <span className="data-titles">Date:</span> { (this.state.stateApiError !== true) ? this.props.formattedStateDate1 : "Date not loaded"}</p>
        <p> <span className="data-titles">Total Confirmed Cases:</span>{(this.state.stateApiError !== true) ? selected.cases.toLocaleString() : "confirmed cases not loaded"}</p>
        <p> <span className="data-titles">Total Deaths:</span> {(this.state.stateApiError !== true) ? selected.deaths.toLocaleString() : "deaths not loaded" }</p>
        <p> <span className="data-titles">New Cases:</span> {(this.state.stateApiError !== true) ? selected.newCases.toLocaleString() : "new cases not loaded"}</p>
        <p> <span className="data-titles">New Deaths:</span> {(this.state.stateApiError !== true) ? selected.newDeaths.toLocaleString()  : "new deaths not loaded"}</p>
      </div>
      }
    )
  } else {
      this.setState({currentStateDiv: <div><p>Data not loading selectedDateStateData</p></div>});
    }
    }
  }

  componentDidMount() {
    this.setState({name: 'state-component'});
  }

  render() {
    const {selectedApi, currentStateDiv, stateApiError} = this.state;
    const { selectedStateDate1, formattedStateDate1, componentName, maxDate, name} = this.props;


    const stateErrorEl = document.getElementsByClassName('api-error-state');
    // console.log(stateErrorEl[0]);

    if(selectedApi.length !== 0) {
      const stateDataDiv = document.getElementsByClassName('selected-data-div');
      // console.log(stateDataDiv[0]);
    }else {
      // console.log('noStateDataDiv rendered yet')
    }

    let stateDataRender = currentStateDiv;

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
        { selectedApi.length !== 0 && stateDataRender }
      </div>
    )
  }
}

export default SelectedState;
