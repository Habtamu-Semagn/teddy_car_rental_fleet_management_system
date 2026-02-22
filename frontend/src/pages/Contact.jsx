import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Contact Us</h1>
                    <p className="mt-3 text-lg text-gray-500">We'd love to hear from you. Reach out anytime.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MapPin className="text-primary" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Address</h3>
                                <p className="text-gray-500">Bole Road, Addis Ababa, Ethiopia</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Phone className="text-primary" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Phone</h3>
                                <p className="text-gray-500">+251 900 000 000</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Mail className="text-primary" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Email</h3>
                                <p className="text-gray-500">info@teddyrental.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Clock className="text-primary" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Business Hours</h3>
                                <p className="text-gray-500">Monday – Saturday: 8:00 AM – 6:00 PM</p>
                                <p className="text-gray-500">Sunday: Closed</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your message! We will get back to you soon.'); }}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea rows={4} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" />
                            </div>
                            <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-bold hover:opacity-90 transition-opacity">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
