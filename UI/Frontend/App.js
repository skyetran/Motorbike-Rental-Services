import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar, Products, Cart, Login, Checkout, Sales } from './Components';

import axios from 'axios';

const App = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({
        items:[],
        cid:0,
        total_items:0,
        subtotal:0.00
    });
    const [order, setOrder] = useState({});
    const [searchFilters, setSearchFilters] = useState({
        type:'Category',
        input:' ',
        brand:'None',
        color:'None',
        priceMin:-1,
        priceMax:-1,
        sortOrder:'ProductName'
    });
    const [user, setUser] = useState({
        username: '',
        password: '',
        customerID: 1
    });
    const [error, setError] = useState('');
    const [orderError, setOrderError] = useState('');
    const [totalRev, setTotalRev] = useState(0);
    const [weeklyRev, setWeeklyRev] = useState(0);


    const fetchProducts = async () => {  
        if (searchFilters.input) {
            axios.post('https://3v2b4mx0z0.execute-api.us-west-2.amazonaws.com/dev/search', {searchFilters}).then((response) => {
                if (response.data.length > 0) {
                    const prodList = response.data;
                    setProducts(prodList);
                } else{
                    const prodList = [];
                    setProducts(prodList);
                }
            });
        }
    };

    const handleAddToCart = (productId, quantity) => {
        const index = products.findIndex(x => x.ProductID === productId);
        const item = {
            product: products[index],
            q: quantity,
            p: products[index].ProductPrice
        }

        cart.items.push(item);
        cart.total_items += quantity;
        cart.subtotal += item.product.ProductPrice;
        setCart({items: cart.items, cid: 0, total_items: cart.total_items, subtotal: cart.subtotal});
    };

    const handleUpdateCart = (itemId, quantity) => {
        if (quantity > 0) {
            const index = cart.items.findIndex(x => x.product.ProductID === itemId);
            if (cart.items[index].product.ProductQuantity >= quantity) {
                cart.items[index].q = quantity;
                const price = cart.items[index].product.ProductPrice;
                cart.subtotal -= cart.items[index].p;
                cart.items[index].p = price * quantity;
                cart.subtotal += price * quantity;
                setCart({items: cart.items, cid: 0, total_items: cart.total_items, subtotal: cart.subtotal});
            }
        }
    };

    const handleRemoveFromCart = (itemId) => {
        console.log(cart.items);
        const index = cart.items.findIndex(x => x.product.ProductID === itemId);
        const price = cart.items[index].p;
        cart.items.splice(index, 1);
        cart.subtotal -= price;
        setCart({items: cart.items, cid: 0, total_items: cart.total_items, subtotal: cart.subtotal});
    };

    const handleEmptyCart = async () => {
        setCart({items: [], cid: cart.cid, total_items: 0, subtotal: 0});
        // remove all records from adds with cid
    };

    const sendCart = async() => {
        axios.get("https://3v2b4mx0z0.execute-api.us-west-2.amazonaws.com/dev/getCart-dev").then((response) => {
            cart.cid = response.data[0].cid + 1;
            setCart({items: cart.items, cid: response.data[0].cid + 1, total_items: cart.total_items, subtotal: cart.subtotal});
            console.log(cart.cid);
        });
        
        const data = {cart: cart, user: user};
        axios.post("https://3v2b4mx0z0.execute-api.us-west-2.amazonaws.com/dev/addCart-dev", 
        {data: data}).then((response) => {
            if (response.data.length === 0) {
                console.log(error);
            } else {
                console.log(response);
            }
        });

        console.log(user.customerID);
        cart.items.forEach((item) => {
            const data = {cart: cart, item: item, user: user};
            axios.post("https://3v2b4mx0z0.execute-api.us-west-2.amazonaws.com/dev/adds-dev",
            {data: data}).then((response) => {
                if (response.data.length === 0) {
                    console.log(error);
                } else {
                    console.log(response);
                }
            });
        });
    };

    const handleCaptureCheckout = async (order) => {
        axios.get("https://3v2b4mx0z0.execute-api.us-west-2.amazonaws.com/dev/getOrderID-dev").then((response) => {
            order['oid'] = response.data[0].oid + 1;
        });

        axios.get("https://3v2b4mx0z0.execute-api.us-west-2.amazonaws.com/dev/getAddressrID-dev").then((response) => {
            order.shipping['aid'] = response.data[0].aid + 1;
        });

        order['cart'] = cart;
        order.customer['customerID'] = user.customerID;
        console.log(order);
        setOrder(order);
        axios.post("https://3v2b4mx0z0.execute-api.us-west-2.amazonaws.com/dev/checkout-dev", {
            order: order
        }).then((response) => {
            if (response.data.length === 0) {
                console.log(error);
            } else {
                console.log(response.data);
            }
        });
        handleEmptyCart();
    };

    const handleSearchFilters = (searchFilter) => {
        setSearchFilters(searchFilter);
    };

    const handleLogin = async (userName, pass) => {
        setUser({username: '', password: '', customerID: 0});
        setError('');
        axios.post("https://3v2b4mx0z0.execute-api.us-west-2.amazonaws.com/dev/login", {
            user: userName,
            pass: pass
        }).then((response) => {
            if (response.data.length === 0) {
                setError('Wrong username or password');
                console.log(error);
            } else {
                const account = response.data;
                console.log(account);
                setUser({username: account.Username, password: account.Password, customerID: account.CustomerID});
            }
        });
    };

    const fetchSales = async () => {
        axios.get("https://3v2b4mx0z0.execute-api.us-west-2.amazonaws.com/dev/sales-dev").then((response) => {
            console.log(response);
            setTotalRev(response.data.total[0].Total_Revenue);
            setWeeklyRev(response.data.week[0].Weekly_Sales);
            if (totalRev === null || totalRev === undefined) {
                setTotalRev(0);
            }
            if (weeklyRev === null || weeklyRev === undefined) {
                setWeeklyRev(0);
            }
        });
    };

    useEffect(() => {
        fetchProducts();
    }, [searchFilters]);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <CssBaseline />
                <Navbar totalItems={cart.total_items} onSearch={handleSearchFilters} userID={user.customerID} handleDrawerToggle={handleDrawerToggle} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} addItem={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart cart={cart} updateQuantity={handleUpdateCart} removeItem={handleRemoveFromCart} emptyCart={handleEmptyCart} sendCart={sendCart} />
                    </Route>
                    <Route exact path="/login">
                        <div>
                            <Login onLogin={handleLogin} error={error} userID={user.customerID}/> 
                        </div>
                    </Route>
                    <Route path="/checkout" exact>
                        <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={orderError} />
                    </Route>
                    <Route path="/sales" exact>
                        <Sales totalRev={totalRev} weeklyRev={weeklyRev} fetchSales={fetchSales}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
