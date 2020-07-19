import {MENU_TYPES} from "../actions/menuActions";
import {createASyncReducer} from "./utils";
import {LOADING_STATUSES} from "../api";

const initialState = {
    data: [],
    loadingStatus: LOADING_STATUSES.INITIAL,
    errorMessage: null
};

export const menuReducer = createASyncReducer(initialState, MENU_TYPES);