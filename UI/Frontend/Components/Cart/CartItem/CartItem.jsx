import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import Styles from './styles';


const CartItem = ({item, updateQuantity, removeItem}) => {
    const style = Styles();
    const remove = () => removeItem(item.product.ProductID);
    const increase = () => updateQuantity(item.product.ProductID, item.q + 1);
    const decrease = () => updateQuantity(item.product.ProductID, item.q - 1);

    return (
        <Card className="cart-item">
            <CardMedia image={item.product.ProductImage} alt={item.product.ProductName} className={style.media} />
            <CardContent className={style.cardContent}>
                <Typography variant="h5">{item.product.ProductName}</Typography>
                <Typography variant="h5">${item.p}</Typography>
            </CardContent>
            <CardActions className={style.cardActions}>
                <div className={style.buttons}>
                    <Button type="button" size="small" onClick={decrease}>-</Button>
                    <Typography>&nbsp;{item.q}&nbsp;</Typography>
                    <Button type="button" size="small" onClick={increase}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={remove}>Remove</Button>
            </CardActions>
        </Card>
    );
};

export default CartItem
