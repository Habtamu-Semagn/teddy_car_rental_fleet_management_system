import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';
import { Search, Filter, Calendar, Loader2, ArrowRight, Users, Award, MapPin, Shield, Mail, Phone, Clock, CheckCircle2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import { useAuth } from '../context/AuthContext';

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [openFaq, setOpenFaq] = useState(null);
    const [startDate, setStartDate] = useState(() => {
        const saved = sessionStorage.getItem('startDate');
        return saved ? new Date(saved) : null;
    });
    const [endDate, setEndDate] = useState(() => {
        const saved = sessionStorage.getItem('endDate');
        return saved ? new Date(saved) : null;
    });

    const handleBookNow = (carId) => {
        if (!startDate || !endDate) {
            toast.error('Please select both Pick-up and Return dates first.');
            window.scrollTo({ top: 300, behavior: 'smooth' }); // Scroll to search bar
            return;
        }

        if (isAuthenticated) {
            const hasDocs = user.profile?.idCardUrl && user.profile?.driverLicenseUrl;
            const hasAgreement = user.profile?.agreementSigned;

            if (!hasDocs) {
                navigate(`/upload-docs?carId=${carId}`);
            } else if (!hasAgreement) {
                navigate(`/agreement?carId=${carId}`);
            } else {
                navigate(`/payment?carId=${carId}`);
            }
        } else {
            navigate(`/login?carId=${carId}`);
        }
    };

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const params = {};
                if (startDate) params.startDate = startDate.toISOString();
                if (endDate) params.endDate = endDate.toISOString();

                const data = await api.get('/cars', { params });
                setCars(data);
            } catch (error) {
                console.error('Failed to fetch cars:', error);
                toast.error('Failed to update fleet availability');
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [startDate, endDate]);

    const filteredCars = cars.filter(car => {
        const matchesSearch = `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || car.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', 'Economy', 'SUV', 'Luxury', 'Utility'];

    return (
        <div className="space-y-16 pb-16 bg-gray-50 min-h-screen">
            {/* Hero Sectionn */}
            <section className="relative h-[600px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <div className="max-w-5xl">
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight animate-in slide-in-from-bottom-5 fade-in duration-700 drop-shadow-lg">
                            Drive Your <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Dream</span> Today
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto font-light leading-relaxed animate-in slide-in-from-bottom-5 fade-in duration-700 delay-150 drop-shadow-md">
                            Premium fleet management and car rental services in Ethiopia. <br />Unbeatable prices, unlimited miles.
                        </p>
                        <div className="animate-in slide-in-from-bottom-5 fade-in duration-700 delay-300">
                            <a href="#fleet" className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all hover:scale-105 inline-block shadow-lg hover:shadow-primary/50">
                                Browse Fleet
                            </a>
                            <button
                                onClick={() => navigate('/packages')}
                                className="ml-4 bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all hover:scale-105 inline-block shadow-lg border border-white/30"
                            >
                                View Packages
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search & Filter - Proximity: Grouped controls, Alignment: Center aligned within container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
                <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-center ring-1 ring-gray-100">
                    <div className="lg:col-span-3 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Make or model..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-gray-50 focus:bg-white text-gray-900"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="lg:col-span-2 relative group">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                        <select
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none appearance-none bg-gray-50 focus:bg-white cursor-pointer text-gray-900"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div className="lg:col-span-3 relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary z-10 pointer-events-none" size={20} />
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                                if (date) sessionStorage.setItem('startDate', date.toISOString());
                            }}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date()}
                            placeholderText="Pick-up Date"
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-gray-50 focus:bg-white text-gray-700 font-medium"
                        />
                        <span className="absolute -top-2 left-4 bg-white px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider z-10">Pick-up</span>
                    </div>

                    <div className="lg:col-span-3 relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary z-10 pointer-events-none" size={20} />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => {
                                setEndDate(date);
                                if (date) sessionStorage.setItem('endDate', date.toISOString());
                            }}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate || new Date()}
                            placeholderText="Return Date"
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-gray-50 focus:bg-white text-gray-700 font-medium"
                        />
                        <span className="absolute -top-2 left-4 bg-white px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider z-10">Return</span>
                    </div>

                    <div className="lg:col-span-1">
                        <a href="#fleet" className="w-full h-[60px] bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl flex items-center justify-center transform active:scale-95 group">
                            <Search className="group-hover:scale-120 transition-transform" size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Car Layout */}
            <section id="fleet" className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Premium Fleet</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Choose from our wide range of luxury and economy vehicles tailored to your needs.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-24">
                        <Loader2 className="animate-spin text-primary" size={48} />
                    </div>
                ) : filteredCars.length > 0 ? (
                    <>
                        {/* Show only first 3 cars on landing page */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCars.slice(0, 3).map(car => (
                                <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
                                    {/* Image Section */}
                                    <div className="relative h-56 overflow-hidden bg-gray-100">
                                        <img
                                            src={api.getImageUrl(car.imageUrl) || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800"}
                                            alt={`${car.make} ${car.model}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider text-gray-800 border border-gray-100">
                                            {car.category}
                                        </div>
                                        {car.status === 'RENTED' && (!startDate || !endDate) && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                                                <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg transform -rotate-12 border-2 border-white">
                                                    RENTED
                                                </span>
                                            </div>
                                        )}
                                        {car.status === 'RENTED' && startDate && endDate && (
                                            <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black shadow-lg uppercase tracking-widest text-white border border-white/20 animate-in fade-in zoom-in duration-500">
                                                Available for dates
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section - Proximity: Grouped details */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">{car.make} {car.model}</h3>
                                                <p className="text-gray-500 font-medium text-sm mt-1">{car.year} Model</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-extrabold text-primary">{Number(car.dailyRate).toLocaleString()} <span className="text-sm font-normal text-gray-500">ETB</span></p>
                                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">per day</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {car.features.map((feature, idx) => (
                                                <span key={idx} className="bg-gray-50 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-100">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-auto">
                                            <button
                                                onClick={() => (car.status === 'AVAILABLE' || (startDate && endDate)) ? handleBookNow(car.id) : null}
                                                className={`block w-full text-center py-4 rounded-xl font-bold text-sm tracking-wide transition-all uppercase ${(car.status === 'AVAILABLE' || (startDate && endDate))
                                                    ? 'bg-gray-900 text-white hover:bg-primary hover:text-gray-900 shadow-md hover:shadow-lg transform active:scale-[0.98]'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                                    }`}
                                            >
                                                {(car.status === 'AVAILABLE' || (startDate && endDate)) ? 'Book Now' : 'Currently Unavailable'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* View All Cars CTA */}
                        <div className="text-center mt-12">
                            <button
                                onClick={() => navigate('/fleet')}
                                className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-900 hover:text-white transition-all hover:scale-105 inline-block shadow-lg hover:shadow-primary/50"
                            >
                                View More Cars
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <p className="text-xl text-gray-500 font-medium">No cars found matching your criteria.</p>
                        <button onClick={() => { setSearchTerm(''); setFilterCategory('All'); }} className="mt-4 text-primary font-bold hover:underline">
                            Clear Filters
                        </button>
                    </div>
                )}
            </section>

            {/* About Us Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Why Choose Teddy Car Rental</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Ethiopia's trusted fleet management and car rental service, providing reliable vehicles and exceptional customer experiences.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                <Users className="text-primary" size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 text-center">Customer First</h3>
                            <p className="text-sm text-gray-600 text-center leading-relaxed">We prioritize our customers' needs with 24/7 support and flexible rental options.</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                <Award className="text-primary" size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 text-center">Quality Fleet</h3>
                            <p className="text-sm text-gray-600 text-center leading-relaxed">Our vehicles are regularly maintained and inspected to ensure safety and comfort.</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                <MapPin className="text-primary" size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 text-center">Local Expertise</h3>
                            <p className="text-sm text-gray-600 text-center leading-relaxed">Based in Addis Ababa with deep knowledge of Ethiopian roads and travel needs.</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                <Shield className="text-primary" size={24} />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 text-center">Fully Insured</h3>
                            <p className="text-sm text-gray-600 text-center leading-relaxed">All rentals include comprehensive insurance coverage for your peace of mind.</p>
                        </div>
                    </div>

                    <div className="mt-16 bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
                        <ul className="space-y-4 max-w-2xl mx-auto">
                            <li className="flex items-start gap-4 p-4 bg-white rounded-lg">
                                <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={24} />
                                <span className="text-gray-700 text-lg">Provide accessible, reliable, and affordable car rental services across Ethiopia</span>
                            </li>
                            <li className="flex items-start gap-4 p-4 bg-white rounded-lg">
                                <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={24} />
                                <span className="text-gray-700 text-lg">Empower mobility for tourists, business professionals, and families</span>
                            </li>
                            <li className="flex items-start gap-4 p-4 bg-white rounded-lg">
                                <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={24} />
                                <span className="text-gray-700 text-lg">Maintain every vehicle to the highest safety and comfort standards</span>
                            </li>
                            <li className="flex items-start gap-4 p-4 bg-white rounded-lg">
                                <CheckCircle2 className="text-primary mt-0.5 flex-shrink-0" size={24} />
                                <span className="text-gray-700 text-lg">Deliver exceptional customer experiences through dedicated support</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">We'd love to hear from you. Reach out anytime.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                <MapPin className="text-primary" size={22} />
                            </div>
                            <h3 className="font-bold text-gray-900 text-center mb-2">Address</h3>
                            <p className="text-gray-600 text-sm text-center">Bole Road, Addis Ababa, Ethiopia</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                <Phone className="text-primary" size={22} />
                            </div>
                            <h3 className="font-bold text-gray-900 text-center mb-2">Phone</h3>
                            <p className="text-gray-600 text-sm text-center">+251 900 000 000</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                <Mail className="text-primary" size={22} />
                            </div>
                            <h3 className="font-bold text-gray-900 text-center mb-2">Email</h3>
                            <p className="text-gray-600 text-sm text-center">info@teddyrental.com</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                <Clock className="text-primary" size={22} />
                            </div>
                            <h3 className="font-bold text-gray-900 text-center mb-2">Business Hours</h3>
                            <p className="text-gray-600 text-sm text-center">Mon - Sat: 8AM - 6PM</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Find answers to common questions about our car rental services.</p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                question: "What documents do I need to rent a car?",
                                answer: "You need a valid driver's license, passport or national ID, and a credit card for the security deposit. International customers may need an international driving permit."
                            },
                            {
                                question: "What is the minimum age to rent a car?",
                                answer: "The minimum age to rent a car is 21 years. Drivers under 25 may incur a young driver surcharge. Some premium vehicles may have higher age requirements."
                            },
                            {
                                question: "Is insurance included in the rental price?",
                                answer: "Yes, all our rentals include basic comprehensive insurance coverage. You can also opt for additional coverage for extra peace of mind."
                            },
                            {
                                question: "Can I pick up and drop off the car at different locations?",
                                answer: "Yes, we offer one-way rentals. Additional fees may apply depending on the pickup and drop-off locations. Please contact us for more details."
                            },
                            {
                                question: "What is your cancellation policy?",
                                answer: "You can cancel your booking free of charge up to 24 hours before the pickup time. Late cancellations may incur a fee equal to one day's rental."
                            },
                            {
                                question: "Do you offer airport pickup and drop-off?",
                                answer: "Yes, we provide airport pickup and drop-off services at Addis Ababa Bole International Airport. Please provide your flight details when making your reservation."
                            }
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 transition-colors duration-300"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                                >
                                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                                    <ChevronDown
                                        className={`text-primary flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                                        size={20}
                                    />
                                </button>
                                {openFaq === index && (
                                    <div className="p-5 bg-white border-t border-gray-100">
                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
