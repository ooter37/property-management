import './DisplayHouses.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getHouses, setSelectedHouseRedux} from '../../redux/reducers/houses'
import {requestUserData} from '../../redux/reducers/user'
import {Link} from 'react-router-dom'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Card, CardActionArea, CardMedia, CardContent, Typography, Grid, Avatar, makeStyles} from '@material-ui/core/';
import ImageUpload from '../Functions/ImageUpload'
import ScrollContainer from '../ScrollContainer/ScrollContainer'
import DisplayAddress from './DisplayAddress'
import HouseStatus from './HouseStatus'
import moment from "moment"
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    avatar: {
      width: 200,
      height: 200,
      border: '2px solid #1b5e20'
    },
  }));

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

function DisplayHouses (props) {
    const [selectedTasks, setSelectedTasks] = useState([])
    const classes = useStyles();
    const data = props.user
    const {getHouses} = props
    const {selectedHouse} = props.houses
    // const house = props.houses.selectedHouse
    // useEffect(() => {
    //     console.log(props.user.data)
    //     // console.log('houses useeffect ran')
    //     axios.get('/api/houses').then(res => {
    //         setHouses(res.data)
    //         // console.log(res.data)
    //         if (res.data[0]){
    //         setSelectedHouse(res.data[0].house_id)}
    //     })}, []
    // )

    useEffect(() => {
        if (data) {
            getHouses()
            .then((res) => {
                console.log('display houses useeffect',res.value)
              res.value.length > 0 &&
              setSelectedHouseRedux(res.value[0])
            //   console.log(props.houses.selectedHouse)
          })
        }
      },
      [getHouses, data])

    
    useEffect(() => {
        // console.log(`task useeffect ran`)
        selectedHouse &&
        axios.get(`/api/tasks/${selectedHouse.house_id}`)
        .then(res => {
            let pushTasks = []
            if (res.data[0])
            // eslint-disable-next-line
            {res.data.map(task => {
                if (task.urgent) {
                    let type = task.type
                    let date = task.date
                    let id = task.task_id
                    pushTasks.push({type,date,id})
                }
            })
        } setSelectedTasks(pushTasks)
        })}, [selectedHouse]
    )
    const mappedTasks = selectedTasks.length !== 0 && selectedTasks.map((task) => {
        return (
        <TableRow key={`mappedTasks-${task.id}`}>
            <TableCell component="th" scope="row">{task.type}</TableCell>
            <TableCell align="right">{moment(task.date).format("MMMM Do YYYY")}</TableCell>
        </TableRow>
        )
    })
    // es-disable-next-line
    const mappedHouses = props.houses.houses.map((house) => {
        if (house.house_id === selectedHouse.house_id)
        // if (1 === 1)
        {
            return (
                <div className='modules-container' key={`mappedHouses-${house.house_id}`}>
                
                <Grid>
                    <Grid container spacing={2} justify="center">
                        <Grid item style = {{ width: 800}}>
                            <Card className='selected-house-card' style = {{ height: 400}}>
                                <CardContent className='selected-house-card-content'>
                                    <div className='avatar-upload-container'>
                                        {/* <Box border={2} borderRadius='50%'> */}
    
                                        <Avatar  alt="House Image" src={house.image} className={classes.avatar} />
                                        {/* </Box> */}
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
                                                            {mappedTasks}
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
                                        image= {require ("../../media/add-house-button.jpeg")}
                                        title="Add New House"/>
                                    </CardActionArea>
                                </Link>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">Add a New House</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">You'll be able to manage repairs, track rent, and more. </Typography>
                                    </CardContent>
                            </Card>
                        </Grid>
                        <Grid item style = {{ width: 400}}>
                            <Card style = {{ height: 400}}>
                                <Link to={`task/${house.house_id}`}>
                                    <CardActionArea>
                                        <CardMedia
                                        style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
                                        image= {require ("../../media/mowing.jpeg")}
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
                                        image= {require ("../../media/contractors.jpeg")}
                                        title="Servicemen"/>
                                    </CardActionArea>
                                </Link>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">Servicemen</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">Manage your handymen, contractors, landscapers, and anyone else that provides service for your houses. </Typography>
                                    </CardContent>
                            </Card>
                        </Grid>
                        <Grid item style = {{ width: 400}}>
                            <Card style = {{ height: 400}}>
                                <Link to={{pathname: '/renters'}}>
                                    <CardActionArea>
                                        <CardMedia
                                        style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
                                        image= {require ("../../media/renters.jpeg")}
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
                                image= {require ("../../media/construction.jpeg")}
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
        )}
    })
    // const selectedHouseInfo = houses.filter(house => {
    //     return house.house_id === selectedHouse
    // })
    return (
        <div>
            {/* <button onClick={() => console.log()}>console log</button> */}
            <div className='scroll-container'>
                <ScrollContainer 
                // setSelectedHouse={setSelectedHouse} 
                // selectedHouse={selectedHouse} 
                // houses={props.houses.houses}
                />
            </div>





            {mappedHouses}


            {
                (mappedHouses.length > 0)
                ?



        //         <div className='modules-container' key={`mappedHouses-${house.house_id}`}>
                
        //     <Grid>
        //         <Grid container spacing={2} justify="center">
        //             <Grid item style = {{ width: 800}}>
        //                 <Card className='selected-house-card' style = {{ height: 400}}>
        //                     <CardContent className='selected-house-card-content'>
        //                         <div className='avatar-upload-container'>
        //                             {/* <Box border={2} borderRadius='50%'> */}

        //                             <Avatar  alt="House Image" src={house.image} className={classes.avatar} />
        //                             {/* </Box> */}
        //                             <ImageUpload houses={props.houses.houses} selectedHouse={selectedHouse}/>
        //                         </div>
        //                         <div className='selected-house-card-body'>
        //                             <Typography className='avatar-title-container' variant="h4" component="h2">{house.address}</Typography>
        //                             <div className='status-address-container'>
        //                                 <DisplayAddress house={house}/>
        //                                 <HouseStatus house={house}/>
        //                             </div>
        //                             <div className='selected-house-tasks'>
        //                                 <ThemeProvider theme={tableSpacing}>
        //                                     <TableContainer >
        //                                         <Table  aria-label="simple table">
        //                                             <TableHead>
        //                                                 <TableRow>
        //                                                     <TableCell>Urgent Tasks</TableCell>
        //                                                     <TableCell align="right">Date Due</TableCell>
        //                                                 </TableRow>
        //                                             </TableHead>
        //                                             <TableBody>
        //                                                 {/* {mappedTasks} */}
        //                                             </TableBody>
        //                                         </Table>
        //                                     </TableContainer>
        //                                 </ThemeProvider>
        //                             </div>
        //                             <div className='update-house-button-container'>
        //                                 <Link 
        //                                     className='react-router-link'
        //                                     to={{
        //                                         pathname: '/update_house',
        //                                         state: {
        //                                             selectedHouse: selectedHouse.house_id,
        //                                             address: house.address,
        //                                             city: house.city,
        //                                             state: house.state,
        //                                             zipcode: house.zipcode,
        //                                             status: house.status,
        //                                             rent: house.rent
        //                                         }
        //                                     }}>
        //                                     <Button className='house-update-buttons' color='primary' variant='contained'>Update House</Button>
        //                                 </Link>
        //                             </div>
        //                         </div>
        //                     </CardContent>
        //                 </Card>
        //             </Grid>       
        //             <Grid item style = {{ width: 400}}>
        //                 <Card style = {{ height: 400}}>
        //                     <Link to={{pathname: '/add_house'}}>
        //                         <CardActionArea>
        //                             <CardMedia
        //                             style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
        //                             image= {require ("../../media/add-house-button.jpeg")}
        //                             title="Add New House"/>
        //                         </CardActionArea>
        //                     </Link>
        //                         <CardContent>
        //                             <Typography gutterBottom variant="h5" component="h2">Add a New House</Typography>
        //                             <Typography variant="body2" color="textSecondary" component="p">You'll be able to manage repairs, track rent, and more. </Typography>
        //                         </CardContent>
        //                 </Card>
        //             </Grid>
        //             <Grid item style = {{ width: 400}}>
        //                 <Card style = {{ height: 400}}>
        //                     <Link to={`task/${house.house_id}`}>
        //                         <CardActionArea>
        //                             <CardMedia
        //                             style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
        //                             image= {require ("../../media/mowing.jpeg")}
        //                             title="House Tasks"/>
        //                         </CardActionArea>
        //                     </Link>
        //                         <CardContent>
        //                             <Typography gutterBottom variant="h5" component="h2">Tasks</Typography>
        //                             <Typography variant="body2" color="textSecondary" component="p">View and manage a list of tasks for each house. </Typography>
        //                         </CardContent>
        //                 </Card>
        //             </Grid>
        //             <Grid item style = {{ width: 400}}>
        //                 <Card style = {{ height: 400}}>
        //                     <Link to={{pathname: '/contractors'}}>
        //                         <CardActionArea>
        //                             <CardMedia
        //                             style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
        //                             image= {require ("../../media/contractors.jpeg")}
        //                             title="Servicemen"/>
        //                         </CardActionArea>
        //                     </Link>
        //                         <CardContent>
        //                             <Typography gutterBottom variant="h5" component="h2">Servicemen</Typography>
        //                             <Typography variant="body2" color="textSecondary" component="p">Manage your handymen, contractors, landscapers, and anyone else that provides service for your houses. </Typography>
        //                         </CardContent>
        //                 </Card>
        //             </Grid>
        //             <Grid item style = {{ width: 400}}>
        //                 <Card style = {{ height: 400}}>
        //                     <Link to={{pathname: '/renters'}}>
        //                         <CardActionArea>
        //                             <CardMedia
        //                             style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
        //                             image= {require ("../../media/renters.jpeg")}
        //                             title="Renters"/>
        //                         </CardActionArea>
        //                     </Link>
        //                         <CardContent>
        //                             <Typography gutterBottom variant="h5" component="h2">Renters</Typography>
        //                             <Typography variant="body2" color="textSecondary" component="p">View a list of all renters. Keep track of rent payments, send mass emails, and more... </Typography>
        //                         </CardContent>
        //                 </Card>
        //             </Grid>
        //             <Grid item style = {{ width: 400}}>
        //                 <Card style = {{ height: 400}}>
        //                     <CardMedia
        //                     style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
        //                     image= {require ("../../media/construction.jpeg")}
        //                     title="New Features Coming"/>
        //                         <CardContent>
        //                             <Typography gutterBottom variant="h5" component="h2">More Modules to Come</Typography>
        //                             <Typography variant="body2" color="textSecondary" component="p">Check back regularly to see new features, or add your e-mail address and we'll keep you up to date. </Typography>

        //                         </CardContent>
        //                 </Card>
        //             </Grid>
        //         </Grid>
        //     </Grid>
        // </div>
                null


                :
                <div className='modules-container'>
                <Grid item>
                    <Card style = {{ maxWidth: 350, minHeight: 400}}>
                        <Link 
                            to={{
                                pathname: '/add_house',
                                // state: {
                                //     setHouses: setHouses,
                                //     setSelectedHouse: setSelectedHouse
                                // }
                            }}>
                            <CardActionArea>
                                <CardMedia
                                style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
                                image= {require ("../../media/add-house-button.jpeg")}
                                title="Add New House"/>
                            </CardActionArea>
                        </Link>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">Add a New House</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">An image of your house will be automatically fetched from Google Street View. You can replace it with the upload button. </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
            }







            {/* { 
            (mappedHouses.length)
            ?
            null
            :
            <div className='modules-container'>
                <Grid item>
                    <Card style = {{ maxWidth: 350, minHeight: 400}}>
                        <Link 
                            to={{
                                pathname: '/add_house',
                                // state: {
                                //     setHouses: setHouses,
                                //     setSelectedHouse: setSelectedHouse
                                // }
                            }}>
                            <CardActionArea>
                                <CardMedia
                                style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
                                image= {require ("../../media/add-house-button.jpeg")}
                                title="Add New House"/>
                            </CardActionArea>
                        </Link>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">Add a New House</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">An image of your house will be automatically fetched from Google Street View. You can replace it with the upload button. </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
            } */}
        </div>
        
    )
}

const mapDispatchToProps = {requestUserData, getHouses, setSelectedHouseRedux}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(DisplayHouses)
