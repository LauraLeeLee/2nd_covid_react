import React from 'react';
// import PropTypes from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';
import Moment from 'moment';
import 'react-day-picker/lib/style.css';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.handleDaySelect = this.handleDaySelect.bind(this);
    this.state = {
      selectedDates: []
    };
  }

  handleDaySelect(day, { selected }) {
    const { selectedDates } = this.state;
    if(selected) {
      const selectedIndex = selectedDates.findIndex(selectedDate => 
        DateUtils.isSameDay(selectedDate, day)
        );
        selectedDates.splice(selectedIndex, 1);
    } else {
      selectedDates.push(day);
    }
    // Moment(selectedDates).format('YYYY-MM-DD') 
    this.setState({ selectedDates });
  }

  render() {
    console.log('dates selected: ', this.state.selectedDates);
    if(this.state.selectedDates.length > 0 ) {
    console.log('formatted1: ', Moment(this.state.selectedDates[0]).format('YYYY-MM-DD'));
    }

    if(this.state.selectedDates.length > 1 ) {
      console.log('formatted2: ', Moment(this.state.selectedDates[1]).format('YYYY-MM-DD'));
    }
    return(
      <div>
        <DayPicker
          selectedDays={this.state.selectedDates}
          onDayClick={this.handleDaySelect}
          disabledDays={
          { after: new Date()}
          }
          />
      </div>
    );
  }
}

