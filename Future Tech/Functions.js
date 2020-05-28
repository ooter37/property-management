import axios from 'axios';

module.exports = {
    getContractors: async () => {
      let data;
      await axios
        .get('http://localhost:4244/api/contractors')
        .then(res => (data = res.data))
        .catch(err => console.log(err));
      return data;
    },
    getHouses: async () => {
      let data;
      await axios
        .get('http://localhost:4244/api/houses')
        .then(res => (data = res.data))
        .catch(err => console.log(err));
      return data;
    },
    getTasks: async () => {
      let data;
      await axios
        .get('http://localhost:4244/api/houses')
        .then(res => (data = res.data))
        .catch(err => console.log(err));
      return data;
    },
    getRenters: async () => {
      let data;
      await axios
        .get('http://localhost:4244/api/houses')
        .then(res => (data = res.data))
        .catch(err => console.log(err));
      return data;
    },
    postEmail: async () => {
      
    }

} 