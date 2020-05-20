import './DisplayHouses.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Link} from 'react-router-dom'
import ButtonBase from '@material-ui/core/ButtonBase';

import displayAddress from '../Functions/displayAddress'
import AddHouse from '../AddHouse/AddHouse'

function DisplayHouses (props) {
    // const sampleHouse = {link_id: 0, user_id: 0, house_id: 0, email: "sample@sample.sample", address: "123 Fake St.", city: 'Springfield', state: 'Illinois', zipcode: 62629, rent: 2000, status: 'rented'}
    const [houses, setHouses] = useState(null)
    const [selectedHouse, setSelectedHouse] = useState(null)
    useEffect(() => {
        axios.get('/api/houses')
        .then(res => {
            setHouses(res.data)
            // console.log(res.data)
            setSelectedHouse(res.data[0].house_id)
        })}, []
    )


    const mappedNames = houses && houses.map((house) => {
        return (
            <Tab onClick={() => setSelectedHouse(house.house_id)} key={`Tab Label ${house.house_id}`}>
                <div>{house.address}</div>
            </Tab>
        )
    })
    const mappedHouses = houses && houses.map((house) => {
        return (
            <TabPanel className='tab-panel' key={house.link_id}>
                <div className='display-houses-header-bar'>
                    <div className='house-address-container'>{displayAddress(house)}</div>
                    <div className='status-container'>
                        <div>{house.status}</div>
                        <div>{house.rent}</div>
                    </div>
                </div>
                <div className='modules'>
                    <Link to={`task/${house.house_id}`}><div className='module-button'>TASKS</div></Link>
                    {/* <Link to={{pathname: '/task', state: {selectedHouse: house.house_id}}}><div>TASKS</div></Link> */}
                    {/* <div className='module-container'><DisplayTasks selectedHouse={selectedHouse} /></div> */}
                </div>
            </TabPanel>
        )
    })
    return (
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
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(DisplayHouses)
