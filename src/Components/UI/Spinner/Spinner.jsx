import React from 'react';

const loaderStyle = {
    width : "10rem",
    height : "10rem"
}


const Spinner = ({style}) => {
    return ( 
        <div className="container text-center my-5 py-5" >
            <div className="spinner-border text-primary" style={loaderStyle} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
     );
}
 
export default Spinner;