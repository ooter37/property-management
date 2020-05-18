import React from 'react'
import './DisplayTasks.scss'
import useFetch from '../../Hooks/useFetch'

export default function DisplayTasks(props) {
    // console.log(props)
    const tasks = useFetch(`/api/tasks/${props.selectedHouse}`,props.selectedHouse)
    const mappedTasks = tasks && tasks.map((task) => {
        return (
        <div key={`Tasks ${task.task_id}`}>{task.note}</div>
        )
    })
    return (
        <div>
            {mappedTasks}
        </div>
    )
}