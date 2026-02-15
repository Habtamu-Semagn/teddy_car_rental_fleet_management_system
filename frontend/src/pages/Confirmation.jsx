import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, Home, FileText } from 'lucide-react';
import Button from '../components/Button';

const Confirmation = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>

                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-500 mb-8">
                    Thank you for choosing Teddy Rental. Your payment was successful and your car is reserved.
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Booking Reference</span>
                        <span className="font-mono font-bold">#TR-83920</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Pickup Location</span>
                        <span>Bole Airport</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Pickup Date</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-4">
                        <Button variant="secondary" className="flex-1">
                            <Download size={18} className="mr-2" />
                            Confirmation
                        </Button>
                        <Button variant="secondary" className="flex-1">
                            <FileText size={18} className="mr-2" />
                            Agreement
                        </Button>
                    </div>

                    <Link to="/" className="block">
                        <Button className="w-full">
                            <Home size={18} className="mr-2" />
                            Return Home
                        </Button>
                    </Link>

                    <Link to="/logout" className="block text-sm text-gray-500 hover:text-black mt-4">
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
