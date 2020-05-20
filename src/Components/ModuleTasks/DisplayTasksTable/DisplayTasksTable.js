import React from 'react';
import './DisplayTasksTable.scss'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
// import useFetch from '../../Hooks/useFetch'
// import format from '@date-io/date-fns';
import moment from "moment";
import {confirmDelete} from '../../Functions/Sweetalerts'

export default function DisplayTasksTable(props) {
    // const tasks = useFetch(`/api/tasks/${props.selectedHouse}`,props.selectedHouse)
    const mappedTasks = props.tasks && props.tasks.map((task) => {
        return (
          <TableRow key={`task-display-${task.task_id}`} className={`urgent-${task.urgent.toString()}`}>
            <TableCell component="th" scope="row">{task.type}</TableCell>
            <TableCell align="right">{moment(task.date).format("MMMM Do YYYY")}</TableCell>
            <TableCell align="right">${task.price}</TableCell>
            <TableCell align="right">{task.contact}</TableCell>
            <TableCell align="right">{task.note}</TableCell>
            <TableCell align="right"><Button onClick={() => console.log('button')} startIcon={<DeleteIcon />} size='small' color='secondary' variant='outlined'>Delete</Button></TableCell>
        </TableRow>
        )
    })


  return (
    <TableContainer component={Paper}>
      <Table className='display-tasks-table' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Task Type</TableCell>
            <TableCell align="right">Date Due</TableCell>
            <TableCell align="right">Estimated Price</TableCell>
            <TableCell align="right">Serviceman</TableCell>
            <TableCell align="right">Note</TableCell>
            <TableCell align="right">Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mappedTasks}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
