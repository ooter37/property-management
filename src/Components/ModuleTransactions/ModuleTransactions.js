import './ModuleTransactions.scss'
import React, { useEffect} from 'react'
import {connect} from 'react-redux' 
import axios from 'axios'
import {getTransactions,getHouses} from '../../redux/reducers/houses'
import { Grid } from '@material-ui/core'
import TransactionHouseCard from './TransactionHouseCard/TransactionHouseCard'
import DisplayTransactions from './DisplayTransactions/DisplayTransactions'
import moment from 'moment'
import {pleaseSignIn, success} from '../Functions/Sweetalerts'

function ModuleTransactions(props) {
    const {data} = props.user
    const {getTransactions} = props
    const {getHouses} = props

    useEffect(() => {
        if (data) {
            getTransactions()
            getHouses()
        }
      },[getTransactions,getHouses,data])

      async function voidTransaction(id) {
          if (props.user.data) {
              try {
                  await axios.delete(`/api/transactions/${id}`)
                  getTransactions()
                  success.fire({title: 'Transaction Voided'})
              } catch (error) {
                  
              }
          } else {
              pleaseSignIn.fire()
          }
      }

      function paidStatus(houseId) {
        let total = 0
        props.houses.transactions.length && props.houses.transactions.forEach((trans) => {
            if (trans.house_id === houseId && trans.period === moment(new Date()).format('MM YYYY')) {
                total += trans.amount
            }
        })
        return total
    }

      const mappedHousesTransactions = props.houses.houses.map((house) => {
          return (
            <Grid key={`transactionHouseCard${house.house_id}`} item xs={12} md={12} lg={6}>
                <TransactionHouseCard rent={house.rent} paid={paidStatus(house.house_id)} houseId={house.house_id} address={house.address} image={house.image} />
            </Grid>
          )
      })

    return (
        <div className='transactions-container'>
            {/* {console.log(props.houses.transactions.length && props.houses.transactions[0].period)} */}
            {/* {console.log(moment(new Date()).format('MM YYYY'))} */}
            <Grid container spacing={2}>
                <Grid style = {{ width: 450}} item xs={12} md={5} lg={5}>
                <DisplayTransactions voidTransaction={voidTransaction}/>
                </Grid>
                <Grid item xs={12} md={7} lg={7}>
                    <Grid container spacing={2}>
                    {mappedHousesTransactions}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

const mapDispatchToProps = {getTransactions,getHouses}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(ModuleTransactions)
