import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Review = ({cart}) => (
  <>
    <Typography variant="h6" gutterBottom>Order summary</Typography>
    <List disablePadding>
      {cart.items.map((item) => (
        <ListItem style={{ padding: '10px 0' }} key={item.name}>
          <ListItemText primary={item.product.ProductName} secondary={`Quantity: ${item.q}`} />
          <Typography variant="body2">${item.p}</Typography>
        </ListItem>
      ))}
      <ListItem style={{ padding: '10px 0' }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          ${cart.subtotal}
        </Typography>
      </ListItem>
    </List>
  </>
);

export default Review;
