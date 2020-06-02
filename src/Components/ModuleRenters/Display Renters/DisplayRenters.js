import './DisplayRenters.scss'
import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux' 
import {getRenters} from '../../../redux/reducers/houses'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import {confirmDelete, pleaseSignIn, success} from '../../Functions/Sweetalerts'
import MailIcon from '@material-ui/icons/Mail';

function DisplayRenters(props) {

  function deleteRenter(id) {
    axios.delete(`/api/renters/${id}`)
    .then(() => {success.fire({title: 'Renter Deleted'})})
      .then (() => {
        props.getRenters()
    }).catch((err) => console.log('Error deleting renter.', err))
  }
  // function deleteRenter(id) {
  //   axios.delete(`/api/renters/${id}`)
  //   .then(() => {success.fire({title: 'Renter Deleted'})})
  //     .then (() => {
  //       axios.get('/api/renters').then(res => {
  //           props.setRenters(res.data)
  //   })
  //   }).catch((err) => console.log('Error deleting renter.', err))
  // }

  function toggleEmail(email) {
    props.setEmailing(email)
    props.setDisplaying('emailing')
  }

    const mappedRenters = props.renters ? props.renters.map((renter) => {
        return (
          <TableRow key={`renter-display-${renter.renter_id}`} className={`global-${renter.user_id.toString()}`}>
            <TableCell align='left'><Button 
            onClick={() => {
              if (props.user.data) {
                toggleEmail(renter.email)
              } else {pleaseSignIn.fire()}
            }}
          startIcon={<MailIcon />} size='small' color='primary' className='renter-email-button'>Email</Button></TableCell>
            <TableCell align='left'>{renter.name}</TableCell>
            <TableCell align="right">{renter.email}</TableCell>
            <TableCell align="right">{renter.phone}</TableCell>
            <TableCell align="right">{renter.address}</TableCell>
            <TableCell align="right"><IconButton onClick={() => props.toggleUpdating('updating',renter)} color='primary' className='edit-icon'><EditIcon /> </IconButton></TableCell>
            <TableCell align="left"><IconButton onClick={() => {if (props.user.data) {
                        confirmDelete.fire({text: 'Are you sure you want to delete this renter? This action is irreversible.'})
                        .then((result) => {if (result.value) {deleteRenter(renter.renter_id)}})
                        } else {pleaseSignIn.fire()}}} 
                        color='secondary' ><DeleteIcon /></IconButton></TableCell>
        </TableRow>
        )
    }) : null


  return (
    <TableContainer className='table-container' style={{ width: '98%' }} component={Paper}>
      <div className='overflow-container'>
      <Table className='display-tasks-table' aria-label="simple table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell><Button 
            onClick={() => {
              if (props.user.data) {
                toggleEmail(props.renters && props.renters.map(elem => elem.email))
              } else {pleaseSignIn.fire()}
            }}
             startIcon={<MailIcon />} size='small' color='primary' className='renter-email-button'>Email All</Button></TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">House</TableCell>
            <TableCell colSpan={2} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{mappedRenters}</TableBody>
      </Table>
      </div>
    </TableContainer>
  );
}

const mapDispatchToProps = {getRenters}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(DisplayRenters)
