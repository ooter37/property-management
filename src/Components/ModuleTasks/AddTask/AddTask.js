import './AddTask.scss'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {getHouses} from '../../../redux/reducers/houses'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Grid, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormHelperText } from "@material-ui/core";
import {DatePicker,MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Check from "@material-ui/icons/Check";
import {pleaseSignIn, success} from '../../Functions/Sweetalerts'
import PriceInput from '../../Functions/PriceInput'
import SelectInput from '../../Functions/SelectInput'
import CustomInput from "../../UI/CustomInput.js";
import Card from "../../UI/Card";
import CardHeader from "../../UI/CardHeader.js";
import { primaryColor, dangerColor, successColor, grayColor, blackColor, hexToRgb } from "../../UI/material-dashboard-react";

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
      radio: {
        color: primaryColor[0] + "!important"
      },
      radioChecked: {
        width: "20px",
        height: "20px",
        border: "1px solid " + primaryColor[0],
        borderRadius: "50%"
      },
      radioUnchecked: {
        width: "0px",
        height: "0px",
        padding: "10px",
        border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
        borderRadius: "50%",
      },
    labelRoot: {
    //   ...defaultFont,
      color: grayColor[3] + " !important",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "1.42857",
      letterSpacing: "unset"
    },
    labelRootError: {
        color: dangerColor[0]
    },
    labelRootSuccess: {
        color: successColor[0]
    },
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
    'Tree Trimming',
    'Pool Repair',
    'House Repair',
    'Exterior Painting'
];

function AddTask(props) {
    const [type, setType] = useState('');
    const [date, setDate] = useState(new Date());
    const [price, setPrice] = useState(0)
    const [checked, setChecked] = useState([])
    const [note, setNote] = useState('')
    const [contact, setContact] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(false)
    const classes = useStyles();

    const checkHandler = value => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
      };


    // function clickHandler() {
    //     setError(false)
    //     if (!type) {
    //         setError(true)
    //     }
    // }

    const submitNewTask = () => {
        if (props.user.data) {
            const userId = props.user.data.user_id
            const houseId = props.selectedHouse
            axios.post('/api/tasks', {userId, houseId, type, date, price, checked, note, contact})
            .then(() => {
                axios.get(`/api/tasks/${props.selectedHouse}`).then(res => {
                    props.setTasks(res.data)
                })
            })
        }
    }
        
        
    return (
        <form onSubmit={submitNewTask}>
            {redirect ? <Redirect to="/main" /> : null}
            <Grid container>
                <Grid item xs={12} sm={12} md={8} className={classes.grid}>
                    <Card>
                        <CardHeader color="primary" className='add-task-header'>
                            <h4 className={classes.cardTitleWhite}>Add House</h4>
                            {/* <p className={classes.cardCategoryWhite}>An image the house will be pulled from Google Maps Street View.</p> */}
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
                                {/* <Grid 
                                // spacingTop={4}
                                // container
                                // direction="column"
                                // justify="center"
                                // alignItems="flex-start"
                                > */}


                                    <Grid item  md={12}>



                                        <Grid item  className={classes.grid} md={12}>
                                            <MuiThemeProvider theme={theme}>
                                                <FormControl
                                                className={classes.formControl}
                                                fullWidth
                                                required
                                                error={error}
                                                >
                                                    <SelectInput
                                                    // required
                                                    value={type}
                                                    setValue={setType}
                                                    classes={{
                                                        root: classes.marginTop,
                                                        disabled: classes.disabled,
                                                        underline: classes.underline
                                                    }}
                                                    >
                                                        {/* <MenuItem value="PR">Puerto Rico</MenuItem>
                                                        <MenuItem value="UM">United States Minor Outlying Islands</MenuItem>
                                                        <MenuItem value="VI">Virgin Islands</MenuItem> */}
                                                    </SelectInput>
                                                    {/* {error && <FormHelperText>This is required!</FormHelperText>} */}
                                                </FormControl>
                                            </MuiThemeProvider>
                                        </Grid>
                                        {/* <FormControl> */}
                                        <Grid item>
                                        <InputLabel
                                                    classes={{root: classes.labelRoot}}
                                                    > 
                                                    Urgent
                                                    </InputLabel>
                                        <Checkbox
                                        tabIndex={-1}
                                        onClick={() => checkHandler(1)}
                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                        icon={<Check className={classes.uncheckedIcon} />}
                                        classes={{
                                        checked: classes.checked
                                        }}
                                        ></Checkbox>
                                        </Grid>
                                        {/* </FormControl> */}



                                    </Grid>


                                    {/* <Grid item className={classes.grid} md={12}> */}
                                        <Grid item className={classes.grid} md={12}>
                                            <CustomInput
                                            labelText="Notes"
                                            formControlProps={{
                                                // required: 'true',
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
                                    {/* </Grid> */}
                                {/* </Grid> */}
                            </Grid>
                                



                            <Grid item 
                            className='task-form-contents-container' 
                            md={4}>
                                <Grid 
                                container
                                // direction="column"
                                // justify="space-between"
                                // alignItems="flex-end"
                                >   
                                    
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}> <DatePicker value={date} onChange={setDate}/> </MuiPickersUtilsProvider>

                                    <Grid item  className={classes.grid} md={6}>
                                        <FormControl required className={classes.formControl} >
                                            <PriceInput
                                            price={price}
                                            setPrice={setPrice}
                                            label='Estimated Cost'/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item className={classes.grid} md={12}>
                                        <CustomInput
                                        labelText="Contact"
                                        id="contact"
                                        formControlProps={{
                                            required: 'true',
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: contact,
                                            onChange: (e) => setContact(e.target.value)
                                        }}
                                        />
                                    </Grid>

                                    <Grid item className='cancel-submit-container'  md={12}>
                                        <Grid 
                                        container
                                        direction="row"
                                        justify="flex-end"
                                        alignItems="flex-end">
                                            <Button onClick={()=> setRedirect(true)} variant='outlined' color="secondary" className='cancel-update-button'>Cancel</Button>
                                            <Button type='submit' variant='contained' color="primary" className='submit-update-button'>Submit</Button>
                                        </Grid>
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
