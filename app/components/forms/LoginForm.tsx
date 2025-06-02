import React, { useState } from "react";

type User = {
    email: string;
    password: string;
};
interface LoginFormProps {
    onLogin: (user: User) => void;  // This function will be called when the user logs in successfully
}

function LoginForm({onLogin}: LoginFormProps) {
    // State to hold the email and password
    const [email, setEmail] = useState<string>(""); 
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility
    
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
            const user = { email, password }; // Include both email and password
            console.log("User logged in 1:", user);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            onLogin(user); // Call the onLogin function with the user data

        } catch (err: any) {
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }   
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-amber-50 backdrop-blur-lg rounded-3xl shadow-2xl p-20 w-full max-w-md text-center border border-white/20 animate-fade-in-up">
            {/* Logo Section */}
            <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-500/30">
                Med
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 via-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                MediPhi
            </h1>
            <p className="text-gray-600 text-sm">
                Welcome back! Please sign in to your account
            </p>
            </div>
            {/* Login Form Section */}
            <form onSubmit={handleSubmit} className="form-group">
                {error && <p className="error">{error}</p>}
                <div className="text-left mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2"></label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(LoginEvent: React.ChangeEvent<HTMLInputElement>) => setEmail(LoginEvent.target.value)}
                        required
                        placeholder="Enter your email or phone number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                    />
                </div>
                <div className="text-left mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
                    <div className = "relative">
                        <input
                            type={showPassword? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(LoginEvent: React.ChangeEvent<HTMLInputElement>) => setPassword(LoginEvent.target.value)}
                            required
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-300"
                        >
                            {showPassword? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <button type="submit" 
                disabled={loading} 
                className={`w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/30 ${
              loading 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40 active:translate-y-0'
            }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <div className="mt-6 text-sm text-gray-600">
                <p>
                    Don't have an account?{" "}
                    <a href="../signup" className="text-cyan-500 hover:underline">
                        Register
                    </a>
                </p>        
            </div>        
        </div>
    );
}

export default LoginForm;