import './ModuleTasks.scss'
import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {getTasks} from '../../redux/reducers/houses'
import {Redirect} from 'react-router-dom'


// import DisplayTasks from './DisplayTasksTable/DisplayTasks'
import AddTask from './AddTask/AddTask'
import DisplayTasksTable from './DisplayTasksTable/DisplayTasksTable'

function ModuleTasks(props) {
    const {getTasks} = props

    useEffect(() => {
        getTasks()
    },[getTasks])


    return (
        <div className='task-module'>
            {
                (props.houses.selectedHouse)
                ?
                null:
                <Redirect to='/' />
            }
            <div className='table'>
                <DisplayTasksTable  />
            </div>
            <AddTask  />
        </div>
    )
}

const mapDispatchToProps = {getTasks}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(ModuleTasks)
