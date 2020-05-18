import React from 'react'
import DisplayTasks from './DisplayTasks/DisplayTasks'
import AddTask from './AddTask/AddTask'

export default function ModuleTasks(props) {
    // console.log(props.location.state.selectedHouse)
    // console.log(props)
    return (
        <div className='task-module'>
            module tasks
            {/* <DisplayTasks selectedHouse={props.location.state.selectedHouse} /> */}
            <DisplayTasks selectedHouse={props.match.params.id} />
            <AddTask />
        </div>
    )
}