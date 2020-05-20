import {useState, useEffect} from 'react'
import axios from 'axios'

const useGoogleImage = (url) => {
    
    useEffect(() => {
        axios.get(url).then(res => {
            if (res.status === "ZERO_RESULTS") {
                return console.log('image not found')
            } else {
                return console.log('image found')
            }
        })
    })
}

export default useGoogleImage