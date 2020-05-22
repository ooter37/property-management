import 'date-fns'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtils,KeyboardTimePicker,KeyboardDatePicker,} from '@material-ui/pickers'

export default function MaterialUIPickers(props) {
    const {selectedDate, setSelectedDate, handleDateChange} = props
    
    // const handleDateChange = (date) => {setSelectedDate(date);};


    return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Grid container justify="space-around">
    {/* <KeyboardDatePicker
    disableToolbar
    variant="inline"
    format="MM/dd/yyyy"
    margin="normal"
    id="date-picker-inline"
    label="Date picker inline"
    value={selectedDate}
    onChange={handleDateChange}
    KeyboardButtonProps={{'aria-label': 'change date',}}
    /> */}
    <KeyboardDatePicker
    margin="normal"
    id="date-picker-dialog"
    label="Task Deadline"
    format="MM/dd/yyyy"
    value={selectedDate}
    onChange={handleDateChange}
    KeyboardButtonProps={{'aria-label': 'change date',}}
    />
        {/* <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /> */}
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
