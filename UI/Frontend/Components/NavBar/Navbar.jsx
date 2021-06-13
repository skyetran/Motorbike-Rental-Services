import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart, AccountCircle, Money } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import logo from '../../Assets/logo.png';
import Styles from './styles';


const Navbar = ({ totalItems, onSearch}) => {
    const [itemCount, setItemCount] = useState(0);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const styles = Styles();
    const location = useLocation();
    const [searchFilters, setSearchFilters] = useState({
        type:'Category',
        input:' ',
        brand:'None',
        color:'None',
        priceMin:-1,
        priceMax:-1,
        sortOrder:'ProductName'
    });
    const [id, setID] = useState(0);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
        <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
        <MenuItem>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
            <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
            </Badge>
            </IconButton>
            <p>Cart</p>
        </MenuItem>
        </Menu>
    );

    const onTypeSelect = (event) => {
        setSearchFilters({
            type: event.target.innerText,
            input: searchFilters.input,
            brand: searchFilters.brand,
            color: searchFilters.color,
            priceMin: searchFilters.priceMin,
            priceMax: searchFilters.priceMax,
            sortOrder: searchFilters.sortOrder
        });
    };

    const onColorSelect = (event) => {
        setSearchFilters({
            type: searchFilters.type,
            input: searchFilters.input,
            brand: searchFilters.brand,
            color: event.target.innerText,
            priceMin: searchFilters.priceMin,
            priceMax: searchFilters.priceMax,
            sortOrder: searchFilters.sortOrder
        });
    };

    const onInputChange = (event) => {
        searchFilters.input = event.target.value;
    };

    const doSearch = () => onSearch(searchFilters);

    return (
        <>
            <AppBar position="fixed" className={styles.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={styles.title} color="inherit">
                        <img src={logo} alt="Motorike Rental" height="25px" className={styles.image} /> Motorbike Rental
                    </Typography>
                    { location.pathname === '/' && (
                        <div>
                            <div className={styles.type}>
                            <div className={styles.type}>
                                <DropdownButton id="dropdown-color-button" title={searchFilters.color}>
                                    <Dropdown.Item value='None' onClick={onColorSelect}>None</Dropdown.Item>
                                    <div></div>
                                    <Dropdown.Item value='RED' onClick={onColorSelect}>RED</Dropdown.Item>
                                    <div></div>
                                    <Dropdown.Item value='Black' onClick={onColorSelect}>Black</Dropdown.Item>
                                    <div></div>
                                    <Dropdown.Item value='Sliver' onClick={onColorSelect}>Sliver</Dropdown.Item>
                                    <div></div>
                                    <Dropdown.Item value='WHITE' onClick={onColorSelect}>WHITE</Dropdown.Item>
                                </DropdownButton>
                            </div>
                                <DropdownButton id="dropdown-basic-button" title={searchFilters.type}>
                                    <Dropdown.Item value='None' onClick={onTypeSelect}>None</Dropdown.Item>
                                    <div></div>
                                    <Dropdown.Item value='Motorbike' onClick={onTypeSelect}>MOTORBIKE</Dropdown.Item>
                                    <div></div>
                                    <Dropdown.Item value='Gloves' onClick={onTypeSelect}>GLOVES</Dropdown.Item>
                                    <div></div>
                                    <Dropdown.Item value='Helmet' onClick={onTypeSelect}>HELMET</Dropdown.Item>
                                </DropdownButton>
                                <input type="text" className="input" placeholder="Search..." onChange={onInputChange}/>
                                <button onClick={doSearch}>Search</button>
                            </div>
                        </div>
                        )
                    }
                    <div className={styles.grow} />
                    {location.pathname === '/' && (
                        <div className={styles.button}>
                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                            <IconButton component={Link} to="/login" aria-label="Sign in" color="inherit">
                                    <AccountCircle />
                            </IconButton>
                            <IconButton component={Link} to="/sales" aria-label="Sales Figrues" color="inherit">
                                    <Money />
                            </IconButton>
                        </div>  
                    )}
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </>
    )
}

export default Navbar
