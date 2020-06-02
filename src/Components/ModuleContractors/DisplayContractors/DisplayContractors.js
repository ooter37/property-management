import './DisplayContractors.scss'
import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux' 
// import {Redirect} from 'react-router-dom'
import {getContractors} from '../../../redux/reducers/houses'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Button} from '@material-ui/core'
import {confirmDelete, pleaseSignIn, success} from '../../Functions/Sweetalerts'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import MailIcon from '@material-ui/icons/Mail';

function DisplayContractors(props) {
  // const [redirect,setRedirect] = useState(false)
  // const {data} = props.user
  // const {getContractors} = props

  // useEffect(() => {
  //   if (!data) {setRedirect(true)}
  //   else if (!data.loading) {
  //     getContractors()
  //   }
  // },
  // [getContractors, data])

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
            <TableCell align='left'><Button 
            onClick={() => {
              if (props.user.data) {
                toggleEmail(contractor.email)
              } else {pleaseSignIn.fire()}
            }}
          startIcon={<MailIcon />} size='small' color='primary' className='renter-email-button'>Email</Button></TableCell>
            <TableCell component="th" scope="row">{contractor.name}</TableCell>
            <TableCell align="left">{contractor.email}</TableCell>
            <TableCell align="left">{contractor.phone}</TableCell>
            <TableCell align="left">{contractor.address} <p/>{contractor.city} {contractor.state} {contractor.zipcode}</TableCell>
            <TableCell align="left">{mappedServices}</TableCell>
            <TableCell align="right"><IconButton onClick={() => props.toggleUpdating('updating',contractor)} color='primary' className='edit-icon'><EditIcon /> </IconButton></TableCell>
            <TableCell align="left"><IconButton onClick={() => { if (props.user.data) {
              confirmDelete.fire({text: 'Are you sure you want to delete this contractor? This action is irreversible.'})
              .then((result) => {if (result.value) {deleteContractor(contractor.contractor_id)}})
                        } else {pleaseSignIn.fire()}}} color='secondary' > <DeleteIcon /></IconButton>
              
                        </TableCell>
            {/* <TableCell align="right"><Button 
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
                        startIcon={<DeleteIcon />} size='small' color='secondary' variant='outlined'>Delete</Button></TableCell> */}
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
          <TableCell><Button 
            onClick={() => {
              if (props.user.data) {
                toggleEmail(props.contractors && props.contractors.map(elem => elem.email))
              } else {pleaseSignIn.fire()}
            }}
             startIcon={<MailIcon />} size='small' color='primary' className='renter-email-button'>Email All</Button></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Services</TableCell>
            <TableCell colSpan={2} align="center">Actions</TableCell>
            {/* <TableCell align="right"></TableCell> */}
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
