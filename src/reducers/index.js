import {combineReducers} from "redux";
import {shoppingCartReducer} from "./shoppingCartReducer";
import {ordersHistoryReducer} from "./ordersHistoryReducer";
import {menuReducer} from "./menuReducer";
import {orderPlacementReducer} from "./orderPlacementReducer";

export const rootReducer = combineReducers({
    shoppingCartReducer,
    ordersHistoryReducer,
    menuReducer,
    orderPlacementReducer
});