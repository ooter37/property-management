import './DisplayTasksTable.scss'
import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux' 
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from "moment"
import {confirmDelete, pleaseSignIn, success} from '../../Functions/Sweetalerts'

function DisplayTasksTable(props) {
const {setTasks, selectedHouse} = props

    function deleteTask(id) {
      axios.delete(`/api/tasks/${id}`)
      .then(() => {success.fire({title: 'Task Deleted'})})
        .then (() => {
          axios.get(`/api/tasks/${selectedHouse}`).then(res => {
              setTasks(res.data)
      })
      }).catch((err) => console.log('Error deleting task.', err))
    }

    const mappedTasks = (props.houses.selectedHouse && props.houses.tasks) && props.houses.tasks.map((task) => {
      if (task.house_id === props.houses.selectedHouse.house_id){
        return (
          <TableRow key={`task-display-${task.task_id}`} className={`urgent-${task.urgent}`}>
            <TableCell component="th" scope="row">{task.type}</TableCell>
            <TableCell align="right">{moment(task.date).format("MMMM Do YYYY")}</TableCell>
            <TableCell align="right">${task.price}</TableCell>
            <TableCell align="right">{task.contact}</TableCell>
            <TableCell align="right">{task.note}</TableCell>
            <TableCell align="right"><Button onClick={() => { if (props.user.data) {
                        confirmDelete.fire({
                            text: 'Are you sure you want to delete this task? This action is irreversible.'}).then((result) => {
                            if (result.value) {deleteTask(task.task_id)}})
                        } else {pleaseSignIn.fire()}}} 
                        startIcon={<DeleteIcon />} size='small' color='secondary' variant='outlined'>Delete</Button></TableCell>
        </TableRow>
        )} else {
          return null
        }
    })

  return (
    <TableContainer className='table-container' style={{ width: '98%' }} component={Paper}>
        <div className='overflow-container'>
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
        <TableBody className='display-tasks-table-body'>
          {mappedTasks}
        </TableBody>
      </Table>
        </div>
    </TableContainer>
  );
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(DisplayTasksTable)
