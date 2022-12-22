import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../Authentication/AuthContext';
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import fetchApi from "../API/api"

const Login = (props) => {
    
    const authContent = useContext(AuthContext);
    console.log(authContent)
    

    const [state, setState] = useState({
        email : '',
        password : '',
        error : 'success'
    });

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    if(authContent.state.auth.authenticated) {
        if(authContent.history.location.state !== undefined)
            return <Redirect to={authContent.history.location.state.from.pathname} />
        return <Redirect to="/"/>
    }

    const checkValidity = (cb) => {
        if(authContent.state.auth.username !== state.email || authContent.state.auth.password !== state.password) {
            setEmailError('Incorrect Credentials');
            setState(prevState => {
                return {
                    ...prevState,
                    error : true
                }
            })
        } else if(authContent.state.auth.username === state.email || authContent.state.auth.password === state.password) {
            console.log('Successful');
            authContent.notify('Login Successful', 'success');
            setEmailError('Login Successful');
            setState(prevState => {
                return {
                    ...prevState,
                    error : "success"
                }
            });
        }
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();
        const tempState = {...state};
        // console.log("State", state);
        // console.log("AuthContext", authContent);
        axios.post(fetchApi()+'login', tempState)
        .then(res => {
            if(res.data) {
                authContent.authenticate(res.data.email, res.data.role);
                authContent.notify('Login Successful', 'success');
                authContent.history.push("/")
            }  else {
                authContent.notify('Bad Credenetials', 'error');
            }
        })
        .catch(err => {
            authContent.notify('Something went wrong', 'error');
        });
    }

    const setError = (val) => {
        setState(prevState => {
            return {
                ...prevState,
                error : val
            }
        })
    }

    const onChangeHandler = (e) => {
        const name = e.target.getAttribute('id');
        const value = e.target.value.toString();

        let tempState = {...state};
        tempState[name] = value;
        tempState['error'] = true;

        setState(tempState);

        if(name === 'password') {
            if(value.length < 4) {
                setPasswordError('weak')
            } else if(value.length >= 4 && value.length < 8) {
                setPasswordError('moderate');
            } else if(value.length >= 8) {
                setPasswordError('Strong');
            }
        }
        
    }


    return ( 
        <div className="container w-50">
            <h1 className="text-center my-5 fs-2" >Login</h1>
            <div className="container border border-3 shadow p-4 rounded"  style={{width : "35rem", height : "auto", borderRadius : '10px', backgroundColor : "#cc9f9f", opacity : "0.9"}}>
                <form className="w-75 mx-auto" onSubmit={onSubmitHandler}>
                    <div className="form-group my-4">
                        <label htmlFor="email" className="mb-2">Email address</label>
                        <input type="email" data-testid="email" className="form-control mb-2" id="email" aria-describedby="emailHelp" onChange={onChangeHandler} placeholder="Enter email" value={state.email}/>
                        <small id="emailhelp" className={`form-text text-${state.error !== '' ? state.error === 'success' ? 'success' : 'danger' : 'muted'}`}>{emailError}</small>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="mb-2">Password</label>
                        <input type="password" data-testid="password" className="form-control  mb-2" id="password" placeholder="Password" onChange={onChangeHandler} value={state.password}/>
                        <small id="passwordhelp" className={`form-text text-danger`}>{passwordError}</small>
                    </div>
                    
                    <button type="submit" data-testid="login" className="btn btn-primary">Login</button>
                    <Link data-testid="signup" className="btn btn-primary m-2" to="/signup" >Signup</Link>
                </form>
            </div>
           
        </div>
        
     );
}
 
export default Login;