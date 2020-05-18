import {useState, useEffect} from 'react'
import axios from 'axios'

const useFetch = (api) => {
    const [data, setData] = useState(null)
    
    useEffect(() => {
        axios.get(api)
        .then(res => setData(res.data))}, [api]
    )
    return data
}

export default useFetch