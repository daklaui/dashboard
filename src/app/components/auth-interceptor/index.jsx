import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';

const AuthInterceptor = () => {
    const { getAccessTokenSilently, user, } = useAuth0();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const token = await getAccessTokenSilently({
                cacheMode: 'off',
                authorizationParams: {
                    audience: 'https://portal.lobium.ai'
                },
            });
            localStorage.setItem('access_token', token);
        })();
    }, [dispatch, getAccessTokenSilently, user?.sub]);

    return null;
};

export default AuthInterceptor;
