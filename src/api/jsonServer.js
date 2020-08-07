import axios from 'axios';

// Every 8 hours must update baseURL from ngrok
export default axios.create({
    baseURL: 'http://3ef2cf29c09f.ngrok.io/'
})