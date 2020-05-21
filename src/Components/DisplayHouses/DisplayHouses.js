import './DisplayHouses.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Link} from 'react-router-dom'
import HouseButton from '../Functions/HouseButton'
import displayAddress from '../Functions/displayAddress'
import AddHouse from '../AddHouse/AddHouse'
import {Typography, ListItemIcon, ListItem, Button} from '@material-ui/core/';
// import Card from './Card'
import { Card} from 'tabler-react'
import "tabler-react/dist/Tabler.css";
import moment from "moment";

function DisplayHouses (props) {
    // const sampleHouse = {link_id: 0, user_id: 0, house_id: 0, email: "sample@sample.sample", address: "123 Fake St.", city: 'Springfield', state: 'Illinois', zipcode: 62629, rent: 2000, status: 'rented'}
    const [houses, setHouses] = useState(null)
    const [selectedHouse, setSelectedHouse] = useState(null)
    const [displayTasks, setDisplayTasks] = useState([])

    useEffect(() => {
        axios.get('/api/houses')
        .then(res => {
            setHouses(res.data)
            // console.log(res.data)
            if (res.data[0]){
            setSelectedHouse(res.data[0].house_id)}
        })}, []
    )
    useEffect(() => {
        selectedHouse &&
        axios.get(`/api/tasks/${selectedHouse}`)
        .then(res => {
            let pushTasks = []
            if (res.data[0])
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

    // const tasks = useFetch(`/api/tasks/${selectedHouse}`,selectedHouse)

    // const mappedTasks = tasks.map(task => {
    //     if (task.urgent) {setDisplayTasks([...displayTasks,task])}
    // })
    const mappedTasks = displayTasks && displayTasks.map((task) => {
        return (
            <div className='mapped-urgent-tasks' key={`mappedUrgentTasks ${task.id}`}>
                <ListItem>{task.type}</ListItem>
                <ListItem>{moment(task.date).format("MMMM Do YYYY")}</ListItem>
            </div>
        )
    })
    
    const mappedNames = houses && houses.map((house) => {
        return (
            <Tab onClick={() => setSelectedHouse(house.house_id)} key={`Tab Label ${house.house_id}`}>
                <HouseButton selectedHouse={selectedHouse} image={house.image} title={house.address}>{house.address}</HouseButton>
            </Tab>
        )
    })
    const mappedHouses = houses && houses.map((house) => {
        return (
            <TabPanel className='tab-panel' key={house.link_id}>
                <div className='display-houses-header-bar'>
                    <div className='house-address-container'>{displayAddress(house)}</div>
                    <div className='status-container'>
                        <Typography component={'div'}>
                            <Typography variant='h5'>Rental Status</Typography>
                            <Typography>{house.status}</Typography>
                            <Typography>Monthly Income: ${house.rent}</Typography>
                        </Typography>
                    </div>
                </div>
                <div className='modules'>
                    <div className='card-holder'>
                        <Card>
                            <Card.Header>
                            <Link to={`task/${house.house_id}`}><Card.Title><Button variant='outlined'>Manage Tasks</Button></Card.Title></Link>
                            </Card.Header>
                            <Card.Body>
                                <h5>Urgent</h5>
                                {mappedTasks}
                            </Card.Body>
                        </Card> 
                    </div>     
                </div>
            </TabPanel>
        )
    })
    return (
        <div>
            <button onClick={() => console.log(displayTasks)} >console log button</button>
            <Tabs>
                <TabList>
                    {mappedNames}
                    <Tab>ADD HOUSE</Tab>
                </TabList>
                {mappedHouses}
                <TabPanel>
                    <AddHouse/>
                </TabPanel>
            </Tabs>
            
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(DisplayHouses)
