import React from 'react'
import './DeleteTask.scss'
import axios from 'axios'

function DeleteTask(id) {
    if (this.props.user.data) {
        axios.delete(`/api/delete/${id}`).then(() => {
            
        })
    }
}