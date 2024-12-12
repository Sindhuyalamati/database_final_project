import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null); // Store the logged-in user temporarily for resending email verification
    const auth = getAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                setUser(user); // Save user for verification
                alert('Please verify your email before logging in.');
                return;
            }

            alert('Logged in successfully!');
            navigate('/'); // Redirect to home page
        } catch (error) {
            setError(error.message);
        }
    };

    const handleResendVerification = async () => {
        if (user) {
            try {
                await sendEmailVerification(user);
                alert('Verification email resent! Please check your inbox.');
            } catch (error) {
                alert('Error resending verification email.');
            }
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

            {/* Resend Verification Email */}
            {user && (
                <div className="mt-3">
                    <button
                        className="btn btn-secondary"
                        onClick={handleResendVerification}
                    >
                        Resend Verification Email
                    </button>
                </div>
            )}
        </div>
    );
};

export default Login;
