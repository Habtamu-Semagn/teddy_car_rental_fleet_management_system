import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import {
    Car,
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ChevronRight,
    Search,
    Filter,
    ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const StatusBadge = ({ status }) => {
    const statusConfig = {
        PENDING: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock, label: 'Pending Approval' },
        VERIFIED: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle2, label: 'Docs Verified' },
        APPROVED: { color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: CheckCircle2, label: 'Approved' },
        PAID: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2, label: 'Paid & Reserved' },
        ACTIVE: { color: 'bg-green-100 text-green-700 border-green-200', icon: Car, label: 'Currently Active' },
        COMPLETED: { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: CheckCircle2, label: 'Completed' },
        CANCELLED: { color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle, label: 'Cancelled' },
        REJECTED: { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: AlertCircle, label: 'Rejected' },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.color}`}>
            <Icon size={14} />
            {config.label}
        </span>
    );
};

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await api.get('/bookings/my');
                setBookings(data);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
                toast.error('Failed to load your bookings');
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading your journey...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-4 group">
                                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                Back to Fleet
                            </Link>
                            <h1 className="text-4xl font-display font-extrabold text-gray-900 tracking-tight">
                                My <span className="text-primary">Rentals</span>
                            </h1>
                            <p className="mt-2 text-gray-500 text-lg">Track your current and past car rental trips</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative flex-grow md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by ID or Car..."
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                            <Button variant="outline" className="rounded-xl px-5 h-12 border-gray-100 hover:bg-gray-100">
                                <Filter size={18} className="mr-2" />
                                Filter
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {bookings.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-200 shadow-sm">
                        <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Car size={40} className="text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No rentals yet</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                            When you book a car with Teddy Rental, it will appear here for you to track and manage.
                        </p>
                        <Link to="/">
                            <Button className="rounded-xl px-8 py-6 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                                Explore Our Fleet
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="group bg-white rounded-3xl border border-gray-100 p-1 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                            >
                                <div className="p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center gap-8">
                                    {/* Car Image/Icon */}
                                    <div className="relative w-full lg:w-48 h-32 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                                        {booking.car?.imageUrl ? (
                                            <img
                                                src={api.getImageUrl(booking.car.imageUrl)}
                                                alt={booking.car.model}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <Car size={40} className="text-gray-200" />
                                        )}
                                        <div className="absolute top-3 left-3">
                                            <StatusBadge status={booking.status} />
                                        </div>
                                    </div>

                                    {/* Booking Details */}
                                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                                        <div>
                                            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                                Reference
                                            </p>
                                            <h4 className="text-lg font-mono font-bold text-gray-900">#BK-{booking.id.toString().padStart(5, '0')}</h4>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Vehicle</p>
                                            <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{booking.car?.make} {booking.car?.model}</h4>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Rental Period</p>
                                            <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                                <Calendar size={16} className="text-primary" />
                                                <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                                                <ChevronRight size={14} className="text-gray-300" />
                                                <span>{new Date(booking.endDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Total Paid</p>
                                            <h4 className="text-xl font-black text-emerald-600">
                                                {booking.totalAmount?.toLocaleString()} <span className="text-xs font-bold text-gray-400">ETB</span>
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 lg:border-l lg:border-gray-50 lg:pl-8 shrink-0">
                                        <Button variant="ghost" className="w-full sm:w-auto rounded-xl hover:bg-gray-50 flex items-center gap-2 font-bold px-6">
                                            Details
                                            <ChevronRight size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
