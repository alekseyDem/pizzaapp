import React, {useEffect} from 'react';
import {ordersHistoryAction} from "../actions/orderHistoryActions";
import {connect} from "react-redux";
import {Table} from "antd";
import {renderPrice} from "../utils";
import * as moment from "moment";
import {LOADING_STATUSES} from "../api";

const columns = [
    { title: 'Order Time', dataIndex: 'deliveryTime', key: 'deliveryTime',  render: (text, record, index) => {
            return moment(record.deliveryTime).format('YYYY-MM-DD')}
    } ,
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Client name', dataIndex: 'clientName', key: 'clientName' },
    { title: 'Price', dataIndex: 'totalPrice', key: 'totalPrice',  render: (text, record, index) => {
            return renderPrice(record.orderItems.totalPrice)}
    }
];

const OrdersHistory = (props) => {
    const {getOrdersHistory, data, loadingStatus} = props;
    useEffect(() => {
        getOrdersHistory();
    }, []);

    return(
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: record => <ul style={{ margin: 0 }}>{
                    record.orderItems.items.map(item => {
                        return (
                            <li key={item.id}>
                                {item.name} - {item.qnty}
                            </li>
                        )
                    })
                }</ul>,
            }}
            dataSource={data}
            loading={loadingStatus === LOADING_STATUSES.LOADING}
        />
    )
};

const mapStateToProps = ({ordersHistoryReducer}) => {
    const { loadingStatus, errorMessage, data } = ordersHistoryReducer
    return {
        loadingStatus,
        errorMessage,
        data
    }
};

const mapDispatchToProps = (dispatch) => ({
    getOrdersHistory: () => dispatch(ordersHistoryAction.request()),
});

export const OrdersHistoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrdersHistory);