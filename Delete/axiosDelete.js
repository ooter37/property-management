import axios from 'axios'
import {success} from './Sweetalerts'

export default function axiosDelete(api,id) {
    axios.delete(`/api/${api}s/${id}`).then(() => {
        success.fire({title: `${api} deleted`})
    }).catch((err) => console.log(`Error deleting ${api}.`, err))
    
}