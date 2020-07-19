import {LOADING_STATUSES} from "../api";
import {REQUEST, FAILURE, SUCCESS, INITIAL} from "../actions/utils";


export const createASyncReducer = (initialState, request) => {
    return (state = initialState, action) => {
        console.log('action' , action)
        switch (action.type) {
        case request[REQUEST]:
        return {...state, loadingStatus: LOADING_STATUSES.LOADING};
        case request[FAILURE]:
        return {...state, ...action.payload, loadingStatus: LOADING_STATUSES.FAILURE};
        case request[SUCCESS]:
        return {...state, ...action.payload, loadingStatus: LOADING_STATUSES.SUCCESS};
        case request[INITIAL]:
        return initialState;
        default:
        return state
    }}
};