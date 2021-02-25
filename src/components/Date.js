import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

class DateComp extends React.Component {

static propTypes = {
  selectedDate1: PropTypes.instanceOf(Date),
  selectedDate2: PropTypes.instanceOf(Date),
  formattedDate1: PropTypes.string,
  formattedDate2: PropTypes.string,
  handleDateChange: PropTypes.func,
  name: PropTypes.string,
  componentName: PropTypes.string,
}

  render() {
    const { selectedDate1, selectedDate2, name, componentName, formattedDate1, formattedDate2 } = this.props;
    // console.log('%c%s','background: #9812c4; color: #fff;',"selectedDate1: ", selectedDate1);
    // console.log('%c%s','background: #9812c4; color: #fff;',"selectedDate2: ", selectedDate2);
    // console.log('%c%s','background: #9812c4; color: #fff;', "formatted Date1: ", formattedDate1);
    // console.log('%c%s','background: #9812c4; color: #fff;', "formatted Date2: ", formattedDate2);

  let yesterday2 = new Date(new Date().setDate(new Date().getDate() - 1));
    // console.log('%c%s','background: #9812c4; color: #fff;','yesterday2: ', yesterday2);

  let selected;
  let maxDate;
  let onChange;

  if(componentName === 'state-component'){ 
    // selected = yesterday2;
    maxDate = addDays(new Date(), -1);
    selected = selectedDate2;
    console.log('%c%s','background: #9812c4; color: #fff;',"DATE componentName: ", componentName);
    console.log('%c%s','background: #9812c4; color: #fff;',"date in what name?: ", name);
  }

 if(componentName === 'country-component') {
    maxDate = addDays(new Date(), 0);
    selected = selectedDate1;
    // selected = selectedDate;
    // console.log('%c%s','background: #9812c4; color: #fff;',"DATE componentName: ", componentName);
    // console.log('%c%s','background: #9812c4; color: #fff;',"date in what name?: ", name);
  }

  // console.log('%c%s','background: #9812c4; color: #fff;','what is maxDate: ', maxDate);

    return(
      <DatePicker selected={ selected }
                  onChange={ this.props.handleDateChange }
                  // name={name}
                  dateFormat="MM/dd/yyyy"
                  maxDate={maxDate}
                  />
    );
  }

}

export default DateComp;
