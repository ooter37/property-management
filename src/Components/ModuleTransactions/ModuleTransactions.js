import './ModuleTransactions.scss'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux' 
import {getTransactions,getHouses} from '../../redux/reducers/houses'
import { Grid } from '@material-ui/core'
import TransactionHouseCard from './TransactionHouseCard/TransactionHouseCard'
import DisplayTransactions from './DisplayTransactions/DisplayTransactions'

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


      const mappedHousesTransactions = props.houses.houses.map((house) => {
        //   const transactionsByHouse = props.houses.transactions.map((trans) => {
        //       let transactionsByHouse = []
        //       if (trans.house_id === house.house_id) {
        //           transactionsByHouse.push(trans)
        //       }
        //   })
          return (
            <Grid key={`transactionHouseCard${house.house_id}`} item xs={12} sm={12} md={5}>
            <TransactionHouseCard houseId={house.house_id} address={house.address} image={house.image} />
        </Grid>
          )
      })
      

    return (
        <div className='transactions-container'>
            <Grid container spacing={2}>
            <DisplayTransactions/>
                {mappedHousesTransactions}
            </Grid>
        </div>

    )

}

const mapDispatchToProps = {getTransactions,getHouses}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(ModuleTransactions)
