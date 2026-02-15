import React, { useState } from 'react';
import {
    Users, Car, FileText, Check, X, Eye,
    TrendingUp, DollarSign, Calendar
} from 'lucide-react';

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import AdminLayout from "@/components/admin-layout";

const AdminDashboard = () => {
    // Mock Requests Data
    const requests = [
        { id: 'TR-83920', customer: 'Abebe Kebede', car: 'Toyota Corolla 2021', date: '2024-03-20', status: 'Pending', type: 'Rental' },
        { id: 'TR-83921', customer: 'Sara Tadesse', car: 'Hyundai Elantra', date: '2024-03-19', status: 'Verified', type: 'Rental' },
        { id: 'TR-83922', customer: 'John Doe', car: 'Toyota Land Cruiser', date: '2024-03-18', status: 'Approved', type: 'Corporate' },
        { id: 'TR-83923', customer: 'Alice Smith', car: 'Suzuki Dzire', date: '2024-03-18', status: 'Rejected', type: 'Rental' },
        { id: 'TR-83924', customer: 'Dawit Mulatu', car: 'Toyota Hilux', date: '2024-03-17', status: 'Pending', type: 'Long-term' },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending': return <Badge variant="warning" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200">Pending</Badge>;
            case 'Verified': return <Badge variant="info" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Verified</Badge>;
            case 'Approved': return <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Approved</Badge>;
            case 'Rejected': return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200">Rejected</Badge>;
            default: return <Badge variant="secondary">Unknown</Badge>;
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
                    <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Calendar size={16} />
                        Select Date Range
                    </Button>
                    <Button className="gap-2 shadow-lg hover:shadow-primary/25">
                        <FileText size={16} />
                        Generate Report
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">ETB 145,300</div>
                        <p className="text-xs text-muted-foreground mt-1 text-green-600 flex items-center gap-1">
                            <TrendingUp size={12} /> +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground mt-1 text-yellow-600">
                            Requires attention
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Rentals</CardTitle>
                        <Car className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground mt-1 text-blue-600">
                            +4 since yesterday
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,203</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            +18 new this week
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Booking Requests Table */}
            <Card className="border-border/60 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex justify-between items-center bg-card">
                    <div>
                        <h3 className="font-bold text-lg">Recent Booking Requests</h3>
                        <p className="text-sm text-muted-foreground">Manage and verify new booking submissions.</p>
                    </div>
                    <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/5">View All</Button>
                </div>
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead className="w-[100px]">Reference</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Vehicle Details</TableHead>
                            <TableHead>Booking Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.map((req) => (
                            <TableRow key={req.id}>
                                <TableCell className="font-mono font-medium text-xs">{req.id}</TableCell>
                                <TableCell>
                                    <div className="font-medium">{req.customer}</div>
                                    <div className="text-xs text-muted-foreground">Standard Customer</div>
                                </TableCell>
                                <TableCell>{req.car}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-normal text-muted-foreground">{req.type}</Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{req.date}</TableCell>
                                <TableCell>
                                    {getStatusBadge(req.status)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" title="View">
                                            <Eye size={16} />
                                        </Button>
                                        {req.status === 'Pending' && (
                                            <>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" title="Approve">
                                                    <Check size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" title="Reject">
                                                    <X size={16} />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </AdminLayout>
    );
};

export default AdminDashboard;
