import * as R from 'ramda'
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const RESET_SHOPPING_CART = 'RESET_SHOPPING_CART';

export const USD_PRICE_FOR_FREE_DELIVERY = 20;
const DEFAULT_DELIVERY_PRICE = {
    usd: 5,
    eur: 6
};

const shoppingCartInitialState = {
    items: [],
    totalQnty: 0,
    totalPrice: {
        usd: 0,
        eur: 0
    },
    deliveryPrice: {
        usd: 0,
        eur: 0
    }
};

export const addItemToShoppingCart = (item) => {
    return {
        type: ADD_ITEM,
        payload: item
    }
};

export const removeItemFromShoppingCart = (item) => {
    return {
        type: REMOVE_ITEM,
        payload: item
    }
};

export const resetCartToInitial = () => {
    return {
        type: RESET_SHOPPING_CART,
    }
};

const NO_ITEM_IN_ARRAY_INDEX = -1;

const getElemIndexInArray = (id ,array) => R.findIndex(R.propEq('id', id))(array);
const recalculateTotalOrder = (items) => {
    let totalQnty = 0;
    let totalPriceUsd = 0;
    let totalPriceEur = 0;
    let deliveryPriceUsd = 0;
    let deliveryPriceEur = 0;
    for (let i = 0; i < items.length; i++) {
        totalQnty += items[i].qnty;
        totalPriceUsd += items[i].price.usd * items[i].qnty;
        totalPriceEur += items[i].price.eur * items[i].qnty;
    };

    if (totalPriceUsd < USD_PRICE_FOR_FREE_DELIVERY) {
        deliveryPriceUsd = DEFAULT_DELIVERY_PRICE.usd;
        deliveryPriceEur = DEFAULT_DELIVERY_PRICE.eur;
    }
    return {
        totalQnty,
        totalPrice: {
            usd: (totalPriceUsd + deliveryPriceUsd).toFixed(2),
            eur: (totalPriceEur + deliveryPriceEur).toFixed(2)
        },
        deliveryPrice: {
            usd: deliveryPriceUsd,
            eur: deliveryPriceEur
        }

    }
};

const INCREASE_BY_ONE = 1;
const DECREASE_BY_ONE = -1;

const updateOrdersList = (index, items, increase) => {
    let action = increase ? INCREASE_BY_ONE : DECREASE_BY_ONE;
    const newQnty = items[index].qnty + action
    return R.update(index, {...items[index], qnty: newQnty, totalPriceByType: {
        usd: Number(newQnty * items[index].price.usd).toFixed(2),
        eur: Number(newQnty * items[index].price.eur).toFixed(2),
        } }, items)
};

const updateShoppingCartState = (items, total) => {
    return {
        items: items,
        ...total
    }
};

export const shoppingCartReducer = (state = shoppingCartInitialState, action) => {
    const index = getElemIndexInArray(R.path(['payload','id'], action), state.items);
    switch (action.type) {
        case ADD_ITEM:
            if (index === NO_ITEM_IN_ARRAY_INDEX) {
                const updatedItems = R.append({...action.payload,qnty: 1,  totalPriceByType: {
                        usd: action.payload.price.usd,
                        eur: action.payload.price.eur,
                    }}, state.items);
                const total = recalculateTotalOrder(updatedItems)
                return updateShoppingCartState(updatedItems, total)
            } else {
                const updatedItems = updateOrdersList(index, state.items, true);
                const total = recalculateTotalOrder(updatedItems)
                return updateShoppingCartState(updatedItems, total)
            }
        case REMOVE_ITEM:
            if (index === NO_ITEM_IN_ARRAY_INDEX) {
                return state
            } else {
                if (state.items[index].qnty === 1) {
                    const updatedItems = R.filter(elem => elem.id !== state.items[index].id, state.items);
                    const total = recalculateTotalOrder(updatedItems);
                    return updateShoppingCartState(updatedItems, total)
                };
                const updatedItems = updateOrdersList(index, state.items, false);
                const total = recalculateTotalOrder(updatedItems);
                return updateShoppingCartState(updatedItems, total)
            }
        case RESET_SHOPPING_CART:
            return shoppingCartInitialState;
        default:
            return state
    }
}