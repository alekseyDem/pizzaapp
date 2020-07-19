import React, {useEffect} from 'react';
import {Card, Button} from 'antd';
import { Row, Col } from 'antd';
import {connect} from "react-redux";
import {addItemToShoppingCart, removeItemFromShoppingCart} from "../reducers/shoppingCartReducer";
import {renderPrice} from "../utils";
import {menuAction} from "../actions/menuActions";
import {LoadingHandler} from "../UI/LoadingHandler";
const { Meta } = Card;

const Menu = ({getMenu, data, addItemToCart, loadingStatus, errorMessage}) => {
    useEffect(() => {
        getMenu();
    }, []);
    return (
        <LoadingHandler loadingStatus={loadingStatus} errorMessage={errorMessage} minHeight={400}>
            <Row
                gutter={[0,20]}
               justify="space-around"
            >
                {data.map(pizza => {
                    return <Col key={pizza.id}
                                xs={{ span: 4, offset: 1 }} lg={{ span: 4 }}
                    >
                        <Card hoverable
                              style={{width: 240}}

                              cover={<img alt={pizza.name} src={pizza.img}/>}>
                            <Meta
                                title={pizza.name}
                            />

                            {pizza.ingredients.join()}
                            <p>
                                {renderPrice(pizza.price)}
                            </p>
                            <Button type="primary" onClick={() => addItemToCart(pizza)}>
                                Add to the cart
                            </Button>
                        </Card>
                    </Col>
                })}
            </Row>
        </LoadingHandler>
    );
};

const mapStateToProps = (state) => {
    const {data, loadingStatus, errorMessage} = state.menuReducer

    return {
        shoppingCartItems: state.shoppingCartReducer,
        data,
        loadingStatus,
        errorMessage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (item) => dispatch(addItemToShoppingCart(item)),
        removeItemFromCart: (item) => dispatch(removeItemFromShoppingCart(item)),
        getMenu: () => dispatch(menuAction.request()),
    }
};

export const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);
