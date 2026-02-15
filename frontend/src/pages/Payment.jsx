import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { CreditCard, Wallet, Smartphone, ShieldCheck } from 'lucide-react';

const Payment = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Mock booking data
    const bookingSummary = {
        car: 'Toyota Corolla 2021',
        duration: '3 Days',
        rate: 1500,
        rentalFee: 4500,
        insurance: 1000,
        total: 5500
    };

    const handlePayment = () => {
        setLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            navigate('/confirmation');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Secure Payment</h1>
                    <p className="mt-2 text-gray-500">Complete your booking securely.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Summary - Proximity: Grouped details, Contrast: Clear hierarchy */}
                    <div className="lg:col-span-1">
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 sticky top-24">
                            <div className="px-6 py-5 bg-gray-900 text-white border-b border-gray-800">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <ShieldCheck size={20} className="text-primary" />
                                    Booking Summary
                                </h3>
                            </div>
                            <div className="p-6 space-y-5">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-medium">Vehicle</span>
                                    <span className="font-bold text-gray-900">{bookingSummary.car}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-medium">Duration</span>
                                    <span className="font-bold text-gray-900">{bookingSummary.duration}</span>
                                </div>

                                <div className="border-t border-dashed border-gray-200 pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Rental Fee</span>
                                        <span className="font-medium">{bookingSummary.rentalFee} ETB</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Insurance (Refundable)</span>
                                        <span className="font-medium">{bookingSummary.insurance} ETB</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-3xl font-extrabold text-primary">{bookingSummary.total} <span className="text-sm text-gray-500 font-medium">ETB</span></span>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-3 text-xs text-gray-500 text-center border-t border-gray-100">
                                100% Secure Transaction
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Choose Payment Method</h3>

                            <div className="space-y-4">
                                {/* Telebirr Option - Design: Active state card */}
                                <div className="border-2 border-primary bg-primary/5 rounded-xl p-5 flex items-center justify-between cursor-pointer transition-all shadow-sm ring-1 ring-primary/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2">
                                        <span className="bg-primary text-xs font-bold px-2 py-1 rounded text-white">RECOMMENDED</span>
                                    </div>
                                    <div className="flex items-center space-x-5">
                                        <div className="bg-white p-3 rounded-xl border border-primary/20 shadow-sm">
                                            <Smartphone className="text-primary" size={28} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">Telebirr</h4>
                                            <p className="text-sm text-gray-600">Mobile Money Transfer</p>
                                        </div>
                                    </div>
                                    <div className="h-6 w-6 rounded-full border-2 border-primary flex items-center justify-center bg-white">
                                        <div className="h-3 w-3 rounded-full bg-primary" />
                                    </div>
                                </div>

                                {/* Mock other options disabled */}
                                <div className="border border-gray-200 rounded-xl p-5 flex items-center justify-between opacity-50 cursor-not-allowed grayscale bg-gray-50">
                                    <div className="flex items-center space-x-5">
                                        <div className="bg-white p-3 rounded-xl border border-gray-200">
                                            <CreditCard className="text-gray-400" size={28} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">Credit / Debit Card</h4>
                                            <p className="text-sm text-gray-500">Currently unavailable</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-6 pt-6 border-t border-gray-100">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">Telebirr Mobile Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-gray-500 font-medium">+251</span>
                                        </div>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="block w-full pl-16 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-900"
                                            placeholder="911 234 567"
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">You will receive a prompt on your phone to authorize the payment.</p>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button variant="outline" onClick={() => navigate('/agreement')} className="w-auto px-6 py-3 rounded-xl">
                                        Back
                                    </Button>
                                    <Button onClick={handlePayment} isLoading={loading} className="w-auto px-8 py-3 rounded-xl text-lg shadow-lg hover:shadow-primary/40">
                                        Pay {bookingSummary.total} ETB
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="text-center text-sm text-gray-400 mt-8">
                            <p>By processing payment, you agree to our Terms of Service and Privacy Policy.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
