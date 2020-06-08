import './DisplayTasksTable.scss'
import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux' 
import {getTasks} from '../../../redux/reducers/houses'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Tooltip} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import moment from "moment"
import {confirmDelete, pleaseSignIn, success} from '../../Functions/Sweetalerts'

function DisplayTasksTable(props) {
// const {setTasks, selectedHouse} = props

function deleteTask(id) {
  axios.delete(`/api/tasks/${id}`)
  .then(() => {success.fire({title: 'Task Deleted'})})
    .then (() => {
      props.getTasks()
  }).catch((err) => console.log('Error deleting task.', err))
}

    // function deleteTask(id) {
    //   axios.delete(`/api/tasks/${id}`)
    //   .then(() => {success.fire({title: 'Task Deleted'})})
    //     .then (() => {
    //       axios.get(`/api/tasks/${selectedHouse}`).then(res => {
    //           setTasks(res.data)
    //   })
    //   }).catch((err) => console.log('Error deleting task.', err))
    // }

    const mappedTasks = (props.houses.selectedHouse && props.houses.tasks) && props.houses.tasks.map((task) => {
      if (task.house_id === props.houses.selectedHouse.house_id){
        return (
          <TableRow key={`task-display-${task.task_id}`} className={`urgent-${task.urgent}`}>
            <TableCell component="th" scope="row" align='left'><Tooltip title={task.type}><Typography className='table-typography-name' noWrap={true}>{task.type}</Typography></Tooltip></TableCell>
            <TableCell align="right">{moment(task.date).format("MMMM Do YYYY")}</TableCell>
            <TableCell align="right">${task.price}</TableCell>
            <TableCell align='right'><Tooltip title={task.contact}><Typography className='table-typography-name' noWrap={true}>{task.contact}</Typography></Tooltip></TableCell>
            <TableCell align='right'><Tooltip title={task.note}><Typography className='table-typography-name' noWrap={true}>{task.note}</Typography></Tooltip></TableCell>
            <TableCell align="right"><IconButton onClick={() => { if (props.user.data) {
                        confirmDelete.fire({
                            text: 'Are you sure you want to delete this task? This action is irreversible.'}).then((result) => {
                            if (result.value) {deleteTask(task.task_id)}})
                        } else {pleaseSignIn.fire()}}} 
                        size='small' color='secondary' variant='outlined'><DeleteIcon /></IconButton></TableCell>
        </TableRow>
        )} else {
          return null
        }
    })

  return (
    <TableContainer className='table-container' style={{ width: '98%' }} component={Paper}>
        <div className='overflow-container'>
      <Table className='display-tasks-table' aria-label="simple table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Task Type</TableCell>
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

const mapDispatchToProps = {getTasks}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTasksTable)
