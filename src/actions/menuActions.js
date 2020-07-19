import {actionWithoutPayload, createAsyncRequestTypes, action, resetToInitialAction, FAILURE, INITIAL, REQUEST, SUCCESS} from "./utils";

export const MENU_TYPES = createAsyncRequestTypes('MENU');

export const menuAction = {
    request: () => actionWithoutPayload(MENU_TYPES[REQUEST]),
    success: (response) => action(MENU_TYPES[SUCCESS], response),
    failure: (errorMessage) => action(MENU_TYPES[FAILURE], {errorMessage}),
    initial: () => resetToInitialAction(MENU_TYPES[INITIAL]),
};