import React from 'react';
import PropTypes from 'prop-types';
import SelectComp from './Select.js';

class SelectedCountry extends React.Component {
  static propTypes = {
    selectCountry: PropTypes.string,
    handleChange: PropTypes.func,
    selectedApiData: PropTypes.object,
    dataSet: PropTypes.shape({
    apiError: PropTypes.arrayOf(PropTypes.string)
    })
  } 
 
  render() {
    const {selectedApiData, apiError} = this.props;
    // console.log("selected country data", selectedApiData);
    // console.log('selected api in selectedCountry: ',selectedApiData);
    if(Object.keys(selectedApiData).length > 0) {
    // console.log(selectedApiData.parameters.country);
    }

    // console.log('apiError state in SelectedCountry: ', apiError);

    return(
      <div>
        <SelectComp name="Country" 
        handleChange={this.props.handleChange}
        selectCountry={this.props.selectCountry}
        />
        <div className="api-error">
              <p className="error-p">Data not available please choose another country</p>
            </div>
            {Object.keys(selectedApiData).length > 0 &&
        <div key={selectedApiData.parameters.country}
             className="selected-data-div">
              <p> <span className="data-titles">Date:</span> {selectedApiData.parameters.day || "Date not loaded"}</p>
              <p> <span className="data-titles">Country:</span> {selectedApiData.parameters.country  || "country name not loaded"}</p>
              <p> <span className="data-titles">Total Confirmed Cases:</span> {((typeof selectedApiData.response[0]) != "undefined")  ?  selectedApiData.response[0].cases.total.toLocaleString() : "confirmed cases not loaded"}</p>
              <p> <span className="data-titles"> New Cases:{((typeof selectedApiData.response[0]) != "undefined")  ? selectedApiData.response[0].cases.new : "new cases not loaded"}</span></p>
              <p> <span className="data-titles">Total Deaths:</span> {((typeof selectedApiData.response[0]) != "undefined")  ? selectedApiData.response[0].deaths.total.toLocaleString() : 0 }</p>
              <p> <span className="data-titles">New Deaths:</span> {((typeof selectedApiData.response[0]) != "undefined")  ? selectedApiData.response[0].deaths.new : 0 }</p>
            </div>}
      </div>
    )
  }
}

export default SelectedCountry;


// const displayErrorMessage = () => {
//   const errorEl = document.getElementsByClassName('api-error');
//   if(apiError && (apiError.name === 'TypeError') && errorEl[0]) {
//     errorEl[0].style.display = "block";
//     console.log('TypeError');
//   } else {
//     errorEl[0].style.display = "none";
//     console.log('no TypeError');
//   }
// }



    // if ( Object.keys(selectedApiData).length > 0 ) {
    //   console.log(selectedApiData);
    //   console.log('sel country api ', selectedApiData.response);
    //   console.log('sel country api cases ', selectedApiData.response[0].cases.total);
    //   console.log('sel country api deaths', selectedApiData.response[0].deaths.total);
    //   console.log('selectedCountryApi: ', selectedApiData);
    // }

    // console.log(apiError.name === 'TypeError');

    // if(apiError.name === 'TypeError') {
    //   console.log("error: ", apiError);
    // }
   
    // console.log("errorEl[0]: ", errorEl);

      {/* {selectedApiData.length > 0 && selectedApiData.map(data =>
             <div key={data.country}
             className="data-div">
               <p>User Selected a day and country</p>
          <p> <span className="data-titles">Date:</span> {formatDate(data.response[0].day) || "Date not loaded"}</p>
          <p> <span className="data-titles">Country:</span> {data.response[0].country || "country name not loaded"}</p>
          <p> <span className="data-titles">Confirmed Cases:</span> {data.response[0].cases.total.toLocaleString() || "confirmed cases not loaded"}</p>
          <p> <span className="data-titles">Deaths:</span> {data.response[0].deaths.total.toLocaleString() || 0 }</p>
        </div>
          )}   */}