import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import WithContext from '../hoc/WithContext';

class Logout extends Component {

    state = {
        rerender : false
    }

    componentDidMount() {
        this.props.logout();
        this.setState(prevState => {
            return {rerender : this.state.rerender ? false : true}
        })
    }

    render = () =>{
        
        return <Redirect to="/"/>;
    } 
}
 
export default (Logout);