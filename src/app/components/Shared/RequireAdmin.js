import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
// import useAdmin from '../../Hooks/useAdmin';
import Loader from './Loader';
import useRole from '../../Hooks/useRole';

const RequireAdmin = ({ children }) => {
    let [user, loading, error] = useAuthState(auth)
    let [role, roleLoading] = useRole(user)
    // console.log(admin);
    if (loading || roleLoading) {
        return <Loader></Loader>
    }
    // console.log(user);

    if (role !== "admin") {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        toast.error('This Route for only Admin', { id: 'requireAdmin' })
        // signOut(auth)
        return <Navigate to="/" />;
    }
    return children;
};

export default RequireAdmin;