import { fork, all } from '@redux-saga/core/effects';
// import { actionWatcherMessageSender } from './messageSender.saga';
// import { actionWatcherMessageHistory } from './messageHistory.saga';
import {actionWatcherOrders} from "./orders";
import {actionWatcherMenu} from './menu'

export function* rootSaga() {
    yield all([
        fork(actionWatcherOrders),
        fork(actionWatcherMenu)
    ])
}