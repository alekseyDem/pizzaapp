export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const INITIAL = 'INITIAL';

export function createAsyncRequestTypes(base) {
    return {
        REQUEST: `${base}_${REQUEST}`,
        SUCCESS: `${base}_${SUCCESS}`,
        FAILURE: `${base}_${FAILURE}`,
        INITIAL: `${base}_${INITIAL}`,
    }
}
export function action(type, payload) {
    return {type, payload}
}
export function actionWithoutPayload(type) {
    return {type}
}

export function resetToInitialAction(type)  {
    return {type}
}