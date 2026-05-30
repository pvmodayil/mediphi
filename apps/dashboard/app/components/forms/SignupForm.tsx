import React, { useState } from "react";

type User = {
    name: string;
    email: string;
    password: string;
};

interface SignupFormProps {
    onSignup: (user: User) => void;
}

function SignupForm({ onSignup }: SignupFormProps) {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const user = { name, email, password };
            await new Promise((resolve) => setTimeout(resolve, 2000));
            onSignup(user);
        } catch {
            setError("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full border border-sage/40 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sage-light">
                            <path d="M12 2L12 22M2 12L22 12M7 7L17 17M17 7L7 17" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="font-display text-xl tracking-tight text-cream">MediPhi</span>
                </div>
                <h1 className="font-display text-3xl text-cream mb-2 tracking-tight">
                    Create your vault
                </h1>
                <p className="text-stone text-sm font-body">
                    One identity for every hospital, everywhere
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-error/10 border border-error/20 rounded-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-error-light flex-shrink-0">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <p className="text-error-light text-sm font-body">{error}</p>
                    </div>
                )}

                <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-stone/70 font-body mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3.5 bg-ink border border-ink-lighter rounded-sm text-cream text-sm font-body placeholder:text-stone/40 focus:border-sage/50 focus:ring-1 focus:ring-sage/20 transition-all duration-300"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-stone/70 font-body mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3.5 bg-ink border border-ink-lighter rounded-sm text-cream text-sm font-body placeholder:text-stone/40 focus:border-sage/50 focus:ring-1 focus:ring-sage/20 transition-all duration-300"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-xs uppercase tracking-wider text-stone/70 font-body mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Create a strong password"
                            className="w-full px-4 py-3.5 pr-16 bg-ink border border-ink-lighter rounded-sm text-cream text-sm font-body placeholder:text-stone/40 focus:border-sage/50 focus:ring-1 focus:ring-sage/20 transition-all duration-300"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone/50 hover:text-sage-light font-body uppercase tracking-wider transition-colors"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`group relative w-full py-4 px-6 bg-sage hover:bg-sage-light text-cream font-body font-medium text-sm tracking-wide rounded-sm transition-all duration-300 overflow-hidden ${
                        loading ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Creating account...
                            </>
                        ) : (
                            <>
                                Create Account
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </>
                        )}
                    </span>
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-ink-lighter/50 text-center">
                <p className="text-stone/60 text-sm font-body">
                    Already have an account?{" "}
                    <a href="/login" className="text-sage-light hover:text-cream transition-colors duration-300">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}

export default SignupForm;
