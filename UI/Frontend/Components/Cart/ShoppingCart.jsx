import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import Styles from './styles';

const ShoppingCart = ({cart, updateQuantity, removeItem, emptyCart, sendCart}) => {
    const style = Styles();
    const uploadCart = () => {
        sendCart();
    }

    const renderEmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart,
          <Link className={style.link} to="/">start adding some</Link>!
        </Typography>
    );

    if (!cart.items) return 'Loading';
    console.log(cart.items);

    const renderCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} updateQuantity={updateQuantity} removeItem={removeItem} />
                    </Grid>
                ))}
            </Grid>
            <div className={style.cardDetails}>
                <Typography variant="h4">Subtotal: {cart.subtotal}</Typography>
                <div>
                <Button className={style.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={emptyCart}>Empty cart</Button>
                <Button className={style.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary" onClick={uploadCart}>Checkout</Button>
                </div>
            </div>
        </>
    );

    return (
        <Container>
            <div className={style.toolbar} />
            <Typography className={style.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            { !cart.items.length ? renderEmptyCart() : renderCart() }
        </Container>
    );
};

export default ShoppingCart;
