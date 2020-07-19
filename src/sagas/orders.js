import { api } from '../api';
import { call, put } from 'redux-saga/effects';
import { takeLatest, } from 'redux-saga/effects'
import {
    ORDERS_HISTORY_TYPES,
    ordersHistoryAction
} from "../actions/orderHistoryActions";
import {REQUEST} from "../actions/utils";
import {getLCValueByKey, ORDER_HISTORY_LC_KEY} from "../utils";

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
export function* actionWatcherOrders() {
    yield takeLatest(ORDERS_HISTORY_TYPES[REQUEST], SAGAGetOrdersHistory)
}