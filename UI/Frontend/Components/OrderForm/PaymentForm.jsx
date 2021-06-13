import React, { useState } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import NumericInput from './NumericInput';

import Review from './Review';


const PaymentForm = ({ cart, nextStep, prevStep, shippingData, onCaptureCheckout }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [exp, setExp] = useState('');
  const [csc, setCsc] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
      const orderData = {
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingstate, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry, aid: 1 },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: { cardNumber: cardNumber, exp: exp, csc: csc },
      };

      onCaptureCheckout(orderData);

      nextStep();
  };

  const filled = () => {
    return cardNumber > 0 && csc > 0 && exp.length === 5;
  }

  return (
    <>
      <Review cart={cart} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <NumericInput value={cardNumber} placeHolder='Credit Card Number' min={0} max={9999999999999999n} onChange={(cardNumber) => setCardNumber(cardNumber)}/>
              <input type='text' placeholder='MM/YY' value={exp} onChange={(e) => setExp(e.target.value)}/>
              <NumericInput value={csc} placeHolder='Security Code' min={0} max={9999} onChange={(csc) => setCsc(csc)}/>
            </div>
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={prevStep}>Back</Button>
              <Button type="submit" variant="contained" disabled={!filled} color="primary">
                Pay ${cart.subtotal}
              </Button>
            </div>
          </form>
    </>
  );
};

export default PaymentForm;
