import {ORDERS_HISTORY_TYPES} from "../actions/orderHistoryActions";
import {createASyncReducer} from "./utils";
import {LOADING_STATUSES} from "../api";

const initialState = {
    data: [],
    loadingStatus: LOADING_STATUSES.INITIAL,
    errorMessage: null
};

export const ordersHistoryReducer = createASyncReducer(initialState, ORDERS_HISTORY_TYPES);
