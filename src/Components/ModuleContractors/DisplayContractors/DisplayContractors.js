import './DisplayContractors.scss'
import React from 'react'
import {connect} from 'react-redux' 
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {confirmDelete, pleaseSignIn} from '../../Functions/Sweetalerts'
import axiosDelete from '../../Functions/axiosDelete'

function DisplayContractors(props) {

  

    const mappedContractors = props.contractors && props.contractors.map((contractor) => {
        return (
          <TableRow key={`contractor-display-${contractor.contractor}`} className={`global-${contractor.user_id.toString()}`}>
            <TableCell component="th" scope="row">{contractor.name}</TableCell>
            <TableCell align="right">{contractor.email}</TableCell>
            <TableCell align="right">{contractor.phone}</TableCell>
            <TableCell align="right">{contractor.address}</TableCell>
            <TableCell align="right"><Button 
            onClick={() => { if (contractor.user_id !== 0) {
                if (props.user.data) {
                        confirmDelete.fire({
                            text: 'Are you sure you want to delete this contractor? This action is irreversible.'}).then((result) => {
                            if (result.value) {axiosDelete('contractors',contractor.contractor_id)}})
                        } else {pleaseSignIn.fire()}
                    } else {
                        console.log('cant delete')
                    }
                    }
                } 
                        startIcon={<DeleteIcon />} size='small' color='secondary' variant='outlined'>Delete</Button></TableCell>
        </TableRow>
        )
    })


  return (
    <TableContainer className='table-container' style={{ width: '98%' }} component={Paper}>
      <Table className='display-tasks-table' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mappedContractors}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(DisplayContractors)
