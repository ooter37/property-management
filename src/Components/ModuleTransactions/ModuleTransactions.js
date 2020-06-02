import './ModuleTransactions.scss'
import React, { useEffect} from 'react'
import {connect} from 'react-redux' 
import {getTransactions,getHouses} from '../../redux/reducers/houses'
import { Grid } from '@material-ui/core'
import TransactionHouseCard from './TransactionHouseCard/TransactionHouseCard'
import DisplayTransactions from './DisplayTransactions/DisplayTransactions'
import lodash from 'lodash'
import _ from 'underscore'
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


      const mappedHousesTransactions = props.houses.houses.map((house) => {
          return (
            <Grid key={`transactionHouseCard${house.house_id}`} item xs={12} sm={12} md={6}>
                <TransactionHouseCard houseId={house.house_id} address={house.address} image={house.image} />
            </Grid>
          )
      })

    //   function groupArray(arr){
    //     if(arr.length===0){return [];}
    //     var pref,i;
    //     // sort by date
    //     arr.sort(function(a,b){
    //       return (a.date>b.date)?1:(a.date<b.date)?-1:0; 
    //     });
    //     // loop through the array grouping objects by date
    //     pref=arr[0].date;
    //     for(i=1;i<arr.length;i++){
    //       if(arr[i].date===pref){
    //         //set the total
    //         arr[i-1].val=arr[i-1].val+arr[i].val;
    //         //remove the element
    //         arr.splice(i,1);
    //         // set i one back
    //         i--;
    //       }
    //       pref=arr[i].date;
    //     }
    //     return arr;
    //   }

    // const groupedHouses = lodash.groupBy(props.houses.transactions, 'house_id')

    //   function transactionSum() {
    //       const sum = props.houses.transactions.reduce((a, {amount}) => a + amount, 0)
    //       console.log(sum)
    //   }
      

    return (
        <div className='transactions-container'>
            {/* {transactionSum()} */}
            {/* {console.log(groupedHouses)} */}
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
