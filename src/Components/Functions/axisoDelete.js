import axios from 'axios'
import {deleteSuccess} from './Sweetalerts'

export default function axiosDelete(api,id) {
    axios.delete(`/api/${api}s/${id}`).then(() => {
        deleteSuccess.fire({title: `${api} deleted`})
    }).catch((err) => console.log(`Error deleting ${api}.`, err))
    
}