import './DisplayHouses.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from "moment";
import {ListItem, Button} from '@material-ui/core/';
import { Card, Grid } from 'tabler-react'
import "tabler-react/dist/Tabler.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import HouseButton from '../Functions/HouseButton'
import displayAddress from '../Functions/displayAddress'
import displayHouseStatus from '../Functions/displayHouseStatus'
import AddHouse from '../AddHouse/AddHouse'
import ImageUpload from '../Functions/ImageUpload'
import defaultHouseImage from '../../media/add-house-button.jpeg'

function DisplayHouses (props) {
    const [houses, setHouses] = useState(null)
    const [selectedHouse, setSelectedHouse] = useState(null)
    const [displayTasks, setDisplayTasks] = useState([])

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
            <Tab className='container-tab' onClick={() => setSelectedHouse(house.house_id)} key={`Tab Label ${house.house_id}`}>
                <HouseButton selectedHouse={selectedHouse} image={house.image} title={house.address}>{house.address}</HouseButton>
            </Tab>
           
        )
    })
    const mappedHouses = houses && houses.map((house) => {
        return (
            <TabPanel className='tab-panel' key={house.link_id}>
                <div className='modules'>
                    {/* <Grid.Row cards deck> */}
                        {/* <Grid.Col md={4}> */}
                            <Card className='tasks-card'>
                                <Card.Header><Link to={`task/${house.house_id}`}><Card.Title><Button color='primary' variant='outlined'>Manage Tasks</Button></Card.Title></Link></Card.Header>
                                <Card.Body>
                                    <h5>Urgent</h5>
                                    {mappedTasks}
                                    <div className='card-height-fixer'></div>
                                </Card.Body>
                            </Card> 
                        {/* </Grid.Col> */}

                        {/* <Grid.Col md={4}> */}
                            <Card className='tasks-card'>
                                <Card.Header className='update-house-card-header'>
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
                                    <Card.Title><Button color='primary' variant='outlined'>Update House</Button></Card.Title>
                                    </Link>
                                    <Card.Title className='upload-image-button-container'>
                                        <ImageUpload houses={houses} setHouses={setHouses} selectedHouse={selectedHouse}/>
                                    </Card.Title>
                                </Card.Header>
                            <Card.Body className='card-display-house-info-container'>
                            {displayAddress(house)}
                            {displayHouseStatus(house)}
                            </Card.Body>
                            <div className='card-height-fixer'></div>
                        </Card> 
                    {/* </Grid.Col> */}
                        {/* <Grid.Col md={4}><Card body="Short content" /></Grid.Col> */}
                    {/* </Grid.Row> */}

                </div>
            </TabPanel>
        )
    })
    // `url(${props.image})`
    return (
        <div>
            {/* <div className='horizontal-scroll'>
                <div className='test-div'>test div</div>
                <div className='test-div'>test div</div>
                <div className='test-div'>test div</div>
                <div className='test-div'>test div</div>
                <div className='test-div'>test div</div>
                <div className='test-div'>test div</div>
                <div className='test-div'>test div</div>
                <div className='test-div'>test div</div>
                <div className='test-div'>test div</div>
                <div className='test-div'>test div</div>
                <div className='test-div'>test div</div>
                <div className='test-div'>test div</div>
                <div className='test-div'>test div</div>
            </div> */}
            <button onClick={() => console.log(houses)} >console log button</button>
            <Tabs>
                <TabList>
                <div className='horizontal-scroll'>
                    {mappedNames}
                    <Tab>
                    <HouseButton 
                    // selectedHouse={selectedHouse} 
                    image={defaultHouseImage}
                    title='Add New House'></HouseButton>
                    </Tab>
                    </div>
                </TabList>
                {mappedHouses}
                <TabPanel>
                    <AddHouse setHouses={setHouses} setSelectedHouse={setSelectedHouse}/>
                </TabPanel>
            </Tabs>
            
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(DisplayHouses)
