import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';
import { Search, Filter, Calendar, Loader2, ArrowRight } from 'lucide-react';
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCars.map(car => (
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
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <p className="text-xl text-gray-500 font-medium">No cars found matching your criteria.</p>
                        <button onClick={() => { setSearchTerm(''); setFilterCategory('All'); }} className="mt-4 text-primary font-bold hover:underline">
                            Clear Filters
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
