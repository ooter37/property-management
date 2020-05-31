import React from 'react'
import {connect} from 'react-redux'
import {TableCell, TableRow} from '@material-ui/core/';
import moment from "moment"

function TaskCard(props) {
    return props.houses.tasks.map((task) => {
        if (task.house_id === props.houses.selectedHouse.house_id){
        return (
        <TableRow key={`TaskCard-${task.task_id}`}>
            <TableCell component="th" scope="row">{task.type}</TableCell>
            <TableCell align="right">{moment(task.date).format("MMMM Do YYYY")}</TableCell>
        </TableRow>
        )} else {
            return null
        }
    })
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(TaskCard)