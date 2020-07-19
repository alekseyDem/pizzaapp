import {actionWithoutPayload, createAsyncRequestTypes, action, resetToInitialAction, FAILURE, INITIAL, REQUEST, SUCCESS} from "./utils";

export const ORDERS_HISTORY_TYPES = createAsyncRequestTypes('ORDERS_HISTORY');

export const ordersHistoryAction = {
    request: () => actionWithoutPayload(ORDERS_HISTORY_TYPES[REQUEST]),
    success: (response) => action(ORDERS_HISTORY_TYPES[SUCCESS], response),
    failure: (errorMessage) => action(ORDERS_HISTORY_TYPES[FAILURE], {errorMessage}),
    initial: () => resetToInitialAction(ORDERS_HISTORY_TYPES[INITIAL]),
};