import './TransactionHouseCard.scss'
import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getTransactions} from '../../../redux/reducers/houses'
import {pleaseSignIn, success} from '../../Functions/Sweetalerts'
import { Card, Avatar, makeStyles, Typography, Button, FormControl } from '@material-ui/core'
import {DatePicker,MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PriceInput from '../../Functions/PriceInput'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    avatar: {
      width: 100,
      height: 100,
      border: '2px solid #1b5e20'
    },
  }));

function TransactionHouseCard(props) {
    const [date, setDate] = useState(new Date())
    const [payment, setPayment] = useState('')
    const {paid,rent} = props

    const classes = useStyles();

    async function submitTransaction(){
        try {
            if (props.user.data) {
                const {houseId} = props
                const amount = (payment) ? payment : 0
                const period = moment(date).format('MM YYYY')
                await axios.post('/api/transactions', {houseId,amount,date,period})
                setPayment('')
                success.fire({title: `Transaction added.`})
                // await props.getTransaction()
            } else {
                pleaseSignIn.fire()
            }
        } catch (error) {
            
        }
    }

  
    return (
        <div>
            {console.log(props.rent, props.paid)}
            <Card className='transaction-card'>
                <div className='avatar-address-container'>
                    <Avatar alt="House Image" src={props.image} className={classes.avatar} />
                    <div className='transaction-card-text-container'>
                        <Typography className='address-title' variant='h6'>{props.address}</Typography>
                        {
                            (paid >= rent)
                            ?
                            
                            <Typography className='address-title' variant='h6'>{moment(new Date()).format('MMMM')}:&nbsp;&nbsp;<Typography className='paid' variant='h6'>PAID</Typography></Typography>
                            :
                            (paid === 0)
                            ?
                            <Typography className='address-title' variant='h6'>{moment(new Date()).format('MMMM')}:&nbsp;&nbsp;<Typography className='address-title unpaid' variant='h6'>UNPAID</Typography></Typography>
                            :
                            <Typography className='address-title' variant='h6'>{moment(new Date()).format('MMMM')}:&nbsp;&nbsp;<Typography className='address-title partial' variant='h6'>PARTIAL</Typography></Typography>
                        }
                        {/* <Typography className={`address-title ${props.paid > props.rent ? 'paid' : ''} ${props.paid < props.rent && props.paid > 0 ? 'partial' : ''} ${props.paid <= 0 ? 'unpaid' : ''}`} variant='h6'>payment status</Typography> */}
                    </div>
                </div>
                <form className='transaction-form' onSubmit={submitTransaction}>
                    {/* <div className='transaction-datepicker-container'> */}

                    <div className='transaction-amount-and-button'>
                    <FormControl required className='transaction-price-input' >
                        <PriceInput
                        price={payment}
                        setPrice={setPayment}
                        label='Payment Amount'/>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                        className='transaction-datepicker'
                        variant="inline"
                        openTo="year"
                        views={["year", "month"]}
                        label="Month to Apply Payment"
                        // helperText="Month to Apply Payment"
                        value={date}
                        onChange={setDate}
                        autoOk='true'
                        />
                    </MuiPickersUtilsProvider>
                    {/* </div> */}
                    

                    <Button type='submit' variant='contained' color='primary'>Submit</Button>
                        </div>
                </form>
            </Card>
        </div>
    )
}

const mapDispatchToProps = {getTransactions}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHouseCard)
