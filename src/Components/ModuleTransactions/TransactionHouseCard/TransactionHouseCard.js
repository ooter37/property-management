import './TransactionHouseCard.scss'
import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getTransactions, getHouses} from '../../../redux/reducers/houses'
import {pleaseSignIn, success} from '../../Functions/Sweetalerts'
import { Card, Avatar, makeStyles, Typography, Button, FormControl } from '@material-ui/core'
import {DatePicker,MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PriceInput from '../../Functions/PriceInput'
import moment from 'moment'
import Swal from 'sweetalert2'


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
    const [amount] = useState('')
    const {paid,rent} = props

    const classes = useStyles();

    async function submitTransaction(){
        try {
            if (props.user.data) {
                const {houseId} = props
                const amount = (payment) ? payment : 0
                const period = moment(date).format('MM YYYY')
                await axios.post('/api/transactions', {houseId,amount,date,period})
                await props.getTransactions()
                await props.getHouses()
                setPayment('')
                success.fire({title: `Transaction added`})
            } else {
                pleaseSignIn.fire()
            }
        } catch (error) {
            console.log('Error adding transaction.', error)
        }
    }

    async function editHouseRent(rent) {
        try {
            if (props.user.data) {
                const {houseId} = props
                await axios.put('/api/rent', {houseId,rent})
                await props.getHouses()
                success.fire({title: `Rent updated`})
            } else {
                pleaseSignIn.fire()
            }
        } catch (error) {
            console.log('Error editing rent.', error)
        }
    }

    function editRent() {
        Swal.fire({
            title: 'Enter Monthly Rent',
            input: 'text',
            inputValue: amount,
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            reverseButtons: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Please enter an amount or click cancel to go back.'
                }
            }
        }).then((result) => {
            if (result.value) {
                editHouseRent(result.value)
            }
        })
    }
  
    return (
        <div>
            <Card className='transaction-card'>
                <div className='avatar-address-container'>
                    <Avatar alt="House Image" src={props.image} className={classes.avatar} />
                    <div className='transaction-card-text-container'>
                        <Typography className='address-title' variant='h6'>{props.address}</Typography>
                        {
                            (rent === 0) 
                            ?
                            <div className='transaction-add-rent-container'><Button 
                            onClick={() => editRent()}
                            size='small' variant='contained' color='primary'  >Add Rent</Button></div>
                            // <Typography className='address-title' variant='h6'>{moment(new Date()).format('MMMM')}:&nbsp;&nbsp;<div className='paid'>SET RENT</div></Typography>
                            :
                            (paid >= rent)
                            ?
                            
                            <Typography className='address-title' variant='h6'>{moment().format('MMMM')}:&nbsp;&nbsp;<div className='paid'>PAID</div></Typography>
                            :
                            (paid === 0)
                            ?
                            <Typography className='address-title' variant='h6'>{moment().format('MMMM')}:&nbsp;&nbsp;<div className='address-title unpaid'>UNPAID</div></Typography>
                            :
                            <Typography className='address-title' variant='h6'>{moment().format('MMMM')}:&nbsp;&nbsp;<div className='address-title partial'>PARTIAL</div></Typography>
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
                        label='Payment'/>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                        className='transaction-datepicker'
                        variant="inline"
                        openTo="year"
                        views={["year", "month"]}
                        label="Month to Apply"
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

const mapDispatchToProps = {getTransactions, getHouses}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHouseCard)
