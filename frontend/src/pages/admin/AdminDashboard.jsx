import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Car, FileText, Check, X, Eye, Menu, Bell, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Mock Requests Data
    const requests = [
        { id: 'TR-83920', customer: 'Abebe Kebede', car: 'Toyota Corolla 2021', date: '2024-03-20', status: 'Pending' },
        { id: 'TR-83921', customer: 'Sara Tadesse', car: 'Hyundai Elantra', date: '2024-03-19', status: 'Verified' },
        { id: 'TR-83922', customer: 'John Doe', car: 'Toyota Land Cruiser', date: '2024-03-18', status: 'Approved' },
        { id: 'TR-83923', customer: 'Alice Smith', car: 'Suzuki Dzire', date: '2024-03-18', status: 'Rejected' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Verified': return 'bg-blue-100 text-blue-800';
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 fixed h-full z-20`}>
                <div className="h-16 flex items-center justify-center border-b border-gray-800">
                    {sidebarOpen ? (
                        <span className="text-xl font-bold text-primary">Teddy<span className="text-white">Admin</span></span>
                    ) : (
                        <span className="text-xl font-bold text-primary">TR</span>
                    )}
                </div>

                <nav className="mt-8 px-4 space-y-2">
                    <Link to="#" className="flex items-center px-4 py-3 bg-primary text-gray-900 rounded-lg font-medium">
                        <Users size={20} />
                        {sidebarOpen && <span className="ml-3">Dashboard</span>}
                    </Link>
                    <Link to="#" className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                        <Car size={20} />
                        {sidebarOpen && <span className="ml-3">Cars</span>}
                    </Link>
                    <Link to="#" className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                        <FileText size={20} />
                        {sidebarOpen && <span className="ml-3">Reports</span>}
                    </Link>

                    <div className="absolute bottom-8 w-full left-0 px-4">
                        <Link to="/admin/logout" className="flex items-center px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
                            <LogOut size={20} />
                            {sidebarOpen && <span className="ml-3">Logout</span>}
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Navbar */}
                <header className="bg-white shadow h-16 flex items-center justify-between px-6 sticky top-0 z-10">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700">
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-gray-700 relative">
                            <Bell size={24} />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            EM
                        </div>
                        <span className="font-medium text-sm hidden md:block">Employee</span>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-8 bg-gray-50/50 min-h-[calc(100vh-4rem)]">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
                            <p className="text-gray-500 mt-1">Manage fleet operations and verify bookings.</p>
                        </div>
                        <button className="bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-black transition-all shadow-sm flex items-center gap-2">
                            <FileText size={18} />
                            Generate Report
                        </button>
                    </div>

                    {/* Stats Grid - Proximity: Grouped related stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Pending Requests</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                                </div>
                                <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600 group-hover:bg-yellow-100 transition-colors">
                                    <Bell size={20} />
                                </div>
                            </div>
                            <div className="text-xs text-green-600 font-medium">+2 from yesterday</div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Verified Bookings</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">45</p>
                                </div>
                                <div className="p-2 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-100 transition-colors">
                                    <Check size={20} />
                                </div>
                            </div>
                            <div className="text-xs text-green-600 font-medium">+15% this week</div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Active Rentals</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
                                </div>
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                                    <Car size={20} />
                                </div>
                            </div>
                            <div className="text-xs text-gray-400 font-medium">Out of 10 total cars</div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-1">125k</p>
                                </div>
                                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                                    <span className="font-bold text-lg">ETB</span>
                                </div>
                            </div>
                            <div className="text-xs text-green-600 font-medium">+8% from last month</div>
                        </div>
                    </div>

                    {/* Requests Table - Alignment: Improved padding and vertical alignment */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                            <h3 className="font-bold text-lg text-gray-900">Recent Booking Requests</h3>
                            <button className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors">View All Requests</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50/50 text-xs uppercase tracking-wider text-gray-500 font-semibold border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-4">Reference</th>
                                        <th className="px-8 py-4">Customer</th>
                                        <th className="px-8 py-4">Vehicle</th>
                                        <th className="px-8 py-4">Date</th>
                                        <th className="px-8 py-4">Status</th>
                                        <th className="px-8 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {requests.map((req) => (
                                        <tr key={req.id} className="hover:bg-gray-50/80 transition-colors">
                                            <td className="px-8 py-4 font-mono font-medium text-gray-900">{req.id}</td>
                                            <td className="px-8 py-4 font-medium text-gray-900">{req.customer}</td>
                                            <td className="px-8 py-4 text-gray-600">{req.car}</td>
                                            <td className="px-8 py-4 text-gray-500 whitespace-nowrap">{req.date}</td>
                                            <td className="px-8 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${req.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                        req.status === 'Verified' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                            req.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                                                                'bg-red-50 text-red-700 border-red-200'
                                                    }`}>
                                                    {req.status === 'Pending' && <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5"></span>}
                                                    {req.status === 'Verified' && <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1.5"></span>}
                                                    {req.status === 'Approved' && <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>}
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4 text-right space-x-1">
                                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View Details">
                                                    <Eye size={18} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Approve Request">
                                                    <Check size={18} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Reject Request">
                                                    <X size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
