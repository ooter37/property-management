import './DisplayTasksTable.scss'
import React, {useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux' 
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from "moment"
import {confirmDelete, pleaseSignIn} from '../../Functions/Sweetalerts'
import axiosDelete from '../../Functions/axiosDelete'

function DisplayTasksTable(props) {

  useEffect(() => {
    axios.get(`/api/tasks/${props.selectedHouse}`).then(res => {
        props.setTasks(res.data)
    })}, [props]
)

    const mappedTasks = props.tasks && props.tasks.map((task) => {
        return (
          <TableRow key={`task-display-${task.task_id}`} className={`urgent-${task.urgent.toString()}`}>
            <TableCell component="th" scope="row">{task.type}</TableCell>
            <TableCell align="right">{moment(task.date).format("MMMM Do YYYY")}</TableCell>
            <TableCell align="right">${task.price}</TableCell>
            <TableCell align="right">{task.contact}</TableCell>
            <TableCell align="right">{task.note}</TableCell>
            <TableCell align="right"><Button onClick={() => { if (props.user.data) {
                        confirmDelete.fire({
                            text: 'Are you sure you want to delete this task?'}).then((result) => {
                            if (result.value) {axiosDelete('task',task.task_id)}})
                        } else {pleaseSignIn.fire()}}} 
                        startIcon={<DeleteIcon />} size='small' color='secondary' variant='outlined'>Delete</Button></TableCell>
        </TableRow>
        )
    })


  return (
    <TableContainer className='table-container' style={{ width: '98%' }} component={Paper}>
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

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(DisplayTasksTable)
