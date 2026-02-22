import React from 'react';
import { Users, Award, MapPin, Shield } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gray-900 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">About Teddy Car Rental</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Ethiopia's trusted fleet management and car rental service, providing reliable vehicles
                        and exceptional customer experiences since our founding.
                    </p>
                </div>
            </div>

            {/* Values */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                            <Users className="text-primary" size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Customer First</h3>
                        <p className="text-sm text-gray-500">We prioritize our customers' needs with 24/7 support and flexible rental options.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                            <Award className="text-primary" size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Quality Fleet</h3>
                        <p className="text-sm text-gray-500">Our vehicles are regularly maintained and inspected to ensure safety and comfort.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                            <MapPin className="text-primary" size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Local Expertise</h3>
                        <p className="text-sm text-gray-500">Based in Addis Ababa with deep knowledge of Ethiopian roads and travel needs.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                            <Shield className="text-primary" size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Fully Insured</h3>
                        <p className="text-sm text-gray-500">All rentals include comprehensive insurance coverage for your peace of mind.</p>
                    </div>
                </div>

                {/* Mission */}
                <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed">
                        At Teddy Car Rental, our mission is to provide accessible, reliable, and affordable car rental
                        services across Ethiopia. We believe in empowering mobility — whether you're a tourist exploring
                        the country, a business professional needing reliable transport, or a family planning a road trip.
                        Our fleet management system ensures every vehicle is maintained to the highest standards, and our
                        dedicated team is always ready to assist you.
                    </p>
                </div>

                {/* Contact Info */}
                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit Us</h2>
                    <p className="text-gray-500">Addis Ababa, Ethiopia</p>
                    <p className="text-gray-500">Phone: +251 900 000 000</p>
                    <p className="text-gray-500">Email: info@teddyrental.com</p>
                </div>
            </div>
        </div>
    );
};

export default About;
