import './DisplayContractors.scss'
import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux' 
// import {Redirect} from 'react-router-dom'
import {getContractors} from '../../../redux/reducers/houses'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Button, Typography, Tooltip } from '@material-ui/core'
import {confirmDelete, pleaseSignIn, success} from '../../Functions/Sweetalerts'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import MailIcon from '@material-ui/icons/Mail';

function DisplayContractors(props) {
  async function deleteContractor(id) {
    if (props.user.data) {
      try {
        await axios.delete(`/api/contractors/${id}`)
        success.fire({title: 'Contractor Deleted'})
        props.getContractors()
      } catch (error) {
        console.log('Error deleting contractor.', error)
      }
    } else {
      pleaseSignIn.fire()
    }
  }

  function toggleEmail(email) {
    props.setEmailing(email)
    props.setDisplaying('emailing')
  }

    const mappedContractors = props.contractors ? props.contractors.map((contractor) => {
      const mappedServices = (contractor.services) && contractor.services.map((service) => {
        return (
          <Chip key={`${contractor}.${service}`} size='small' label={service}/>
        )
      })
        return (
          <TableRow key={`contractor-display-${contractor.contractor_id}`} className={`global-${contractor.user_id.toString()}`}>
            <TableCell component="th" scope="row" align='left'><Tooltip title={contractor.name}><Typography className='table-typography-name' noWrap={true}>{contractor.name}</Typography></Tooltip></TableCell>
            <TableCell align="center">
              <div className='table-email-container'>
                  {
                    (contractor.email)
                    ?
                    <Tooltip title={`Email ${contractor.name}`}>
                      <Button 
                        onClick={() => {
                        if (props.user.data) {toggleEmail(contractor.email)} else {pleaseSignIn.fire()}}}
                        startIcon={<MailIcon />} size='small' color='primary'>
                      </Button>
                    </Tooltip>
                    :
                    null
                  }
                <Tooltip title={contractor.email}><Typography className='table-typography-email' noWrap={true}>{contractor.email}</Typography></Tooltip>
                </div>
            </TableCell>
            <TableCell align='left'><Tooltip title={contractor.phone}><Typography className='table-typography-phone' noWrap={true}>{contractor.phone}</Typography></Tooltip></TableCell>
            <TableCell align="left">
              <Tooltip title={`${contractor.address}`}>
              <Typography className='table-typography-address' noWrap={true}>{contractor.address}</Typography>
            </Tooltip>
              <Tooltip title={`${contractor.city} ${contractor.state} ${contractor.zipcode}`}>
              <Typography className='table-typography-address' noWrap={true}>{`${contractor.city} ${contractor.state} ${contractor.zipcode}`}</Typography> 
            </Tooltip>
            </TableCell>
            <TableCell align="left">{mappedServices}</TableCell>
            <TableCell align="right"><IconButton className='action-button' onClick={() => props.toggleUpdating('updating',contractor)} color='primary'><EditIcon /> </IconButton></TableCell>
            <TableCell align="left"><IconButton className='action-button' onClick={() => { if (props.user.data) {
              confirmDelete.fire({text: 'Are you sure you want to delete this contractor? This action is irreversible.'})
              .then((result) => {if (result.value) {deleteContractor(contractor.contractor_id)}})
                        } else {pleaseSignIn.fire()}}} color='secondary' > <DeleteIcon /></IconButton>
              
                        </TableCell>
        </TableRow>
        )
    }) : null


  return (
    // <div>
    // {
    //   redirect
    //   &&
    //   <Redirect to='/' />
    // }
    <TableContainer className='table-container' style={{ width: '98%' }} component={Paper}>
      <div className='overflow-container'>
      <Table className='display-tasks-table' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">
              <div className='header-email-container'>
              <Tooltip title='Email all contractors'>
                <Button 
                  onClick={() => {
                    if (props.user.data) {
                      toggleEmail(props.contractors && props.contractors.map(elem => elem.email))
                    } else {pleaseSignIn.fire()}
                  }}
                  startIcon={<MailIcon />} size='small' color='primary' className='renter-email-button'>
                </Button>
              </Tooltip>
              Email
              </div>
            </TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Services</TableCell>
            <TableCell colSpan={2} align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mappedContractors}
        </TableBody>
      </Table>
      </div>
    </TableContainer>
    // </div>
  );
}
const mapDispatchToProps = {getContractors}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(DisplayContractors)
