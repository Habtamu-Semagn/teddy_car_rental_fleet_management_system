import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import {
    Car,
    Package,
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ChevronRight,
    Search,
    Filter,
    ArrowLeft,
    MapPin,
    Smartphone,
    CreditCard,
    FileText,
    User as UserIcon,
    Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

const BookingProgressTracker = ({ status }) => {
    const stages = [
        { key: 'SUBMITTED', label: 'Submitted', statuses: ['PENDING', 'VERIFIED', 'APPROVED', 'PAID', 'ACTIVE', 'COMPLETED'] },
        { key: 'VERIFICATION', label: 'Verified', statuses: ['VERIFIED', 'APPROVED', 'PAID', 'ACTIVE', 'COMPLETED'], failStatuses: ['REJECTED'] },
        { key: 'APPROVAL', label: 'Approved', statuses: ['APPROVED', 'PAID', 'ACTIVE', 'COMPLETED'] },
        { key: 'ACTIVE', label: 'Trip Started', statuses: ['ACTIVE', 'COMPLETED'] },
        { key: 'COMPLETED', label: 'Completed', statuses: ['COMPLETED'] }
    ];

    const currentIdx = stages.reduce((lastIdx, stage, idx) =>
        stage.statuses.includes(status) ? idx : lastIdx, -1);
    const isError = status === 'REJECTED' || status === 'CANCELLED';

    return (
        <div className="py-8">
            <div className="relative flex justify-between">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-0"></div>
                <div
                    className={`absolute top-5 left-0 h-0.5 transition-all duration-1000 -z-0 ${isError ? 'bg-red-500' : 'bg-primary'}`}
                    style={{ width: `${Math.max(0, currentIdx) * 25}%` }}
                ></div>

                {stages.map((stage, idx) => {
                    const isCompleted = idx < currentIdx;
                    const isActive = idx === currentIdx;
                    const isFailed = stage.failStatuses?.includes(status);

                    return (
                        <div key={stage.key} className="relative z-10 flex flex-col items-center gap-3 px-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 shadow-sm ${isFailed ? 'bg-orange-500 border-orange-100 text-white animate-bounce' :
                                isCompleted ? 'bg-primary border-primary/20 text-white' :
                                    isActive ? 'bg-white border-primary text-primary scale-110 ring-4 ring-primary/10' :
                                        'bg-white border-gray-100 text-gray-300'
                                }`}>
                                {isFailed ? <XCircle size={18} /> :
                                    isCompleted ? <CheckCircle2 size={18} /> :
                                        idx + 1}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isFailed ? 'text-orange-600' :
                                isCompleted || isActive ? 'text-gray-900' : 'text-gray-400'
                                }`}>
                                {isFailed ? 'Issue Found' : stage.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {status === 'REJECTED' && (
                <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start gap-3">
                    <AlertCircle className="text-orange-500 shrink-0" size={20} />
                    <div>
                        <p className="text-sm font-bold text-orange-900">Action Required</p>
                        <p className="text-xs text-orange-700 mt-0.5">Your documents were not verified. Please contact support or re-upload your ID/License.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

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

    const openDetails = (booking) => {
        setSelectedBooking(booking);
        setDetailsOpen(true);
    };

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
                                    placeholder="Search references..."
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                />
                            </div>
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
                                className="group bg-white rounded-3xl border border-gray-100 p-1 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
                            >
                                <div className="p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center gap-8">
                                    {/* Car Image/Icon */}
                                    <div className="relative w-full lg:w-48 h-32 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                                        {booking.package ? (
                                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex flex-col items-center justify-center p-4">
                                                <Package size={32} className="text-primary mb-2" />
                                                <span className="text-xs font-bold text-primary text-center">{booking.package.name}</span>
                                            </div>
                                        ) : booking.car?.imageUrl ? (
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
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                                Reference
                                            </p>
                                            <h4 className="text-lg font-mono font-bold text-gray-900">#BK-{booking.id.toString().padStart(5, '0')}</h4>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Vehicle</p>
                                            <h4 className="text-base font-bold text-gray-900 truncate">
                                                {booking.package ? (
                                                    <>
                                                        <span className="text-primary">{booking.package.name}</span>
                                                        <span className="block text-xs font-medium text-gray-400 mt-0.5">{booking.package.category} Package</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        {booking.car?.make} {booking.car?.model}
                                                        <span className="block text-xs font-medium text-gray-400 mt-0.5">{booking.car?.plateNumber}</span>
                                                    </>
                                                )}
                                            </h4>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Rental Period</p>
                                            <div className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
                                                <Calendar size={14} className="text-primary" />
                                                <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                                                <ChevronRight size={12} className="text-gray-300" />
                                                <span>{new Date(booking.endDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Total Amount</p>
                                            <h4 className="text-lg font-black text-gray-900">
                                                {booking.totalAmount?.toLocaleString()} <span className="text-xs font-bold text-gray-400">ETB</span>
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 lg:border-l lg:border-gray-50 lg:pl-8 shrink-0">
                                        <Button
                                            onClick={() => openDetails(booking)}
                                            className="w-full lg:w-32 rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all font-bold group/btn"
                                        >
                                            Details
                                            <ChevronRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Detailed Booking Dialog */}
            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                <DialogContent className="max-w-2xl overflow-hidden p-0 rounded-3xl border-none">
                    <div className="max-h-[85vh] overflow-y-auto">
                        <DialogHeader className="p-8 bg-gray-900 text-white relative">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Car size={160} />
                            </div>
                            <DialogTitle className="text-2xl font-black tracking-tight mb-2">Booking Status Tracker</DialogTitle>
                            <DialogDescription className="text-gray-400">
                                Real-time update for reference #BK-{selectedBooking?.id?.toString().padStart(5, '0')}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="p-8">
                            {/* Visual Tracker */}
                            <BookingProgressTracker status={selectedBooking?.status} />

                            <Separator className="my-8 opacity-50" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    {/* Vehicle Card */}
                                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                            <Car size={14} className="text-primary" /> {selectedBooking?.package ? 'Package Information' : 'Vehicle Information'}
                                        </h4>
                                        {selectedBooking?.package ? (
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="font-bold text-gray-900 text-lg">{selectedBooking.package.name}</p>
                                                    <p className="text-sm text-gray-500 mt-0.5">{selectedBooking.package.category}</p>
                                                    <p className="text-xs font-bold text-primary bg-primary/5 inline-block px-2 py-0.5 rounded mt-2 uppercase tracking-tighter">
                                                        {selectedBooking.package.period}
                                                    </p>
                                                </div>
                                                {selectedBooking.package.features && selectedBooking.package.features.length > 0 && (
                                                    <div className="pt-2 border-t border-gray-200">
                                                        <p className="text-xs font-medium text-gray-500 mb-2">Package Includes:</p>
                                                        <ul className="space-y-1">
                                                            {selectedBooking.package.features.slice(0, 3).map((feature, idx) => (
                                                                <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                                                                    <CheckCircle2 size={10} className="text-green-500" />
                                                                    {feature}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex gap-4">
                                                <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-gray-100 shrink-0">
                                                    {selectedBooking?.car?.imageUrl && (
                                                        <img src={api.getImageUrl(selectedBooking.car.imageUrl)} alt="Car" className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{selectedBooking?.car?.make} {selectedBooking?.car?.model}</p>
                                                    <p className="text-sm text-gray-500 mt-0.5">Plate: {selectedBooking?.car?.plateNumber}</p>
                                                    <p className="text-xs font-bold text-primary bg-primary/5 inline-block px-2 py-0.5 rounded mt-2 uppercase tracking-tighter">
                                                        {selectedBooking?.car?.category}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Location Info */}
                                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                                            <MapPin size={14} className="text-primary" /> Pickup Location
                                        </h4>
                                        <p className="text-sm font-medium text-gray-700 leading-relaxed">
                                            {selectedBooking?.pickupLocation || 'Main Office, Addis Ababa'}
                                        </p>
                                        <div className="mt-3">
                                            {selectedBooking?.isDelivery ? (
                                                <Badge className="bg-orange-100 text-orange-800 border-orange-200">Delivery Pickup</Badge>
                                            ) : (
                                                <Badge className="bg-green-100 text-green-800 border-green-200">Office Branch</Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Support / Assistant Info */}
                                    <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                                            <UserIcon size={14} /> Assigned Personnel
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-primary/20 text-primary">
                                                    <Shield size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase">Company Agent</p>
                                                    <p className="font-bold text-gray-900 text-sm">TEDDY-ADMIN-01</p>
                                                </div>
                                            </div>

                                            {selectedBooking?.assignedDriver && (
                                                <div className="flex items-center gap-3 pt-2 border-t border-primary/10 animate-in fade-in slide-in-from-top-2">
                                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-primary/20 text-primary">
                                                        <Car size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400 font-bold uppercase">Delivery Driver</p>
                                                        <p className="font-bold text-gray-900 text-sm">{selectedBooking.assignedDriver}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Contact Support */}
                                    <div className="bg-white rounded-2xl p-5 border border-dashed border-gray-200">
                                        <p className="text-xs text-center text-gray-400 font-medium">
                                            Need help? Contact our 24/7 support line:
                                            <span className="block text-primary font-black mt-1 text-base">+251 911 22 33 44</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 border-t flex justify-end">
                        <Button onClick={() => setDetailsOpen(false)} variant="outline" className="rounded-xl px-8 font-bold">
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MyBookings;
