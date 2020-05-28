import React from 'react'
import {TableCell, TableRow} from '@material-ui/core/';
import moment from "moment"

export default function TaskCard(props) {
    return  props.selectedTasks.map((task) => {
        return (
        <TableRow key={`mappedTasks-${task.id}`}>
            <TableCell component="th" scope="row">{task.type}</TableCell>
            <TableCell align="right">{moment(task.date).format("MMMM Do YYYY")}</TableCell>
        </TableRow>
        )
    })
}