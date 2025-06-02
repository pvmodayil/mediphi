'use client';

import React, { useState } from "react";

type User = {
    email: string;
    password: string;
};
interface LoginFormProps {
    onLogin: (user: User) => void;  
}

function onLogin(user: User) {
    // This function will handle the login logic, such as redirecting the user or updating the UI.
    console.log("User logged in:", user.email);
}

function LoginForm({onLogin}: LoginFormProps) {
    // State to hold the email and password
    const [email, setEmail] = useState<string>(""); 
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    // Function to handle form submission
    const handleSubmit = async (LoginEvent: React.FormEvent) => {
        LoginEvent.preventDefault(); // Will notallow to submit with the default action
        // Validate email and password
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }
        setLoading(true); // Indicate that the login process has started
        setError(null); // Clear any previous error messages

        // Simulate an API call
        try {
            // Insert login database API call here
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const user = { email, password }; // Include both email and password
            onLogin(user); // Call the onLogin function with the user data

        } catch (err: any) {
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(LoginEvent: React.ChangeEvent<HTMLInputElement>) => setEmail(LoginEvent.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(LoginEvent: React.ChangeEvent<HTMLInputElement>) => setPassword(LoginEvent.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}

export default LoginForm;