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

const useStyles = makeStyles((theme) => ({
    avatar: {
      width: 100,
      height: 100,
      border: '2px solid #1b5e20'
    },
  }));

function TransactionHouseCard(props) {
    const [date, setDate] = useState(new Date())
    const [amount, setAmount] = useState()

    const classes = useStyles();

    async function submitTransaction(){
        try {
            if (props.user.data) {
                const {houseId} = props
                await axios.post('/api/transactions', {houseId,amount,date})
                setAmount()
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
            <Card>
                <Typography variant='h6'>{props.address}</Typography>
                <Avatar alt="House Image" src={props.image} className={classes.avatar} />
                <form onSubmit={submitTransaction}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                        variant="inline"
                        openTo="year"
                        views={["year", "month"]}
                        label="Year and Month"
                        helperText="Select the date and month to apply this payment."
                        value={date}
                        onChange={setDate}
                        autoOk='true'
                        />
                    </MuiPickersUtilsProvider>
                    <FormControl required className={classes.formControl} >
                        <PriceInput
                        price={amount}
                        setPrice={setAmount}
                        label='Payment Amount'/>
                    </FormControl>
                    <Button type='submit' variant='contained' color='primary'>Submit</Button>
                </form>
            </Card>
        </div>
    )
}

const mapDispatchToProps = {getTransactions}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHouseCard)