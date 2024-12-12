import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // `null` to show loading initially
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user); // Set true if user exists, false otherwise
        });

        // Cleanup the listener on unmount
        return () => unsubscribe();
    }, [auth]);

    // Show a loading state while checking authentication
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If authenticated, render the child components
    return children;
};

export default ProtectedRoute;
