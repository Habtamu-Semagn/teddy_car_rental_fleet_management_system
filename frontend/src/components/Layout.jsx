import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-primary">
                        Teddy<span className="text-black">Rental</span>
                    </Link>

                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-primary font-medium transition-colors">Home</Link>
                        <Link to="/about" className="text-gray-600 hover:text-primary font-medium transition-colors">About</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-primary font-medium transition-colors">Contact</Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="text-gray-600 hover:text-primary font-medium">Sign In</Link>
                        <Link to="/register" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow bg-gray-50">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-primary">TeddyRental</h3>
                        <p className="text-gray-400">Premium fleet management and car rental services in Ethiopia.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-white">Home</Link></li>
                            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <div className="text-gray-400">
                            <p>Addis Ababa, Ethiopia</p>
                            <p>+251 900 000 000</p>
                            <p>info@teddyrental.com</p>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
                    © {new Date().getFullYear()} Teddy Car Rental. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
