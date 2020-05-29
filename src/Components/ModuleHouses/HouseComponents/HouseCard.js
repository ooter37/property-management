import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Card, CardActionArea, CardMedia, CardContent, Typography, Grid, Avatar, makeStyles} from '@material-ui/core/';
import ImageUpload from '../../Functions/ImageUpload'
import DisplayAddress from './DisplayAddress'
import HouseStatus from './HouseStatus'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';
import TaskCard from './TaskCard'

const tableSpacing = createMuiTheme({
    overrides: {
        MuiTableCell: {
            root: {  //This can be referred from Material UI API documentation. 
                padding: '4px 8px',
                // backgroundColor: "#eaeaea",
            },
        },
    },
});

const useStyles = makeStyles((theme) => ({
    avatar: {
      width: 200,
      height: 200,
      border: '2px solid #1b5e20'
    },
  }));

function HouseCard(props) {
    const classes = useStyles();
    const {selectedHouse} = props.houses
    const {selectedTasks} = props
 
    return (props.houses.houses.map((house) => {

        // console.log(props.houses.houses[selectedHouse.house_id])
        if (house.house_id === selectedHouse.house_id) {
            return (
                <div className='modules-container' key={`mappedHouses-${house.house_id}`}>
                
                <Grid>
                    <Grid container spacing={2} justify="center">
                        <Grid item style = {{ width: 800}}>
                            <Card className='selected-house-card' style = {{ height: 400}}>
                                <CardContent className='selected-house-card-content'>
                                    <div className='avatar-upload-container'>    
                                        <Avatar  alt="House Image" src={house.image} className={classes.avatar} />
                                        <ImageUpload houses={props.houses.houses} selectedHouse={selectedHouse}/>
                                    </div>
                                    <div className='selected-house-card-body'>
                                        <Typography className='avatar-title-container' variant="h4" component="h2">{house.address}</Typography>
                                        <div className='status-address-container'>
                                            <DisplayAddress house={house}/>
                                            <HouseStatus house={house}/>
                                        </div>
                                        <div className='selected-house-tasks'>
                                            <ThemeProvider theme={tableSpacing}>
                                                <TableContainer >
                                                    <Table  aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Urgent Tasks</TableCell>
                                                                <TableCell align="right">Date Due</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TaskCard selectedTasks={selectedTasks} />
                                                            {/* {mappedTasks} */}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </ThemeProvider>
                                        </div>
                                        <div className='update-house-button-container'>
                                            <Link 
                                                className='react-router-link'
                                                to={{
                                                    pathname: '/update_house',
                                                    state: {
                                                        selectedHouse: selectedHouse.house_id,
                                                        address: house.address,
                                                        city: house.city,
                                                        state: house.state,
                                                        zipcode: house.zipcode,
                                                        status: house.status,
                                                        rent: house.rent
                                                    }
                                                }}>
                                                <Button className='house-update-buttons' color='primary' variant='contained'>Update House</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>       
                        <Grid item style = {{ width: 400}}>
                            <Card style = {{ height: 400}}>
                                <Link to={{pathname: '/add_house'}}>
                                    <CardActionArea>
                                        <CardMedia
                                        style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
                                        image= {require ("../../../media/add-house-button.jpeg")}
                                        title="Add New House"/>
                                    </CardActionArea>
                                </Link>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">Add a New House</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">You'll be able to manage repairs, track rent, and more. </Typography>
                                        {/* <Button variant='contained' color='primary'>Add</Button> */}
                                    </CardContent>
                                    
                            </Card>
                        </Grid>
                        <Grid item style = {{ width: 400}}>
                            <Card style = {{ height: 400}}>
                                <Link to={`task/${house.house_id}`}>
                                    <CardActionArea>
                                        <CardMedia
                                        style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
                                        image= {require ("../../../media/mowing.jpeg")}
                                        title="House Tasks"/>
                                    </CardActionArea>
                                </Link>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">Tasks</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">View and manage a list of tasks for each house. </Typography>
                                    </CardContent>
                            </Card>
                        </Grid>
                        <Grid item style = {{ width: 400}}>
                            <Card style = {{ height: 400}}>
                                <Link to={{pathname: '/contractors'}}>
                                    <CardActionArea>
                                        <CardMedia
                                        style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
                                        image= {require ("../../../media/contractors.jpeg")}
                                        title="Servicemen"/>
                                    </CardActionArea>
                                </Link>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">Service Provider</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">Service providers are the people who work on your properties. Contractors, landscapers, electricians, etc. </Typography>
                                    </CardContent>
                            </Card>
                        </Grid>
                        <Grid item style = {{ width: 400}}>
                            <Card style = {{ height: 400}}>
                                <Link to={{pathname: '/renters'}}>
                                    <CardActionArea>
                                        <CardMedia
                                        style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
                                        image= {require ("../../../media/renters.jpeg")}
                                        title="Renters"/>
                                    </CardActionArea>
                                </Link>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">Renters</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">View a list of all renters. Keep track of rent payments, send mass emails, and more... </Typography>
                                    </CardContent>
                            </Card>
                        </Grid>
                        <Grid item style = {{ width: 400}}>
                            <Card style = {{ height: 400}}>
                                <CardMedia
                                style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
                                image= {require ("../../../media/construction.jpeg")}
                                title="New Features Coming"/>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">More Modules to Come</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">Check back regularly to see new features, or add your e-mail address and we'll keep you up to date. </Typography>
    
                                    </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )} else {
            return null
        }
    }))
}


const mapStateToProps = state => state

export default connect(mapStateToProps, null)(HouseCard)
