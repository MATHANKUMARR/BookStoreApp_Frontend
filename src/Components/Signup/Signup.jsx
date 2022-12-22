import axios from 'axios';
import React, { isValidElement, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../Authentication/AuthContext';
import _ from "lodash";
import "../../App.css"
import fetchApi from "../API/api"

const Signup = () => {

    const authContent = useContext(AuthContext);

    const [state, setState] = useState({
        email : '',
        username : '',
        mobileNumber : '',
        role : '',
        password : '',
        confirmpassword : '',
        error : 'success'
    });


    const [passwordError, setPasswordError] = useState('');
    const [numberError, setNumberError] = useState('');

    const checkValiditiy = () => {
        let isValid = true;

        if(isNaN(state.mobileNumber) || state.mobileNumber.length !== 10 ) {
            setNumberError('Enter a valid Phone number with exactly 10 numbers');
            setError(true);
            isValid = false;
        }

        if(state.confirmpassword !== state.password) {
            setPasswordError('Passwords do not match');
            setError(true);
            isValid = false;
        }

        return isValid;
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(!checkValiditiy()) {
            return;
        }

        const tempState = _.cloneDeep(state);

        axios.post(fetchApi()+'signup', tempState)
        .then(res => {
            if(res.data) {
                console.log(res.data);
                authContent.notify('User Successfully signed up', 'success');
                authContent.authenticate(res.data.email, res.data.role);
                authContent.history.push("/")
            }   else {
                authContent.notify('Something went wrong', 'error');
            } 
        }) 
              
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

        setState(tempState)

        if(name === 'password') {
            if(value.length < 4) {
                setPasswordError('weak')
            } else if(value.length >= 4 && value.length < 8) {
                setPasswordError('moderate');
            } else if(value.length >= 8) {
                setPasswordError('Strong');
            }
        }
        setTimeout(() => {
            setError(false);
            setPasswordError('');
        }, 2000);
        
    }

    if(authContent.state.auth.authenticated) {
        if(authContent.history.location.state !== undefined)
            return <Redirect to={authContent.history.location.state.from.pathname} />
        return <Redirect to="/"/>
    }


    return ( 
        <div className="container w-50 mb-4 bg-layout">
            <h1 className="text-center my-4 fs-2" >Sign Up</h1>
            <div className="container border border-3 shadow p-4 rounded"  style={{width : "35rem", height : "auto", borderRadius : '10px', backgroundColor : "#cc9f9f", opacity : "0.9"}}>
                <form className="p-3 mx-auto" onSubmit={onSubmitHandler}>

                    <div className="form-group mb-2 mt-4">
                        <label htmlFor="email" className="mb-2">Email address</label>
                        <input data-testid="email" type="email" className="form-control mb-1" id="email" required aria-describedby="emailHelp" onChange={onChangeHandler} placeholder="Enter email" value={state.email}/>
                    </div>

                    <div className="form-group my-4">
                        <label htmlFor="username" className="mb-2">Username</label>
                        <input data-testid="username" type="text" className="form-control mb-2" id="username" required aria-describedby="emailHelp" onChange={onChangeHandler} placeholder="Enter Username" value={state.username}/>
                    </div>

                    <div className="form-group my-4">
                        <label htmlFor="mobileNumber" className="mb-2">Mobile Number</label>
                        <input data-testid="mobileNumber" type="number" className="form-control mb-2" id="mobileNumber" aria-describedby="emailHelp" required onChange={onChangeHandler} placeholder="Enter Mobile Number" value={state.mobileNumber}/>
                        <small id="mobileNumberHelp" className={`form-text text-${!state.error ? 'success' : 'danger'}`}>{numberError}</small>
                    </div>

                    <div className="form-group my-4">
                        <label htmlFor="role" className="mb-2">Role</label>
                        <select data-testid="role" className="form-select" value={state.role} onChange={onChangeHandler} id="role" required aria-label="Role Select">
                            <option selected>Select a role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="USER">User</option>
                        </select>
                    </div>
                    
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="mb-2">Password</label>
                        <input data-testid="password" type="password" className="form-control  mb-2" id="password" placeholder="Enter Password" onChange={onChangeHandler} value={state.password}/>
                        <small id="passwordhelp" className={`form-text text-danger`}>{passwordError}</small>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="confirmpassword" className="mb-2">Confirm Password</label>
                        <input data-testid="confirmpassword" type="password" className="form-control  mb-2" id="confirmpassword" placeholder="Confirm Password" onChange={onChangeHandler} value={state.confirmpassword}/>
                    </div>
                    <small id="emailhelp" className={`form-text text-${state.error !== '' ? state.error === 'success' ? 'success' : 'danger' : 'muted'}`}>{}</small>
                    <button data-testid="signup" type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
           
        </div>
        
     );
}
 
export default Signup;