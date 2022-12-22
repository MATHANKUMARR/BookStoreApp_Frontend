import React from 'react';

const Alert = ({alertMessage, success, click}) => {
    return ( 
        <div className="container w-50 p-4 text-center">
            <div className={`alert alert-${success ? 'success' : 'danger'} alert-dismissible fade show`} role="alert">
                <strong>{alertMessage}</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={click} aria-label="Close"></button>
            </div>
        </div>
     );
}
 
export default Alert;