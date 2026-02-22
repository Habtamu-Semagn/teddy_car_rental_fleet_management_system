import React from 'react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8">Terms of Service</h1>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6 text-gray-600 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                        <p>By accessing and using Teddy Car Rental services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">2. Rental Requirements</h2>
                        <p>To rent a vehicle, you must be at least 21 years of age, possess a valid driver's license, and provide a valid government-issued ID. All documents must be uploaded during the booking process.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">3. Booking and Payment</h2>
                        <p>All bookings are subject to vehicle availability. Payment must be made in full at the time of booking through our accepted payment methods (Telebirr or CBE). Booking confirmation is subject to document verification by our team.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">4. Vehicle Use</h2>
                        <p>Rented vehicles must be used responsibly and in accordance with Ethiopian traffic laws. The renter is responsible for any traffic violations, fines, or damages incurred during the rental period.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">5. Insurance</h2>
                        <p>All rentals include basic insurance coverage. The refundable insurance deposit will be returned upon safe return of the vehicle in its original condition.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cancellation Policy</h2>
                        <p>Cancellations made 24 hours before the rental start date are eligible for a full refund. Late cancellations may be subject to a cancellation fee.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
                        <p>Teddy Car Rental shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or vehicles.</p>
                    </section>

                    <p className="text-sm text-gray-400 pt-4 border-t border-gray-100">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
