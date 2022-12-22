import React from 'react';
import AuthContext from '../Authentication/AuthContext';

const WithContext = Component => {
    return props => {
        return (
            <AuthContext.Consumer>
                {
                    (value) => <Component {...value} />
                }
            </AuthContext.Consumer>
        )
    }
}

export default WithContext;