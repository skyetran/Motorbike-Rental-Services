import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import Styles from './styles';

const Product = ({product, addItem}) => {
    const styles = Styles();
    return (
        <Card className={styles.root}>
            <CardMedia className={styles.media} image={`${product.ProductImage}`} title={product.ProductName} />
            <CardContent>
                <div className={styles.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.ProductName}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.ProductColor}
                    </Typography>
                </div>
                <div className={styles.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                        {product.ProductQuantity} left in stock.
                    </Typography>
                </div>
            </CardContent>
            <CardActions disableSpacing className={styles.cardActions}>
                <div className={styles.price}>
                    <Typography gutterBottom variant="h5" component="h2">
                            ${product.ProductPrice}
                    </Typography>
                </div>
                <IconButton aria-label="Add to Cart" onClick={() => addItem(product.ProductID, 1)}>
                <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product
