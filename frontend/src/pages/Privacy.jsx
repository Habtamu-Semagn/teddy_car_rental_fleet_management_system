import React from 'react';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-8">Privacy Policy</h1>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6 text-gray-600 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
                        <p>We collect personal information that you provide during registration and booking, including your name, email address, phone number, driver's license, and government-issued ID. We also collect payment information necessary to process your rental transactions.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
                        <p>Your information is used to process bookings, verify your identity, communicate about your rentals, and improve our services. We do not sell your personal information to third parties.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">3. Document Storage</h2>
                        <p>Uploaded documents (ID cards and driver's licenses) are stored securely on our servers and are only accessed by authorized employees for verification purposes. Documents are retained for the duration required by Ethiopian law.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All data transmissions are encrypted using industry-standard protocols.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">5. Your Rights</h2>
                        <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at info@teddyrental.com.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies</h2>
                        <p>We use local storage to maintain your session and preferences. No third-party tracking cookies are used on our platform.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">7. Changes to This Policy</h2>
                        <p>We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
                    </section>

                    <p className="text-sm text-gray-400 pt-4 border-t border-gray-100">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
