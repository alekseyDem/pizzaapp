import { api } from '../api';
import { call, put } from 'redux-saga/effects';
import { takeLatest, } from 'redux-saga/effects'
import {
    MENU_TYPES,
    menuAction
} from "../actions/menuActions";
import {REQUEST} from "../actions/utils";
import pizzaImg from '../istockphoto-938742222-1024x1024.jpg';

const INGREDIENTS = ['pepper', 'salmon', 'bacon', 'tomato', 'mozzarella', 'fish', 'cheese', 'mayo', 'onion', 'mushrooms'];
const generateIngredients = () => {
    const res = [];
    for (let i = 0; i < 5; i++) {
        res.push(INGREDIENTS[Math.floor(Math.random()*INGREDIENTS.length)])
    }
    return res
}

// const pizzaImg = 'https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222'
const pizzas = [
    {
        name: 'Pizza One',
        ingredients: generateIngredients(),
        img: pizzaImg,
        price: {
            usd: 5.5,
            eur: 6.7
        },
        id: 1
    },
    {
        name: 'Pizza Two',
        ingredients: generateIngredients(),
        img: pizzaImg,
        price: {
            usd: 2,
            eur: 3
        },
        id: 2
    },
    {
        name: 'Pizza Three',
        ingredients: generateIngredients(),
        img: pizzaImg,
        price: {
            usd: 6.5,
            eur: 8
        },
        id: 3
    },
    {
        name: 'Pizza Four',
        ingredients: generateIngredients(),
        img: pizzaImg,
        price: {
            usd: 10.5,
            eur: 12
        },
        id: 4
    },
    {
        name: 'Pizza Five',
        ingredients: generateIngredients(),
        img: pizzaImg,
        price: {
            usd: 14.5,
            eur: 16
        },
        id: 5
    },
    {
        name: 'Pizza Six',
        ingredients: generateIngredients(),
        img: pizzaImg,
        price: {
            usd: 1.5,
            eur: 3
        },
        id: 6
    },
    {
        name: 'Pizza Seven',
        ingredients: generateIngredients(),
        img: pizzaImg,
        price: {
            usd: 7,
            eur: 9
        },
        id: 7
    },
    , {
        name: 'Pizza Eight',
        ingredients: generateIngredients(),
        img: pizzaImg,
        price: {
            usd: 6,
            eur: 7
        },
        id: 8
    }
];

const APIGetMenu = () => api.get(`/posts`);
export function* SAGAGetMenu () {
    try {
        const response = yield call(APIGetMenu);
        // simulate success http-response
        yield put(menuAction.success({data: pizzas}))
    } catch (e) {
        yield put(menuAction.failure(e))
    }
}
export function* actionWatcherMenu() {
    yield takeLatest(MENU_TYPES[REQUEST], SAGAGetMenu)
}