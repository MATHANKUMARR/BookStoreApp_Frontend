import axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthContext from '../Authentication/AuthContext';
import EditProduct from '../EditProduct/EditProduct';
import Spinner from '../UI/Spinner/Spinner';
import Product from './Product/Product';
import "../../App.css"
import fetchApi from "../API/api"

const Products = props => {
    const [state, setState] = useState({
        products : []
    });

    const [refresh, setRefresh] = useState(true);


    const authContent = useContext(AuthContext);

    useEffect(() => {
        axios.get(fetchApi()+"products")
        .then(res => {
            setState({products : res.data})
        })
    },[])

    const onAddToCart = product => () => {

        if(!authContent.state.auth.authenticated) {
            authContent.notify(`Please Log in`, 'warn');
            authContent.history.push("/login", {from : authContent.history.location.pathname});
            return;
        }
        console.log("add Cart ", product);

        let cartItem = {
            cartId : product.productId,
            productName : product.productName,
            price : product.price,
            quantity : 1,
            userId : authContent.state.auth.username
        }

        axios.post(fetchApi()+"user/addcart", cartItem)
        .then(res => {
            if(res.data == 'success') {
                console.log("Product add", product);
                authContent.notify(`Product ${product.productName} successfully added to cart`, 'success')
                // authContent.history.push("/cart")
            } else if('insufficient stock') {
                authContent.notify(`Product ${product.productName} out of stock`, 'warn');
                setRefresh(prevStste => !prevStste);
            }
            
        })
        window.location.reload();

    }

    const onDeleteProduct = product => {
        axios.delete(fetchApi()+"admin/deleteProduct/" + product.productId)
        .then(res => {
            console.log("Product ",);
            authContent.notify(`Product ${product.productName} successfully deleted`, 'success')
            setRefresh(prevState => {
                return !prevState
            });
        })
    }

   const onEditProduct = product => {
        authContent.history.push("/editProduct", {state : product});
    }

    const productsList = state.products.map( product => {
        return (
            <>
                <Product 
                        id={product.productId}
                        quantity={product.quantity}
                        productName={product.productName}
                        price={product.price}
                        url={product.imageUrl}
                        description={product.description}
                        key={product.productId}
                        edit={() => onEditProduct(product)}
                        delete={() => onDeleteProduct(product)}
                        addcart={() => onAddToCart(product)}

                />
                <Route exact path="/editproduct" component={() => <EditProduct />} />
            </>
        )
    });

    return (
            <>
            <div className="container-fluid d-flex flex-wrap pt-2"> 
                {state.products.length < 1 ? <h2 data-testid="noproducts" className="text-center mx-auto my-5">No Products to Display</h2> : productsList}
            </div> 
            </>
    )

}
 
export default Products;