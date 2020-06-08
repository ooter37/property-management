import './DisplayRenters.scss'
import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux' 
import {getRenters} from '../../../redux/reducers/houses'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Typography, Tooltip, Grid } from '@material-ui/core'
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
          <TableRow key={`renter-display-${renter.renter_id}`} className={`global-${renter.user_id.toString()} renter-row`}>
            <TableCell className='renter-table-send-email' align='left'><Button 
            onClick={() => {
              if (props.user.data) {
                toggleEmail(renter.email)
              } else {pleaseSignIn.fire()}
            }}
          startIcon={<MailIcon />} size='small' color='primary' className='renter-email-button'>Email</Button></TableCell>
            <TableCell className='renter-table-name' align='left'><Tooltip title={renter.name}><Typography noWrap={true}>{renter.name}</Typography></Tooltip></TableCell>
            <TableCell className='renter-table-email' align="right"><Tooltip title={renter.email}><Typography noWrap={true}>{renter.email}</Typography></Tooltip></TableCell>
            <TableCell className='renter-table-phone' align="right"><Tooltip title={renter.phone}><Typography noWrap={true}>{renter.phone}</Typography></Tooltip></TableCell>
            <TableCell className='renter-table-address' align="right"><Tooltip title={renter.address}><Typography noWrap={true}>{renter.address}</Typography></Tooltip></TableCell>
            <TableCell className='renter-table-action' align="right"><IconButton onClick={() => props.toggleUpdating('updating',renter)} color='primary' className='edit-icon'><EditIcon /> </IconButton></TableCell>
            <TableCell className='renter-table-action' align="left"><IconButton onClick={() => {if (props.user.data) {
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
        <TableHead className='table-head'>
          <TableRow className='table-head'>
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
