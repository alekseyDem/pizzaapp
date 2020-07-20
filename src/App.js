import React from 'react';
import 'antd/dist/antd.css';
import {Badge, Result, Button} from 'antd';

import { Layout, Menu } from 'antd';
import ShoppingCartOutlined from "@ant-design/icons/lib/icons/ShoppingCartOutlined";
import {
    Switch,
    Route,
    Link,
    HashRouter
} from "react-router-dom";
import {connect} from "react-redux";
import {CartContainer} from "./pages/cart";
import {OrdersHistoryContainer} from "./pages/ordersHistory";
import {MenuContainer} from "./pages/menu";
const {Header} = Layout;

function App({isAuth = true, addItemToCart, removeItemFromCart, shoppingCartItems}) {
  return (
      <HashRouter basename="/">
        <Layout>
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="/">Menu</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/ordershistory">Orders history</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/cart">
                        <Badge count={shoppingCartItems.totalQnty}>
                            <ShoppingCartOutlined />
                        </Badge>
                    </Link></Menu.Item>
                </Menu>
              </Header>
              <Layout>
                <Switch>
                    <Route exact path="/">
                        <MenuContainer />
                    </Route>
                    <Route path="/cart">
                        <CartContainer />
                    </Route>
                    <Route path="/ordershistory">
                        <OrdersHistoryContainer />
                    </Route>
                    <Route path="*">
                        <Result
                            status="404"
                            title="404"
                            subTitle="Sorry, the page you visited does not exist."
                            extra={<Link to={'/'}>
                                <Button type="primary">Back Home</Button>
                            </Link>}
                        />
                    </Route>
                </Switch>
            </Layout>
        </Layout>
      </HashRouter>
  );
}

const mapStateToProps = (state) => {
    return {
        shoppingCartItems: state.shoppingCartReducer
    }
};

export const AppContainer = connect(mapStateToProps)(App);
