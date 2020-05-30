import './ModuleTasks.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

// import DisplayTasks from './DisplayTasksTable/DisplayTasks'
import AddTask from './AddTask/AddTask'
import DisplayTasksTable from './DisplayTasksTable/DisplayTasksTable'

function ModuleTasks(props) {
    const [tasks, setTasks] = useState()
    const selectedHouse = props.match.params.id

    useEffect(() => {
        axios.get(`/api/tasks/${selectedHouse}`).then(res => {
            setTasks(res.data)
        })}, [selectedHouse, setTasks]
    )


    return (
        <div className='task-module'>
            {
                (props.houses.selectedHouse)
                ?
                null:
                <Redirect to='/' />
            }
            <div className='table'>
                <DisplayTasksTable tasks={tasks} setTasks={setTasks} selectedHouse={props.match.params.id} />
            </div>
            <AddTask tasks={tasks} setTasks={setTasks} selectedHouse={props.match.params.id} />
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(ModuleTasks)
