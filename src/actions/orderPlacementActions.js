import {actionWithoutPayload, createAsyncRequestTypes, action, resetToInitialAction, FAILURE, INITIAL, REQUEST, SUCCESS} from "./utils";

export const ORDER_PLACEMENT_TYPES = createAsyncRequestTypes('ORDER_PLACEMENT');

export const ordersPlacementAction = {
    request: (payload) => action(ORDER_PLACEMENT_TYPES[REQUEST], payload),
    success: (response) => actionWithoutPayload(ORDER_PLACEMENT_TYPES[SUCCESS]),
    failure: (errorMessage) => action(ORDER_PLACEMENT_TYPES[FAILURE], {errorMessage}),
    initial: () => resetToInitialAction(ORDER_PLACEMENT_TYPES[INITIAL]),
};