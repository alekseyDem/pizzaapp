import Axios from 'axios';
export const api = Axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 5000,
});

export const LOADING_STATUSES = {
    INITIAL: '* INITIAL *',
    LOADING: '* LOADING *',
    SUCCESS: '* SUCCESS *',
    FAILURE: '* FAILURE *',
};