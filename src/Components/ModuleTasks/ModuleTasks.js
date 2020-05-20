import React from 'react'
import './ModuleTasks.scss'
// import DisplayTasks from './DisplayTasksTable/DisplayTasks'
import AddTask from './AddTask/AddTask'
import DisplayTasksTable from './DisplayTasksTable/DisplayTasksTable'
import useFetch from '../Hooks/useFetch'

export default function ModuleTasks(props) {
    const tasks = useFetch(`/api/tasks/${props.match.params.id}`,props.match.params.id)
    
    return (
        <div className='task-module'>
            {/* <DisplayTasks selectedHouse={props.location.state.selectedHouse} /> */}
            <div className='table'>
            <DisplayTasksTable tasks={tasks} selectedHouse={props.match.params.id} />

            </div>
            <AddTask tasks={tasks} selectedHouse={props.match.params.id} />
        </div>
    )
}