import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-oasis-mist px-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl border border-oasis-slate/10 shadow-lg">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-oasis-teal to-oasis-deep-ocean text-white font-bold text-2xl">
                            O
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-oasis-midnight">Welcome back</h2>
                    <p className="mt-2 text-oasis-slate">Sign in to your client portal</p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-oasis-midnight">Email</label>
                        <input id="email" type="email" className="w-full px-3 py-2 border border-oasis-slate/20 rounded-md focus:outline-none focus:ring-2 focus:ring-oasis-teal/50" placeholder="name@company.com" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-sm font-medium text-oasis-midnight">Password</label>
                            <a href="#" className="text-sm text-oasis-teal hover:underline">Forgot password?</a>
                        </div>
                        <input id="password" type="password" className="w-full px-3 py-2 border border-oasis-slate/20 rounded-md focus:outline-none focus:ring-2 focus:ring-oasis-teal/50" />
                    </div>
                    <Button className="w-full bg-oasis-teal hover:bg-oasis-deep-ocean text-white py-2">
                        Sign in
                    </Button>
                </form>

                <div className="text-center text-sm text-oasis-slate">
                    Don't have an account? <Link to="/contact" className="text-oasis-teal hover:underline">Contact sales</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
