import axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import AuthContext from '../../Authentication/AuthContext';
import "../../../App.css"

const Product = (props) => {

    const authContent = useContext(AuthContext);


    return ( 
        <div className=" mx-2 my-2 px-2 py-3 card w-25 shadow border-3 border-light bg-product-layout">
            <div className="card-body">
                <img src={props.url} class="card-img-top mb-4 rounded" style={{width:"20rem", height:"15rem"}} alt="..."/>
                <h2 className="card-title mb-2">{props.productName}</h2>
                <h5 className="card-title text-muted fs-5 pr-2 mb-3">{props.description}</h5>
                <h6 className="card-subtitle mb-2"> <b>Price : </b>₹ {props.price}</h6>
                <p className="card-text">
                    {props.quantity == 0 
                        ? <span><i className="fas fa-exclamation text-warning"></i> No items left in stock</span> 
                        : <span className="px-2"><i className="fas fa-check-square text-success"></i>  {props.quantity} items left in stock</span>
                    } 
                </p>
                <div className="">
                    <button className="btn btn-primary shadow m-1" onClick={props.addcart()}> Cart <i className="fa fa-cart-plus" aria-hidden="true"></i></button>
                    {/* <Link className="btn btn-primary shadow m-1" to={{ pathname : "/editproduct", state : {product : this.props}}}>Edit <i className="fas fa-edit" ></i></Link> */}
                    {authContent.state.auth.role === 'ADMIN'
                        &&  <>
                                <button className="btn btn-primary shadow m-1" onClick={props.edit}>Edit <i className="fas fa-edit" ></i></button>
                                <button className="btn btn-primary shadow m-1" onClick={props.delete}> Delete <i className="fas fa-trash"></i></button>
                            </>
                    }
                    
                </div>
                
            </div>
        </div>
     );
}
 
export default Product;