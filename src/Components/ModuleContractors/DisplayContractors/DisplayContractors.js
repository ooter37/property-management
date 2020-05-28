import './DisplayContractors.scss'
import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux' 
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {confirmDelete, pleaseSignIn, success} from '../../Functions/Sweetalerts'

function DisplayContractors(props) {

  function deleteContractor(id) {
    axios.delete(`/api/contractors/${id}`)
    .then(() => {success.fire({title: 'Contractor Deleted'})})
      .then (() => {
        axios.get('/api/contractors').then(res => {
            props.setContractors(res.data)
    })
    }).catch((err) => console.log('Error deleting contractor.', err))
  }

    const mappedContractors = props.contractors ? props.contractors.map((contractor) => {
      const mappedServices = (contractor.services) && contractor.services.map((service) => {
        return (
          <p>{service}</p>
        )
      })
        return (
          <TableRow key={`contractor-display-${contractor.contractor_id}`} className={`global-${contractor.user_id.toString()}`}>
            <TableCell component="th" scope="row">{contractor.name}</TableCell>
            <TableCell align="left">{contractor.email}</TableCell>
            <TableCell align="left">{contractor.phone}</TableCell>
            <TableCell align="left">{contractor.address} <p/>{contractor.city} {contractor.state} {contractor.zipcode}</TableCell>
            <TableCell align="left">{mappedServices}</TableCell>
            <TableCell align="right"><Button 
            onClick={() => { if (contractor.user_id !== 0) {
                if (props.user.data) {
                        confirmDelete.fire({
                            text: 'Are you sure you want to delete this contractor? This action is irreversible.'}).then((result) => {
                            if (result.value) {deleteContractor(contractor.contractor_id)}})
                        } else {pleaseSignIn.fire()}
                    } else {
                        console.log('cant delete')
                    }
                    }
                } 
                        startIcon={<DeleteIcon />} size='small' color='secondary' variant='outlined'>Delete</Button></TableCell>
        </TableRow>
        )
    }) : null


  return (
    <TableContainer className='table-container' style={{ width: '98%' }} component={Paper}>
    <button onClick={() => console.log(props.contractors)} >console log</button>
      <div className='overflow-container'>
      <Table className='display-tasks-table' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Services</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mappedContractors}
        </TableBody>
      </Table>
      </div>
    </TableContainer>
  );
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(DisplayContractors)
