import './ModuleTransactions.scss'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux' 
import {getTransactions} from '../../redux/reducers/houses'
import { Grid } from '@material-ui/core'
import TransactionHouseCard from './TransactionHouseCard/TransactionHouseCard'

function ModuleTransactions(props) {
    const {data} = props.user
    const {getTransactions} = props

    useEffect(() => {
        if (data) {
            getTransactions()
        }
      },[getTransactions, data])


      const mappedHousesTransactions = props.houses.houses.map((house) => {
          return (
            <Grid key={`transactionHouseCard${house.house_id}`} item xs={12} sm={12} md={5}>
            <TransactionHouseCard address={house.address} image={house.image} />
        </Grid>
          )
      })

    //   const mappedTransactionHouseCard = props.houses.transactions.map((trans) => {
    //       const recentTransaction = trans.map((elem) => {

    //       })
    //       return (
    //         <Grid key={`transactionHouseCard${trans.transaction}`} item xs={12} sm={12} md={5}>
    //             <TransactionHouseCard address={trans.address} image={trans.image} />
    //         </Grid>
    //       )
    //   })

    return (
        <div className='transactions-container'>
            <Grid container spacing={2}>
                {mappedHousesTransactions}
            </Grid>
        </div>

    )

}

const mapDispatchToProps = {getTransactions}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(ModuleTransactions)
