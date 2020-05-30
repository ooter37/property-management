import './ModuleHouses.scss'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getHouses, setSelectedHouseRedux} from '../../redux/reducers/houses'
import {requestUserData} from '../../redux/reducers/user'
import {Link} from 'react-router-dom'
import {Card, CardActionArea, CardMedia, CardContent, Typography, Grid} from '@material-ui/core/';
import ScrollContainer from '../ScrollContainer/ScrollContainer'

import HouseCard from './HouseComponents/HouseCard'

function DisplayHouses (props) {
    const [selectedTasks, setSelectedTasks] = useState([])
    // const classes = useStyles();
    const data = props.user
    const {getHouses} = props
    const {selectedHouse} = props.houses

    useEffect(() => {
        if (!data.loading) {
            // console.log('selectedHouse',props.houses.selectedHouse)
            getHouses()
        //     .then((res) => {
        //         // console.log('.selectedHouse',props.houses.selectedHouse)
        //       res.value.length > 0 &&
        //       setSelectedHouseRedux(res.value[0])
        //     //   console.log(props.houses.selectedHouse)
        //   })
        }
      },
      [getHouses, data])

    
    useEffect(() => {
        selectedHouse &&
        axios.get(`/api/tasks/${selectedHouse.house_id}`)
        .then(res => {
            let pushTasks = []
            if (res.data[0])
            {res.data.forEach(task => {
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
   
    return (
        <div>
            {/* <button onClick={() => console.log()}>console log</button> */}
            <div className='scroll-container'>
                <ScrollContainer />

           </div>
            {
                // (!props.houses.houses.loading && !props.houses.selectedHouse.loading)
                (props.houses.houses.length > 0 && props.houses.selectedHouse)
                ?
                <HouseCard selectedTasks={selectedTasks} />
                :
                <div className='modules-container'>
                <Grid item>
                    <Card style = {{ maxWidth: 350, minHeight: 400}}>
                        <Link to={{pathname: '/add_house',}}>
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
        </div>
    )
}

const mapDispatchToProps = {requestUserData, getHouses, setSelectedHouseRedux}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(DisplayHouses)