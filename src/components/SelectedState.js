import React from 'react';
import PropTypes from 'prop-types';
import SelectComp from './Select.js';
import  DateComp  from './Date.js';
import  { yesterday, formatDate2 } from '../today-date.js';

class SelectedState extends React.Component {
  
  static propTypes = {
    apiData2: PropTypes.array,
    fetchStateCovid: PropTypes.func, 
    selectedDate2: PropTypes.instanceOf(Date).isRequired,
    formattedDate2: PropTypes.string,
    name: PropTypes.string,
    componentName: PropTypes.string,
    handleDateChange: PropTypes.func,
    handleFormatChange: PropTypes.func,
  } 

  state = {
    selectState: '',
    selectedApi: [],
    stateApiError: false,
  }

  handleChange = async(event) => {
    console.log('%c%s','background: #fc8a0f; color: #fff;',event.value.toLowerCase());
    await this.setState({selectState: event.value.toLowerCase()});
    this.fetchStateCovid(this.state.selectState, this.props.formattedDate2);
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
    const { selectedDate2, formattedDate2, componentName, maxDate, name} = this.props;
    // console.log('selecteApi:', selectedApi);
    // console.log('selected date in SS.js: ', selectedDate);
    console.log('%c%s','background: #fc8a0f; color: #fff;', 'formatted date in SS.js: ', formattedDate2);
    // console.log('stateApiError: ', stateApiError);
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
     <p> <span className="data-titles">Confirmed Cases:</span>{(stateApiError !== true) ? selectedApi.positive.toLocaleString() : "confirmed cases not loaded"}</p>
     <p> <span className="data-titles">New Cases:</span> {(stateApiError !== true) ? selectedApi.positiveIncrease.toLocaleString() : "new cases not loaded"}</p>
     <p> <span className="data-titles">Deaths:</span> {(stateApiError !== true) ? selectedApi.death.toLocaleString() : "deaths not loaded" }</p>
     <p> <span className="data-titles">New Deaths:</span> {(stateApiError !== true) ? selectedApi.deathIncrease.toLocaleString()  : "new deaths not loaded"}</p>
   </div>
   } else {
     stateDataRender = '';
   }
   
    return (
      <div>
        <h2>Select date and state</h2>
        <DateComp selectedDate2={selectedDate2}
                  formattedDate2={formattedDate2}
                  handleDateChange={this.props.handleDateChange}
                  name= {"state-component"}
                  componentName={componentName}
                 />
                  
        <SelectComp name="State" 
                    handleChange={this.handleChange}
                    selectedDate2={selectedDate2}
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