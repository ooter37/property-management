import React, { useState} from 'react'
import './ModuleTasks.scss'
// import DisplayTasks from './DisplayTasksTable/DisplayTasks'
import AddTask from './AddTask/AddTask'
import DisplayTasksTable from './DisplayTasksTable/DisplayTasksTable'
// import useFetch from '../Hooks/useFetch'

export default function ModuleTasks(props) {
    const [tasks, setTasks] = useState()
    // const tasks = useFetch(`/api/tasks/${props.match.params.id}`,props.match.params.id)
    
    // useEffect(() => {
    //     axios.get('/api/houses').then(res => {
    //         setHouses(res.data)
    //         // console.log(res.data)
    //         if (res.data[0]){
    //         setSelectedHouse(res.data[0].house_id)}
    //     })}, []
    // )

    return (
        <div className='task-module'>
            <div className='table'>
                <DisplayTasksTable tasks={tasks} setTasks={setTasks} selectedHouse={props.match.params.id} />
            </div>
            <AddTask tasks={tasks} setTasks={setTasks} selectedHouse={props.match.params.id} />
        </div>
    )
}