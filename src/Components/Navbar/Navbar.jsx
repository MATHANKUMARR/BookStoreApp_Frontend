import React, { Component, useContext, useEffect } from 'react';
import { Link, Route, Router, Switch, useHistory } from 'react-router-dom';
import AddProduct from '../AddProduct/AddProduct';
import AuthContext from '../Authentication/AuthContext';
import Cart from '../Cart/Cart';
import EditProduct from '../EditProduct/EditProduct';
import WithContext from '../hoc/WithContext';
import Login from "../Login/Login";
import Logout from '../Logout/Logout';
import Orders from '../Orders/Orders';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Product from '../Products/Product/Product';
import Products from "../Products/Products";
import Signup from '../Signup/Signup';

const Navbar = (props) => {

    const authContent = useContext(AuthContext);
    console.log(authContent);

    useEffect(() => {
        console.log("use effect nav");
    })

    return ( 
        <>
            <div>
                <nav data-testid="navigation" className="navbar navbar-expand-lg sticky-top navbar-light bg-primary bg-dark text-white p-1">
                    <div className="container-fluid">
                        <a className="navbar-brand fs-3 fw-bold text-white" href="#">Book <span className="text-warning">Store</span></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse d-flex" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item mx-1">
                                    <Link className="nav-link text-white active" data-testid="home"  aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item mx-1">
                                    {(authContent.state.auth.role === 'ADMIN' )&& <Link data-testid="addproduct" className="nav-link text-white active" to="/addproduct">Add Product</Link>}
                                </li>
                            

                            </ul>
                        </div>
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item mx-1 mt-1">
                                    <Link data-testid="logout" className="nav-link text-white active" onClick={authContent.state.auth.authenticated ? authContent.logout : () => null} to="/login">{authContent.state.auth.authenticated ? 'Logout' : 'Login' }</Link>
                                </li>
                                <li className="nav-item mx-1 mt-1">
                                    {(authContent.state.auth.role === 'USER' || authContent.state.auth.role === 'ADMIN')&& <Link data-testid="orders" className="nav-link text-white active" to="/orders">Orders</Link>}
                                </li>
                                <li className="nav-item">
                                    <Link data-testid="cart" className="nav-link active" aria-current="page" to="/cart">
                                        <div className="rounded bg-white py-1 px-2 ">
                                            <i className="fa fa-md text-dark fa-shopping-cart" aria-hidden="true"></i>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>



                <Switch>
                    <Route exact path="/" {...props} component={() => <Products {...props}/>}/>
                    <Route path="/login" render={() => <Login />} /> 
                    <Route path="/signup" render={() => <Signup />} />                
                    <PrivateRoute path="/editProduct" component={() => <EditProduct />} />
                    <PrivateRoute path="/cart" component={() => <Cart />} />
                    <PrivateRoute exact path="/addproduct" component={() => <AddProduct />} />
                    <PrivateRoute exact path="/orders" component={() => <Orders />} />
                </Switch>
            </div>
        </>
     );

}
 
export default (Navbar);
