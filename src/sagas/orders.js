import { api } from '../api';
import { call, put } from 'redux-saga/effects';
import { takeLatest, } from 'redux-saga/effects'
import {
    ORDERS_HISTORY_TYPES,
    ordersHistoryAction
} from "../actions/orderHistoryActions";
import {REQUEST} from "../actions/utils";
import {getLCValueByKey, ORDER_HISTORY_LC_KEY, setLCValueByKey} from "../utils";
import {ORDER_PLACEMENT_TYPES, ordersPlacementAction} from "../actions/orderPlacementActions";
import {MENU_TYPES} from "../actions/menuActions";

const APIGetOrdersHistory = () => api.get(`/posts`);
export function* SAGAGetOrdersHistory () {
    try {
        const response = yield call(APIGetOrdersHistory);
        // simulate success http-response
        const orderHistory = getLCValueByKey(ORDER_HISTORY_LC_KEY);
        yield put(ordersHistoryAction.success({data: orderHistory}))
    } catch (e) {
        yield put(ordersHistoryAction.failure(e))
    }
}



const APIOrderPlacement = (payload) => api.post(`/posts`, payload);

//simulation of a remote DB
const setOrderToHistory = (order) => {
    const prevHistoryString = getLCValueByKey(ORDER_HISTORY_LC_KEY);
    const prevHistoryParsed = prevHistoryString || [];
    const newHistory = [...prevHistoryParsed, order];
    setLCValueByKey(newHistory, ORDER_HISTORY_LC_KEY);
};

export function* SAGAOrderPlacement (params) {
    const {payload} = params;
    try {
        const response = yield call(APIOrderPlacement, payload);
        // simulate success http-response
        yield put(ordersPlacementAction.success());
        setOrderToHistory(payload)
    } catch (e) {
        yield put(ordersPlacementAction.failure(e))
    }
}

export function* actionWatcherOrders() {
    yield takeLatest(ORDERS_HISTORY_TYPES[REQUEST], SAGAGetOrdersHistory);
    yield takeLatest(ORDER_PLACEMENT_TYPES[REQUEST], SAGAOrderPlacement);
}