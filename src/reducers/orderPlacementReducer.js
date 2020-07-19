// orderPlacementReducer.js
import {ORDER_PLACEMENT_TYPES} from "../actions/orderPlacementActions";
import {createASyncReducer} from "./utils";
import {LOADING_STATUSES} from "../api";

const initialState = {
    data: [],
    loadingStatus: LOADING_STATUSES.INITIAL,
    errorMessage: null
};

export const orderPlacementReducer = createASyncReducer(initialState, ORDER_PLACEMENT_TYPES);
