import React from 'react';
import Grid from '@material-ui/core/Grid';
import Product from './ProductCard/Product';
import Styles from './styles';

const Products = ({products, addItem}) => {
    const styles = Styles();
    return (
        <main className={styles.content}>
            <div className={styles.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid key={product.ProductID} item xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} addItem={addItem} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
};

export default Products;
