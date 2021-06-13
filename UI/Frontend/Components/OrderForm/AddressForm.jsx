import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

const AddressForm = ({ test }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingStates, setShippingStates] = useState([]);
  const [shippingState, setShippingState] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [addr, setAddr] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');


  const fetchShippingCountries = async () => {
    const countries = ['US'];

    setShippingCountries(countries);
    setShippingCountry(countries[0]);
  };

  const fetchStates = async () => {
    const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

    setShippingStates(states);
    setShippingState(states[0]);
  };

  const fetchShippingOptions = async (country, stateProvince = null) => {
    const options = [{type: 'Standard', price: 0}, {type:'Express', price:10}];

    setShippingOptions(options);
    setShippingOption(options[0].type);
  };

  useEffect(() => {
    fetchShippingCountries();
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchStates();
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingState) fetchShippingOptions(shippingCountry, shippingState);
  }, [shippingState]);

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
        <form onSubmit={() => test({ fName, lName, addr, email, city, zip, shippingCountry, shippingState, shippingOption })}>
          <Grid container spacing={2} direction='row' >
                  <Grid item xs={12} sm={6}>
                    <input required placeholder='firstName' value={fName} onChange={(e) => setFName(e.target.value)} style={{width: '200px'}}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <input required placeholder='lastName' value={lName} onChange={(e) => setLName(e.target.value)} style={{width: '200px'}}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <input required placeholder='address 1' value={addr} onChange={(e) => setAddr(e.target.value)} style={{width: '200px'}}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <input required placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '200px'}}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <input required placeholder='city' value={city} onChange={(e) => setCity(e.target.value)} style={{width: '200px'}}/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <input required placeholder='zip code' value={zip} onChange={(e) => setZip(e.target.value)} style={{width: '200px'}}/>
                  </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {shippingCountries.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping State</InputLabel>
              <Select value={shippingState} fullWidth onChange={(e) => setShippingState(e.target.value)}>
                {shippingStates.map((code) => (
                  <MenuItem key={code} value={code}>
                    {code}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => (
                  <MenuItem key={sO.type} value={sO.type}>
                    {sO.type} - ${sO.price}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
    </>
  );
};

export default AddressForm;
