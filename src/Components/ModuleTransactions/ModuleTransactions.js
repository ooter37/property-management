import './ModuleTransactions.scss'
import React, { useEffect} from 'react'
import {connect} from 'react-redux' 
import {getTransactions,getHouses} from '../../redux/reducers/houses'
import { Grid } from '@material-ui/core'
import TransactionHouseCard from './TransactionHouseCard/TransactionHouseCard'
import DisplayTransactions from './DisplayTransactions/DisplayTransactions'
import moment from 'moment'

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
            <Grid key={`transactionHouseCard${house.house_id}`} item xs={12} sm={12} md={6}>
                <TransactionHouseCard rent={house.rent} paid={paidStatus(house.house_id)} houseId={house.house_id} address={house.address} image={house.image} />
            </Grid>
          )
      })

    return (
        <div className='transactions-container'>
            {/* {console.log(props.houses.transactions.length && props.houses.transactions[0].period)} */}
            {/* {console.log(moment(new Date()).format('MM YYYY'))} */}
            <Grid container spacing={2}>
                <Grid style = {{ width: 420}} item xs={12} sm={4} md={4}>
                <DisplayTransactions/>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
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
