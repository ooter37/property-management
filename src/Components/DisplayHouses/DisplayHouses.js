import './DisplayHouses.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from "moment";
import {ListItem, Button, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, makeStyles, Grid} from '@material-ui/core/';
// import { Card } from 'tabler-react'
// import "tabler-react/dist/Tabler.css";
import HouseButton from '../Functions/HouseButton'
import displayAddress from '../Functions/displayAddress'
import displayHouseStatus from '../Functions/displayHouseStatus'
import AddHouse from '../AddHouse/AddHouse'
import ImageUpload from '../Functions/ImageUpload'
import defaultHouseImage from '../../media/add-house-button.jpeg'
import ScrollContainer from '../ScrollContainer/ScrollContainer'

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });


function DisplayHouses () {
    const [houses, setHouses] = useState([])
    const [selectedHouse, setSelectedHouse] = useState(null)
    const [displayTasks, setDisplayTasks] = useState([])
    const classes = useStyles();

    useEffect(() => {
        // console.log('houses useeffect ran')
        axios.get('/api/houses').then(res => {
            setHouses(res.data)
            // console.log(res.data)
            if (res.data[0]){
            setSelectedHouse(res.data[0].house_id)}
        })}, []
    )

    useEffect(() => {
        // console.log(`task useeffect ran`)
        selectedHouse &&
        axios.get(`/api/tasks/${selectedHouse}`)
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
        }
        setDisplayTasks(pushTasks)
            // setDisplayTasks(tasks.data)
            // console.log(res.data)
        })}, [selectedHouse]
    )

    // const mappedTasks = displayTasks && displayTasks.map((task) => {
    //     return (
    //         <div className='mapped-urgent-tasks' key={`mappedUrgentTasks ${task.id}`}>
    //             <ListItem>{task.type}</ListItem>
    //             <ListItem>{moment(task.date).format("MMMM Do YYYY")}</ListItem>
    //         </div>
    //     )
    // })

    const scrollArray = houses.map((house) => {
        return (
            {name: <div className='container-tab' onClick={() => setSelectedHouse(house.house_id)} key={`Tab Label ${house.house_id}`}>
            <HouseButton selectedHouse={selectedHouse} image={house.image} title={house.address}>{house.address}</HouseButton>
        </div>}
        )
    })

    // console.log(scrollArray)
    
    // let container = []
    // const mappedNames = houses && houses.map((house) => {
    //     container.push({name: <div className='container-tab' onClick={() => setSelectedHouse(house.house_id)} key={`Tab Label ${house.house_id}`}>
    //     <HouseButton selectedHouse={selectedHouse} image={house.image} title={house.address}>{house.address}</HouseButton>
    // </div>})
    //     return (
    //         <Tab className='container-tab' onClick={() => setSelectedHouse(house.house_id)} key={`Tab Label ${house.house_id}`}>
    //             <HouseButton selectedHouse={selectedHouse} image={house.image} title={house.address}>{house.address}</HouseButton>
    //         </Tab>
           
    //     )
    // })
    const mappedHouses = houses && houses.map((house) => {
        if (house.house_id === selectedHouse)
        // if (1 === 1)

        {return (
                <div className='modules-container' key={`mappedHouses-${house.house_id}`}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Card style = {{ maxWidth: 350, minHeight: 400}}>
                                <CardMedia
                                style = {{ height: 0, minWidth: 350, paddingTop: '70%'}}
                                image= {house.image}
                                title="House Info"/>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">{house.address}</Typography>
                                    <div className='update-house-card-header'>
                                    <Link 
                                    to={{
                                        pathname: '/update_house',
                                        state: {
                                            selectedHouse: selectedHouse,
                                            address: house.address,
                                            city: house.city,
                                            state: house.state,
                                            zipcode: house.zipcode,
                                            status: house.status,
                                            rent: house.rent
                                        }
                                    }}>
                                    <Button color='primary' variant='outlined'>Update House</Button>
                                    </Link>
                                    <ImageUpload houses={houses} setHouses={setHouses} selectedHouse={selectedHouse}/>
                                    </div>
                                    {/* <Typography variant="body2" color="textSecondary" component="p">dfg sdf ghsfd gsdfhsdgh gh gf hfgfrdgdfgfdg dfsgfdsg dsfgfdgfdgdfg</Typography> */}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Card style = {{ maxWidth: 350, minHeight: 400}}>
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
                        <Grid item>
                            <Card style = {{ maxWidth: 350, minHeight: 400}}>
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
                </div>
        )}
    })

    return (
        <div>
            <ScrollContainer setSelectedHouse={setSelectedHouse} selectedHouse={selectedHouse} houses={houses} data={scrollArray}/>
                    {/* <HouseButton 
                    // selectedHouse={selectedHouse} 
                    image={defaultHouseImage}
                    title='Add New House'></HouseButton> */}
                {mappedHouses}
                    {/* <AddHouse setHouses={setHouses} setSelectedHouse={setSelectedHouse}/>            */}
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(DisplayHouses)
