import {useState, useEffect} from 'react'
import axios from 'axios'

const useFetch = (api,selectedHouse) => {
    const [data, setData] = useState(null)
    
    useEffect(() => {
        selectedHouse
        &&
        axios.get(api)
        .then(res => setData(res.data))}, [api,selectedHouse]
    )
    return data
}

export default useFetch