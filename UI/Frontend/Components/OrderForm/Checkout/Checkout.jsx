import React, { useState } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import Styles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    city: '',
    shippingstate: '',
    zip: '',
    shippingCountry: '',
    shippingOption: ''
  });
  const styles = Styles();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const prevStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const test = (data) => {
    setShippingData({
      firstName: data.fName,
      lastName: data.lName,
      email: data.email,
      address1: data.addr,
      city: data.city,
      shippingstate: data.shippingState,
      zip: data.zip,
      shippingCountry: data.shippingCountry,
      shippingOption: data.shippingOption
    });

    nextStep();
  };

  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={styles.divider} />
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={styles.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }

  const Form = () => (activeStep === 0
    ? <AddressForm nextStep={nextStep} setShippingData={setShippingData} test={test} />
    : <PaymentForm cart={cart} nextStep={nextStep} prevStep={prevStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />);

  return (
    <>
      <CssBaseline />
      <div className={styles.toolbar} />
      <main className={styles.layout}>
        <Paper className={styles.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={styles.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
