import './Email.scss'
import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import CustomInput from "../UI/CustomInput.js";
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader.js";
import {pleaseSignIn, success} from '../Functions/Sweetalerts'

const styles = {
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

function Email(props) {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const classes = useStyles();

    function sendEmail() {
        const to = props.emailing
        if (props.user.data)
        {    axios.post('/email/multi', {to,subject,message}).then(() => {
            props.setDisplaying('default')
            success.fire({title: `Email sent to ${joinedEmails}`})
            }).catch((err) => console.log('Error sending single email.', err))
        } else {pleaseSignIn.fire()}
    }
        
    const joinedEmails = (typeof props.emailing ==! 'string') ? props.emailing.join(' // ') : props.emailing

    return (
        <form onSubmit={sendEmail} >
            <Grid container>
                <Grid item xs={12} sm={12} md={8} className={classes.grid}>
                    <Card>
                        <CardHeader color="primary" className='add-renter-header'>
                            <h4 className={classes.cardTitleWhite}>Compose Email</h4>
                            <p className={classes.cardCategoryWhite}>Recipient(s): {joinedEmails}</p>
                        </CardHeader>
                        <Grid container className='email-subject-add-container'>
                            <Grid item xs={12} sm={12} md={6} className={classes.grid}>
                                <CustomInput
                                labelText="Subject"
                                formControlProps={{
                                    required: true,
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    value: subject,
                                    onChange: (e) => setSubject(e.target.value),
                                    type: 'text',
                                }}
                                />
                            </Grid>
                            <Grid item>
                                <Button  onClick={() => props.setDisplaying('default')} variant='outlined' color='secondary' className='cancel-email-button'>Cancel</Button>
                                <Button type='submit' variant='contained' color="primary" className='send-email-button'>Send</Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} className={classes.grid}>
                                <CustomInput
                                labelText="Message"
                                formControlProps={{
                                    required: true,
                                    fullWidth: true,
                                }}
                                inputProps={{
                                    multiline: true,
                                    rows: 6,
                                    value: message,
                                    onChange: (e) => setMessage(e.target.value)
                                }}
                                />
                            </Grid>
                        </Grid>
                 
                    </Card>
                </Grid>
            </Grid>
        </form>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(Email)
