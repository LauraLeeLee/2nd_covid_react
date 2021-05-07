import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Moment from 'moment';
import Home from './Home.js';
// import Header from './Header.js';
import Nav from './Nav.js';
import Country from './Country.js';
import StateComp from './State.js';
import { formatDate4, formatDate5 } from '../today-date.js';

// console.log(process.env.REACT_APP_API_KEY);

class App extends React.Component {
state = {
  countries: {},
  states: {},
  selectValue: "",
  name: "",
  selectedDate1: new Date(),
  selectedStateDate1: new Date(new Date().setDate(new Date().getDate() - 1)),
  formattedDate1: Moment(new Date()).format('YYYYMMDD'),
  formattedStateDate1: formatDate4(Moment(new Date(new Date().setDate(new Date().getDate() - 1))).format('YYYYMMDD')),
  componentName: ""
}

handleDateChange = async(date, name) => {
  console.log('%c%s','background: #12c45c; color: #000;',"which date component in APP:",this.state.componentName);
  console.log('%c%s','background: #12c45c; color: #000;','does state.name have value in App?: ', 'background: #12c45c; color: #000;', this.state.name );
  console.log('%c%s','background: #12c45c; color: #000;',"handleDateChange FIRED");
  // await this.setState({
  //   selectedDate: date,
  //   // componentName: name
  // });
  if(this.state.name === 'country-component') {
    await this.setState({
      selectedDate1: date
    });
  }
  if(this.state.name === 'state-component') {
    await this.setState({
      selectedStateDate1: date
    })
  }
  this.handleFormatChange();
}

handleFormatChange = () => {
  // console.log('format change fired ');
  if(this.state.name === 'country-component') {
  this.setState({formattedDate1: Moment(this.state.selectedDate1).format('YYYYMMDD')})
  } else {
    this.setState({formattedStateDate1: formatDate5(this.state.selectedStateDate1)})
  }
}

handleCountryOrState = (name) => {
  console.log('%c%s','background: #12c45c; color: #000;',"HANDLE COUNTRY/STATE FIRED");
  this.setState({componentName: name, name: name});
}

  render() {
    const {formattedDate1, formattedStateDate1, selectedDate1, selectedStateDate1, name, componentName } = this.state;
    // console.log('apiData:', this.state.apiData);
    console.log('%c%s','background: #12c45c; color: #000;','selectedDate1: ', selectedDate1);
    console.log('%c%s','background: #12c45c; color: #000;','selectedStateDate1: ', selectedStateDate1);
    console.log('%c%s','background: #12c45c; color: #000;','formattedStateDate1: ', formattedStateDate1);
    console.log('%c%s','background: #12c45c; color: #000;','componentName:' ,componentName);
    console.log('%c%s','background: #12c45c; color: #000;','name: ', name);
    return (
      <Router>
        <div className="container" role="main">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Countries"
                  render={props =>
                      (<Country {...props} selectedDate1={selectedDate1}
                        formattedDate1={formattedDate1}
                        name={name}
                        componentName={componentName}
                        handleDateChange={this.handleDateChange}
                        handleCountryOrState={this.handleCountryOrState}/>)
                      }/>
            <Route path="/States"
                    render={props =>
                    (<StateComp {...props} selectedStateDate1={selectedStateDate1}
                      formattedStateDate1={formattedStateDate1}
                      name={name}
                      componentName={componentName}
                      handleDateChange={this.handleDateChange}
                      handleCountryOrState={this.handleCountryOrState}/>)
                    }/>
          </Switch>
        </div>
      </Router>


      // <div className="covid-wrap">
      //   <Header />
      //   <Country data={apiData}
      //            selectedDate={selectedDate}
      //            formattedDate={formattedDate}
      //            handleDateChange={this.handleDateChange}/>
      //   <StateComp selectedDate={selectedDate}
      //              formattedDate={formattedDate}
      //              handleDateChange={this.handleDateChange}
      //              />

      //   {/* <SelectComp label="State"
      //              selectValue={this.selectValue}/>  */}
      // </div>
    )
  }
}

export default App;