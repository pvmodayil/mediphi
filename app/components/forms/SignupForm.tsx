import React, { useState } from "react";

type User = {
    email: string;
    password: string;
};
interface SignupFormProps {
    onSignup: (user: User) => void;  // This function will be called when the user logs in successfully
}

function SignupForm({ onSignup }: SignupFormProps) {

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
                <p className="text-gray-600 text-sm">Sign up to get started</p>
            </div>
            {/* Signup Form */}
        
        </div>

    );
}

export default SignupForm;