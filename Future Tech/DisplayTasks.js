// import './DisplayTasks.scss'
import React from 'react'
import './DisplayTasks.scss'
import useFetch from '../../Hooks/useFetch'
import Table from './DisplayTasksTable'

export default function DisplayTasks(props) {
    console.log(props)
    const tasks = useFetch(`/api/tasks/${props.selectedHouse}`,props.selectedHouse)
    const mappedTasks = tasks && tasks.map((task) => {
        return (
        <div></div>
        )
    })
    return (
        <div className='table'>
            {/* <Table /> */}
        </div>
    )
}