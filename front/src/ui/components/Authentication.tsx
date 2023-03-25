import React, { PropsWithChildren, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/ReduxTypes';
import { LoginPage } from '../pages/LoginPage';
import { AuthenticationSlice } from '../../redux/AuthenticationSlice';

/**
 * Component props
 */

/**
 * Authentication
 * React Functional Component
 *
 */
export const Authentication: React.FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.authentication);
    useEffect(() => {
        dispatch(AuthenticationSlice.actions.reauthenticate());
    }, [dispatch]);

    switch (authState.status) {
        case 'NotAuthenticated':
            return <LoginPage />;
        case 'Authenticated':
            return <>{children}</>;
    }
};
