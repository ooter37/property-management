import './DisplayTransactions.scss'
import React from 'react'
import {connect} from 'react-redux'
import { TableRow, TableCell, TableContainer, TableHead, TableBody, Paper } from '@material-ui/core'
import moment from "moment"

function DisplayTransactions(props) {


    const mappedHouses = (props.houses.houses.length && props.houses.transactions.length) && props.houses.houses.map((house) => {
        const mappedTransactions = props.houses.transactions.map((trans) => {
            if (trans.house_id === house.house_id && trans.date === '2020-06-01T20:08:15.064Z') {
                return (
                    <TableRow key={`mappedTransactions${trans.transaction_id}`}>
                    <TableCell>{trans.address}</TableCell>           
                    <TableCell>{trans.amount}</TableCell>           
                    <TableCell>{trans.date}</TableCell>           

            </TableRow>
                )
            }
        })
        return (
            // <TableBody>
            <span>
            {mappedTransactions}
            </span>
            // </TableBody>
        )
    })

    return (
        <div>

            <TableContainer component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell>House</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                {/* <TableRow>
                            <TableCell>address</TableCell>           
                            <TableCell>amount</TableCell>
                            <TableCell>date</TableCell>
                        </TableRow> */}
                    {mappedHouses}
                </TableBody>
            </TableContainer>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(DisplayTransactions)
