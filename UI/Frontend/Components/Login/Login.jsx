import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Style from './styles';

const Login = ({onLogin, error, userID}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const id = userID;
    const style = Style();

    const validateForm = () => {
        return username.length > 0 && password.length > 0;
    }

    const checkLogin = () => {
        onLogin(username, password);
    }
    
    console.log(id);
    if ( id <= 0 ) {
        return (
            <div className={style.input} title=''>
                <Typography className={style.title} variant="h4">Sign In To Start Shopping</Typography>
                    {error && <div className={style.login}> {error} </div>}
                    <div className={style.login}>
                        <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className={style.login}>
                        <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className={style.login}>
                        <button type='submit' disabled={!validateForm} onClick={checkLogin}>Login</button>
                    </div>
            </div>
        )
    } else {
        return (<Redirect to='/'/>)
    }
}

export default Login
