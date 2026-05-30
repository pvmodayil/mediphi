import React, { useState } from "react";

type User = {
    email: string;
    password: string;
};

interface LoginFormProps {
    onLogin: (user: User) => void;
}

function LoginForm({ onLogin }: LoginFormProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const user = { email, password };
            await new Promise((resolve) => setTimeout(resolve, 2000));
            onLogin(user);
        } catch {
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-accent-light flex items-center justify-center mb-6">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-text-primary mb-1.5 tracking-tight">Welcome back</h1>
                <p className="text-text-secondary text-sm">Sign in to access your medical vault</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium overflow-hidden">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span className="truncate">{error}</span>
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-warm-bg border border-border rounded-xl text-text-primary text-sm placeholder:text-text-secondary/50 focus:border-accent focus:ring-[3px] focus:ring-accent/15 transition-all duration-200"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-text-primary mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 pr-14 bg-warm-bg border border-border rounded-xl text-text-primary text-sm placeholder:text-text-secondary/50 focus:border-accent focus:ring-[3px] focus:ring-accent/15 transition-all duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-text-secondary hover:text-accent transition-colors"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full whitespace-nowrap py-3.5 px-4 bg-accent hover:bg-accent-hover text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm shadow-accent/20 hover:shadow-md hover:shadow-accent/25 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-4 w-4 flex-shrink-0" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Signing in...
                        </>
                    ) : (
                        'Sign in'
                    )}
                </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-text-secondary">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="font-semibold text-accent hover:text-accent-hover transition-colors">
                        Create one
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
