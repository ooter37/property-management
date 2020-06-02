import './AddTask.scss'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
// import {Redirect} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Grid, Button, FormControl, InputLabel, Checkbox, Typography } from "@material-ui/core";
import {DatePicker,MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Check from "@material-ui/icons/Check";
import {pleaseSignIn, success} from '../../Functions/Sweetalerts'
import PriceInput from '../../Functions/PriceInput'
import SelectInput from '../../Functions/SelectInput'
import CustomInput from "../../UI/CustomInput.js";
import Card from "../../UI/Card";
import CardHeader from "../../UI/CardHeader.js";
import { primaryColor, grayColor, blackColor, hexToRgb } from "../../UI/material-dashboard-react";


// const greenTheme = createMuiTheme({
//   overrides: {
//     MuiPickersToolbar: {
//       toolbar: {
//         backgroundColor: '#4caf50',
//       },
//     },
//     flatButton: {
//       color: '#4caf50'
//     },
//     MuiPickersCalendarHeader: {
//       switchHeader: {
//         // backgroundColor: lightBlue.A200,
//         // color: "white",
//       },
//     },
//     MuiPickersDay: {
//       day: {
//         color: '#4caf50',
//       },
//       daySelected: {
//         '&:hover': {
//           backgroundColor: '#4caf50'
//         },
//         backgroundColor: '#4caf50',
//       },
//       dayDisabled: {
//         color: '#4caf50',
//       },
//       current: {
//         color: '#4caf50',
//       },
//     },
//     MuiPickersModal: {
//       dialogAction: {
//         color: '#4caf50',
//       },
//     },
//   },
// });


const theme = createMuiTheme({
    overrides: {
      MuiInput: {
        underline: {
            "&:hover:not($disabled):before,&:before": {
              borderColor: grayColor[4] + " !important",
              borderWidth: "1px !important"
            },
            "&:after": {
              borderColor: primaryColor[0] + '!important'
            }
          },
      }
    }
})

const styles = {
    root: {
        padding: "13px",
        "&:hover": {
          backgroundColor: "unset"
        }
      },
    //   labelRoot: {
    //     marginLeft: "-14px"
    //   },
      checked: {
        color: primaryColor[0] + "!important"
      },
      checkedIcon: {
        width: "20px",
        height: "20px",
        border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
        borderRadius: "3px"
      },
      uncheckedIcon: {
        width: "0px",
        height: "0px",
        padding: "10px",
        border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
        borderRadius: "3px"
      },
    labelRoot: {
    //   ...defaultFont,
      color: grayColor[3] + " !important",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "1.42857",
      letterSpacing: "unset"
    },
    // labelRootError: {
    //     color: dangerColor[0]
    // },
    // labelRootSuccess: {
    //     color: successColor[0]
    // },
    feedback: {
      position: "absolute",
      top: "18px",
      right: "0",
      zIndex: "2",
      display: "block",
      width: "24px",
      height: "24px",
      textAlign: "center",
      pointerEvents: "none"
    },
    marginTop: {
      // marginTop: "16px"
    },
    formControl: {
      paddingBottom: "10px",
      margin: "27px 0 0 0",
      position: "relative",
      verticalAlign: "unset"
    },
  grid: {
      padding: "0 15px !important"
    },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
  //   fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
  
  const useStyles = makeStyles(styles);

  const taskSelections = [
    'Electrical',
    'Home Repair',
    'House Cleaning',
    'Landscaping',
    'Painting',
    'Plumbing',
    'Restoration',
    'Pool Maintenance',
    'Roofing',
    'Tree Care',
];

function AddTask(props) {
    const [type, setType] = useState('');
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState('')
    const [checked, setChecked] = useState(false)
    const [note, setNote] = useState('')
    const [contact, setContact] = useState('')
    const classes = useStyles();

    const submitNewTask = () => {
      try {
        const price = (amount) ? amount : 0
        if (props.user.data) {
          // console.log('submit', checked)
            const userId = props.user.data.user_id
            const houseId = props.houses.selectedHouse.house_id
            // const urgent = checked === 1 ? true : false
            axios.post('/api/tasks', {userId, houseId, type, date, price, checked, note, contact})
            .then(() => {
                // axios.get(`/api/tasks/${props.selectedHouse}`).then(res => {
                //     props.setTasks(res.data)
                //   })
                  resetForm()
                success.fire({title: `${type} has been added.`})
            })
        } else {
          pleaseSignIn.fire()
        }
      } catch (error) {
        console.log('Error adding task.', error)
      }
    }

    function resetForm() {
      setType('')
      setDate(new Date())
      setAmount('')
      setChecked(false)
      setNote('')
      setContact('')
  }
        
        
    return (
        <form onSubmit={submitNewTask}>
          {/* <button onClick={() => console.log(checked)}>console</button> */}
            {/* {redirect ? <Redirect to="/main" /> : null} */}
            <Grid container>
                <Grid item xs={12} sm={12} md={8} className={classes.grid}>
                    <Card>
                        <CardHeader color="primary" className='add-task-header'>
                            <Typography variant='h5' className={classes.cardTitleWhite}>{props.houses.selectedHouse ? `Add a task for ${props.houses.selectedHouse.address}` : 'Something went wrong, please refresh the page.'}</Typography>
                            <Typography variant='subtitle2' >&nbsp; &nbsp; &nbsp; *Tasks marked urgent will be highlighted.</Typography>
                        </CardHeader>
                        <Grid 
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        className='add-task-contents-container'
                        >
                            <Grid item 
                            className='name-notes-container' 
                            md={8}>
                                    <Grid item  md={12}>
                                        <Grid container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="flex-end">
                                            <Grid item  className={classes.grid} md={9}>
                                                <MuiThemeProvider theme={theme}>
                                                    <FormControl
                                                    className={classes.formControl}
                                                    fullWidth
                                                    required>
                                                        <SelectInput
                                                        // required
                                                        label='Name (start typing to add new)'
                                                        selections={taskSelections}
                                                        value={type}
                                                        setValue={setType}
                                                        classes={{
                                                            root: classes.marginTop,
                                                            disabled: classes.disabled,
                                                            underline: classes.underline
                                                        }}>
                                                        </SelectInput>
                                             
                                                    </FormControl>
                                                </MuiThemeProvider>
                                            </Grid>
                                            <Grid item md={3}>
                                                <InputLabel
                                                classes={{root: classes.labelRoot}}
                                                > 
                                                Urgent
                                                </InputLabel>
                                                <Checkbox
                                                tabIndex={-1}
                                                onClick={() => setChecked(!checked)}
                                                checkedIcon={<Check className={classes.checkedIcon} />}
                                                icon={<Check className={classes.uncheckedIcon} />}
                                                classes={{
                                                checked: classes.checked
                                                }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                        <Grid item className={classes.grid} md={12}>
                                            <CustomInput
                                            labelText="Notes"
                                            formControlProps={{
                                                // required: true,
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                multiline: true,
                                                rows: 6,
                                                value: note,
                                                onChange: (e) => setNote(e.target.value)
                                            }}
                                            />
                                        </Grid>
                            </Grid>
                            <Grid item className='task-form-contents-container' md={4}>
                                <Grid 
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                >   
                                    <Grid item md={12}>
                                        <InputLabel classes={{root: classes.labelRoot}}>Date Due</InputLabel>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                                        {/* <MuiThemeProvider theme={greenTheme}> */}
                                          <DatePicker autoOk='true' value={date} onChange={setDate}/>
                                          {/* </MuiThemeProvider> */}
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item  className={classes.grid} md={12}>
                                        <FormControl required className={classes.formControl} >
                                            <PriceInput
                                            price={amount}
                                            setPrice={setAmount}
                                            label='Estimated Cost'/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item className={classes.grid} md={12}>
                                        <CustomInput
                                        labelText="Serviceman"
                                        id="serviceman"
                                        formControlProps={{
                                            // required: true,
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: contact,
                                            onChange: (e) => setContact(e.target.value)
                                        }}
                                        />
                                    </Grid>
                                    <Grid item className='cancel-submit-container' md={12}>
                                        {/* <Grid container> */}
                                            {/* <Button onClick={()=> setRedirect(true)} variant='outlined' color="secondary" className='cancel-update-button'>Cancel</Button> */}
                                            <Button type='submit' variant='contained' color="primary" className='submit-update-button'>Submit</Button>
                                        {/* </Grid> */}
                                    </Grid>
                                </Grid>
                            </Grid> 
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </form>
    )
}

// const mapDispatchToProps = {getHouses}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(AddTask)
