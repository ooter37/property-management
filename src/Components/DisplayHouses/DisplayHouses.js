import React, {useState, useEffect} from 'react'
import './DisplayHouses.scss'
import {connect} from 'react-redux'
import axios from 'axios'
import useFetch from '../Hooks/useFetch'

function DisplayHouses (props) {
    const sampleHouse = {link_id: 0, user_id: 0, house_id: 0, email: "sample@sample.sample", address: "123 Fake St.", city: 'Springfield', state: 'Illinois', zipcode: 62629, rent: 2000, status: 'rented'}

    // const [houses, setHouses] = useState(sampleHouse)
    const houses = useFetch('/api/houses')
    console.log(houses)
    // useEffect(() => {
    //     axios.get('/api/houses')
    //     .then(res => {
    //         setHouses(res)
    //         console.log(res)})
    // },[])
    const mappedHouses = houses && houses.map((house) => {
        return (
            <div key={houses.link_id}>
                <div>{house.address}</div>
            </div>
        )
    })
    return (
        <div>
            {mappedHouses}
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(DisplayHouses)
