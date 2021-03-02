import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {countriesData5} from '../data/countries-data.js';
import {statesData4} from '../data/states-data.js';

class SelectComp extends React.Component {
  static propTypes = {
    selectCountry: PropTypes.string,
    handleChange: PropTypes.func
  }

  state = {
      countryList: countriesData5,
      stateList: statesData4,
    }

  render() {
    const {stateList, countryList} = this.state;
    // const countries = countryList.map(country => ({value: country.code, label: country.name}));
    let options;
    if(this.props.name === "Country") {
      options = countryList;
    } else {
      options = stateList;

    }
    return (
      <div>
        <Select name={`${this.props.name}`}
              className={`select-options select-${this.props.name}`}
              onChange={this.props.handleChange}
              placeholder= {this.props.name === "Country" ? "Select Country" : "Select State"}
              options={options}
              />
      </div>
    )
  }
}

export default SelectComp;

      // state = {
  //   selectCountry: ''
  // }
  // handleChange =(event) => {
  //   console.log(event.currentTarget.value);
  //   this.setState({selectCountry: event.currentTarget.value});

  // }

    // logic to render options when using react-select
    // react-select seems to change the structure of the data lists
    // const optionsCountry = Object.entries(countryList).map((entry) => {
    //   let key = entry[0]
    //   let value = entry[1]
    //   return <option key={key}
    //                  value={value}>
    //                    { value }
    //           </option>
    //  });

    //  const optionsState = Object.entries(stateList).map((entry) => {
    //   return <option key={entry.key}
    //             value={entry.key}>
    //             {entry.key}
    //           </option>
    //  });


    // let options;
    // if(this.props.name === "Country") {
    //   options = optionsCountry;
    //   console.log('options country: ',options);
    // } else {
    //   options = optionsState;
    //   console.log('options state: ',options);
    // }