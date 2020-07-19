import React, {useEffect, useState} from "react";
import {
    addItemToShoppingCart,
    removeItemFromShoppingCart, resetCartToInitial,
    USD_PRICE_FOR_FREE_DELIVERY
} from "../reducers/shoppingCartReducer";
import {connect} from "react-redux";
import * as moment from 'moment';
import * as R from "ramda";
import {Link} from "react-router-dom";
import {Button, Form, Input, Space, Table, DatePicker, Result, Typography} from "antd";

import {
    rusPhoneNumberRegExp,
    renderPrice,
    renderOptionalFreePrice
} from "../utils";
import {ordersPlacementAction} from "../actions/orderPlacementActions";
import {LOADING_STATUSES} from "../api";
import CloseCircleOutlined from "@ant-design/icons/lib/icons/CloseCircleOutlined";
const { Paragraph, Text } = Typography;

const columns = (add, remove) => [
    {
        title: 'Pizza',
        dataIndex: 'name',
    },
    {
        title: 'Price',
        render: (text, record, index) => {
            return renderPrice(record.price)
        }
    },
    {
        title: 'Quantity',
        dataIndex: 'qnty',
    },
    {
        title: 'Total',
        render: (text, record, index) => {
            return renderPrice(record.totalPriceByType)
        }
    },
    {
        title: '',
        key: 'x',
        render: (text, record) => (
            <Space size="middle">
                <a onClick={() => add(record) }>Add</a>
                <a onClick={() => remove(record) }>Remove</a>
            </Space>
        ),
    },
];


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};


const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};

const disabledDate = (current) => {
    return current && current < moment().subtract(1, 'day');
};
const disabledDateTime = () => {
    return {
        disabledHours: () => range(0, moment().add(1, 'hours').format('H')),
    }
};

const generateOrderID =  () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const validatePhoneNumber = (num) => rusPhoneNumberRegExp.test(num)

const SHOPPING_CART_VIEWS = {
    ORDER_ITEMS_REVIEW: 'ORDER_ITEMS_REVIEW',
    ORDER_INFO_FORM: 'ORDER_INFO_FORM',
    ORDER_PLACED_SUCCESS: 'ORDER_PLACED_SUCCESS',
    ORDER_PLACED_FAILURE: 'ORDER_PLACED_FAILURE'
};
const Cart = ({resetCartToInitial, shoppingCartItems, addItemToCart, removeItemFromCart, orderPlacementReducer, placeOrder, resetOrderToInitial}) => {
    const {loadingStatus, errorMessage} = orderPlacementReducer;
    const [currentOrderView, setOrderView] = useState(SHOPPING_CART_VIEWS.ORDER_ITEMS_REVIEW)
    const onFinish = (v) => {
        const orderInfo = {
            // key is hack for the history table,
            key: generateOrderID(),
            address: v.address,
            deliveryTime: v.deliveryTime.toDate(),
            clientName: v.clientName,
            phoneNumber: v.phoneNumber,
            orderItems: shoppingCartItems
        };
        placeOrder(orderInfo)
    };
    useEffect(() => {
        return () => {
            resetOrderToInitial()
        }
    }, []);
    useEffect(() => {
        if (loadingStatus === LOADING_STATUSES.SUCCESS) {
            setOrderView(SHOPPING_CART_VIEWS.ORDER_PLACED_SUCCESS);
            resetCartToInitial();
        } else if (loadingStatus === LOADING_STATUSES.FAILURE) {
            setOrderView(SHOPPING_CART_VIEWS.ORDER_PLACED_FAILURE)

        }
    }, [orderPlacementReducer]);

    const shoppingCartEmpty = R.isEmpty(shoppingCartItems.items);
    return <>
        {currentOrderView === SHOPPING_CART_VIEWS.ORDER_ITEMS_REVIEW && <>
            <Table
                columns={columns(addItemToCart, removeItemFromCart)}
                dataSource={shoppingCartItems.items}
                expanablde
                summary={() => (
                    !shoppingCartEmpty && <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>Delivery</Table.Summary.Cell>
                            <Table.Summary.Cell index={1}/>
                            <Table.Summary.Cell index={2}/>
                            <Table.Summary.Cell index={3}>{renderOptionalFreePrice(shoppingCartItems.deliveryPrice, USD_PRICE_FOR_FREE_DELIVERY)}</Table.Summary.Cell>
                        </Table.Summary.Row>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
                            <Table.Summary.Cell index={1}/>
                            <Table.Summary.Cell index={2}>{shoppingCartItems.totalQnty}</Table.Summary.Cell>
                            <Table.Summary.Cell index={3}>{renderPrice(shoppingCartItems.totalPrice)}</Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                )}
            />
            {!shoppingCartEmpty && <Button type="primary"
                                           onClick={() => setOrderView(SHOPPING_CART_VIEWS.ORDER_INFO_FORM)}>Proceed to Order
            </Button>
            }
        </>}
        {currentOrderView === SHOPPING_CART_VIEWS.ORDER_INFO_FORM &&
        <div style={{width: 500, margin: '0 auto'}}>
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Name"
                    name="clientName"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={
                        [
                            { required: true, message: 'Please input your phone number!'},
                            { validator:(_, value) => validatePhoneNumber(value) ? Promise.resolve() : Promise.reject('Phone number is invalid') }
                        ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="deliveryTime" label="Select delivery time"
                   rules={
                    [
                        { type: 'object', required: true, message: 'Please select delivery time!' }
                    ]}
                >
                    <DatePicker
                        disabledDate={disabledDate}
                        disabledTime={disabledDateTime}
                        showTime format="YYYY-MM-DD HH:mm"
                    />
                </Form.Item>
                <Form.Item>
                    <Button loading={loadingStatus === LOADING_STATUSES.LOADING} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
        }
        {currentOrderView === SHOPPING_CART_VIEWS.ORDER_PLACED_SUCCESS && <Result
            status="success"
            title="Order has been successfully placed"
            extra={[
                <Link to={'/'}>
                    <Button type="primary" key="console">
                        Go To Menu
                    </Button>
                </Link>
            ]}
        />}

        {currentOrderView === SHOPPING_CART_VIEWS.ORDER_PLACED_FAILURE &&  <Result
            status="error"
            title="Submission Failed"
            subTitle="Please check and modify the following information before resubmitting."
            extra={[
                <Button type="primary" key="console">
                    Go To Menu
                </Button>,
                <Button onClick={() => setOrderView(SHOPPING_CART_VIEWS.ORDER_ITEMS_REVIEW)}>Try again</Button>,
            ]}
        >
            <div className="desc">
                <Paragraph>
                    <Text
                        strong
                        style={{
                            fontSize: 16,
                        }}
                    >
                        The order you submitted has the following error:
                    </Text>
                </Paragraph>
                <Paragraph>
                    <CloseCircleOutlined className="site-result-demo-error-icon" /> {errorMessage.message}
                </Paragraph>
            </div>
        </Result>}
    </>
};

const mapStateToProps = (state) => {
    return {
        shoppingCartItems: state.shoppingCartReducer,
        orderPlacementReducer: state.orderPlacementReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (item) => dispatch(addItemToShoppingCart(item)),
        removeItemFromCart: (item) => dispatch(removeItemFromShoppingCart(item)),
        resetCartToInitial: () => dispatch(resetCartToInitial()),
        placeOrder: (order) => dispatch(ordersPlacementAction.request(order)),
        resetOrderToInitial: () => dispatch(ordersPlacementAction.initial())
    }
};

export const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);