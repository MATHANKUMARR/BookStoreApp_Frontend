import React, { Component, useContext, useState } from 'react';
import axios from "axios";
import Alert from '../UI/Alert/Alert';
import Spinner from '../UI/Spinner/Spinner';
import _ from "lodash";
import AuthContext from '../Authentication/AuthContext';
import fetchApi from "../API/api"

const AddProduct = props => {

    const dummyState = {
        productName : '',
        description : '',
        price : '',
        quantity : 1,
        imageUrl : ''
    }

    const [state, setState] = useState(dummyState);

    const authContent = useContext(AuthContext);

    const onChangeHandler = (e) => {
        const name = e.target.getAttribute('id');
        const value = e.target.value.toString();

        let tempState = {...state};
        tempState[name] = value;

        setState(tempState);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const tempState = _.cloneDeep(state);

        axios.post(fetchApi()+"admin/addProduct", tempState)
        .then(res => {
            if(res.data) {
                authContent.notify('Product added Successfully', 'success');
                setState(dummyState);
            } else {
                authContent.notify('Something went wrong', 'error');
            }
        })
    }


    return (
        <div className="container w-50 mb-4">
            <h1 className="text-center my-4 fs-2" >Add Product</h1>
            <div className="container border border-3 shadow p-4 rounded"  style={{width : "35rem", height : "auto", borderRadius : '10px', backgroundColor : "#cc9f9f", opacity : "0.9"}}>
                <form className="p-3 mx-auto" onSubmit={onSubmitHandler}>

                    <div className="form-group mb-2 mt-4">
                        <label htmlFor="productName" className="mb-2">Product Name</label>
                        <input type="text" className="form-control mb-1" data-testid="productName" id="productName" required aria-describedby="emailHelp" onChange={onChangeHandler} placeholder="Enter Product Name" value={state.productName}/>
                    </div>

                    <div className="form-floating mb-2 mt-4">
                        <textarea className="form-control mb-2" style={{height : "8rem"}} required value={state.description} onChange={onChangeHandler}  placeholder="Leave a comment here" data-testid="description" id="description"></textarea>
                        <label htmlFor="description">Product Description</label>
                    </div>

                    <div className="form-group my-4">
                        <label htmlFor="price" className="mb-2">Price</label>
                        <input type="number" step="0.01" value="0.00" className="form-control mb-2" data-testid="price" id="price" required aria-describedby="price" onChange={onChangeHandler} placeholder="Enter Price" value={state.price}/>
                    </div>

                    <div className="form-group my-4">
                        <label htmlFor="quantity" className="mb-2">Quantity</label>
                        <input type="number" value="1" className="form-control mb-2" data-testid="quantity" id="quantity" required aria-describedby="quantity" onChange={onChangeHandler} placeholder="Enter Quanitiy" value={state.quantity}/>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="imageUrl" className="mb-2">Image URL</label>
                        <input type="text" className="form-control  mb-2" data-testid="imageUrl" id="imageUrl" placeholder="Enter Image URL" onChange={onChangeHandler} value={state.imageUrl}/>
                    </div>
                    
                    <button type="submit" data-testid="addproduct" className="btn btn-primary">Add Product</button>
                </form>
            </div>
           
        </div>
    )
}

export default AddProduct;