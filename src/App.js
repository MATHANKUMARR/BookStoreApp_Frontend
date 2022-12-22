import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';
import AuthContext from './Components/Authentication/AuthContext';
import Navbar from './Components/Navbar/Navbar';

import _ from "lodash";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = (props) => {

  toast.configure();
  const history = useHistory();

  

  const [state, setState] = useState({
    auth : {
      username : '',
      authenticated : false,
      role : ''
    }
  })

  useEffect(() => {

    if(localStorage.getItem('authenticated') === null) {
      console.log("Inside first loop");
      localStorage.setItem('username', '');
      localStorage.setItem('role', '');
      localStorage.setItem('authenticated', false)
    } else {
      console.log("Inside sec loop");
      if(( localStorage.getItem('authenticated') === 'true' ) == true) {
        setState({
          auth : {
            username : localStorage.getItem('username'),
            authenticated : localStorage.getItem('authenticated') === 'true',
            role : localStorage.getItem('role')
          }
        })
      }
      console.log(`role : ${localStorage.getItem('role')}\n username : ${localStorage.getItem('username')} \n Auth : ${localStorage.getItem('authenticated')}`);
    }
  }, [])

  const authenticate = (email, role, status = true) => { 
    let tempState = _.cloneDeep(state);
    tempState.auth['username'] = email;
    tempState.auth['authenticated'] = status;
    tempState.auth['role'] = role;

    localStorage.setItem('username', email);
    localStorage.setItem('role', role);
    localStorage.setItem('authenticated', status)
    setState(tempState);
  }

  const logout = () => {

    localStorage.clear(['username', 'role', 'authenticated']);

    let tempState = _.cloneDeep(state);
    tempState.auth['username'] = '';
    tempState.auth['authenticated'] = false;
    tempState.auth['role'] = null;
    setState(tempState);
    notify('Logged out');
  }

  const notify = (message, status) => {
    if(status === 'success') {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose : 3000
      })
    } else if(status === 'warn') {
      toast.warn(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose : 3000
      })
    } else if(status === 'error') {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose : 3000
      })
    } else if(status === 'dark') {
      toast.dark(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose : 3000
      })
    } else {
      toast(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose : 3000
      })
    }
  }

  return ( 
    <>
      <AuthContext.Provider value={{state, setState, history, authenticate, logout, notify }}>
            <Navbar/>
      </AuthContext.Provider>
    </>
   );
}
 
export default App;