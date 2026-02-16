import React, { useState, useEffect } from 'react';
import {
    CheckCircle, XCircle, Eye, FileCheck, ClipboardCheck, AlertCircle, TrendingUp,
    Loader2
} from 'lucide-react';

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import EmployeeLayout from "@/components/employee-layout";
import { api } from "@/api";

const EmployeeDashboard = () => {
    // Modal states
    const [verifyModalOpen, setVerifyModalOpen] = useState(false);
    const [approveModalOpen, setApproveModalOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [assignCarModalOpen, setAssignCarModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [verificationNotes, setVerificationNotes] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    const [selectedCar, setSelectedCar] = useState('');

    const [requests, setRequests] = useState([]);
    const [availableCars, setAvailableCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [bookings, cars] = await Promise.all([
                    api.get('/bookings'),
                    api.get('/cars')
                ]);
                setRequests(bookings);
                setAvailableCars(cars.filter(c => c.status === 'AVAILABLE'));
            } catch (error) {
                console.error('Failed to fetch employee dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'PENDING': return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
            case 'DOCUMENTS_SUBMITTED': return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Docs Submitted</Badge>;
            case 'VERIFIED': return <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>;
            case 'APPROVED': return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Approved</Badge>;
            case 'REJECTED': return <Badge variant="destructive">Rejected</Badge>;
            case 'ACTIVE': return <Badge className="bg-primary/10 text-primary border-primary/20">Active Rental</Badge>;
            case 'COMPLETED': return <Badge variant="outline">Completed</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };


    const handleVerifyDocuments = (request) => {
        setSelectedRequest(request);
        setVerifyModalOpen(true);
    };

    const handleApproveBooking = (request) => {
        setSelectedRequest(request);
        setApproveModalOpen(true);
    };

    const handleRejectBooking = (request) => {
        setSelectedRequest(request);
        setRejectModalOpen(true);
    };

    const handleAssignCar = (request) => {
        setSelectedRequest(request);
        setAssignCarModalOpen(true);
    };

    const confirmVerification = async (approved) => {
        try {
            const status = approved ? 'VERIFIED' : 'REJECTED';
            await api.patch(`/bookings/${selectedRequest.id}/status`, { status });
            setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status } : r));
            setVerifyModalOpen(false);
            setVerificationNotes('');
        } catch (error) {
            console.error('Failed to update verification status:', error);
        }
    };

    const confirmApproval = async () => {
        try {
            await api.patch(`/bookings/${selectedRequest.id}/status`, { status: 'APPROVED' });
            setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: 'APPROVED' } : r));
            setApproveModalOpen(false);
        } catch (error) {
            console.error('Failed to approve booking:', error);
        }
    };

    const confirmRejection = async () => {
        try {
            await api.patch(`/bookings/${selectedRequest.id}/status`, { status: 'REJECTED' });
            setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: 'REJECTED' } : r));
            setRejectModalOpen(false);
            setRejectionReason('');
        } catch (error) {
            console.error('Failed to reject booking:', error);
        }
    };

    const confirmCarAssignment = async () => {
        try {
            // Re-use status update for car assignment too
            await api.patch(`/bookings/${selectedRequest.id}/status`, {
                status: 'ACTIVE',
                carId: selectedCar
            });
            setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: 'ACTIVE', carId: selectedCar } : r));
            setAssignCarModalOpen(false);
            setSelectedCar('');
        } catch (error) {
            console.error('Failed to assign car:', error);
        }
    };

    const stats = {
        pendingVerifications: requests.filter(r => r.status === 'DOCUMENTS_SUBMITTED').length,
        pendingApprovals: requests.filter(r => r.status === 'VERIFIED').length,
        activeBookings: requests.filter(r => r.status === 'APPROVED' || r.status === 'ACTIVE').length,
        availableCarsCount: availableCars.length
    };


    return (
        <EmployeeLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Requests Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Manage customer bookings and verify documents</p>
                </div>
            </div>

            {/* Stats Grid - Using shadcn Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Verifications</CardTitle>
                        <FileCheck className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pendingVerifications}</div>
                        <p className="text-xs text-muted-foreground mt-1 text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                            {stats.pendingVerifications > 0 && <AlertCircle size={12} />}
                            {stats.pendingVerifications > 0 ? 'Requires attention' : 'All clear'}
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
                        <ClipboardCheck className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
                        <p className="text-xs text-muted-foreground mt-1 text-blue-600 dark:text-blue-400">
                            Ready for approval
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Rentals</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeBookings}</div>
                        <p className="text-xs text-muted-foreground mt-1 text-green-600 dark:text-green-400">
                            Current operations
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Available Cars</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.availableCarsCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Ready to assign
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Requests Table - Using shadcn Card and ScrollArea */}
            <Card className="border-border/60 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex justify-between items-center bg-card">
                    <div>
                        <h3 className="font-bold text-lg">Customer Booking Requests</h3>
                        <p className="text-sm text-muted-foreground">Verify documents, approve bookings, and assign cars</p>
                    </div>
                </div>
                <ScrollArea className="h-[400px]">
                    <Table>
                        <TableHeader className="bg-muted/40">
                            <TableRow>
                                <TableHead className="w-[100px]">Reference</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10">
                                        <Loader2 className="animate-spin inline-block mr-2" />
                                        Loading requests...
                                    </TableCell>
                                </TableRow>
                            )}
                            {!loading && requests.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                        No booking requests found.
                                    </TableCell>
                                </TableRow>
                            )}
                            {requests.map((req) => (
                                <TableRow key={req.id}>
                                    <TableCell className="font-mono font-medium text-xs">#{req.id}</TableCell>
                                    <TableCell>
                                        <div className="font-medium text-sm">
                                            {req.user?.customerProfile ? `${req.user.customerProfile.firstName} ${req.user.customerProfile.lastName}` : 'N/A'}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground">{req.user?.email}</div>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {req.car?.make} {req.car?.model}
                                        <div className="text-[10px] text-muted-foreground">Plate: {req.car?.plateNumber}</div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-[10px]">
                                        {new Date(req.startDate).toLocaleDateString()} to {new Date(req.endDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(req.status)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20" title="View Details">
                                                <Eye size={16} />
                                            </Button>
                                            {req.status === 'DOCUMENTS_SUBMITTED' && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                                    title="Verify Documents"
                                                    onClick={() => handleVerifyDocuments(req)}
                                                >
                                                    <FileCheck size={16} />
                                                </Button>
                                            )}
                                            {req.status === 'VERIFIED' && (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                                                        title="Approve Booking"
                                                        onClick={() => handleApproveBooking(req)}
                                                    >
                                                        <CheckCircle size={16} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        title="Reject Booking"
                                                        onClick={() => handleRejectBooking(req)}
                                                    >
                                                        <XCircle size={16} />
                                                    </Button>
                                                </>
                                            )}
                                            {req.status === 'APPROVED' && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                                                    title="Assign Car"
                                                    onClick={() => handleAssignCar(req)}
                                                >
                                                    <FileCheck size={16} />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </Card>


            {/* Modals remain the same but using shadcn Dialog */}
            <Dialog open={verifyModalOpen} onOpenChange={setVerifyModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Verify Documents - {selectedRequest?.id}</DialogTitle>
                        <DialogDescription>
                            Review the uploaded documents for {selectedRequest?.customer}
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[400px]">
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <h4 className="font-medium">Uploaded Documents:</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="p-4 text-center bg-muted/30">
                                        <FileCheck className="mx-auto mb-2 text-primary" size={32} />
                                        <p className="text-sm font-medium">Driver's License</p>
                                        <Button variant="link" size="sm" className="text-xs">View Document</Button>
                                    </Card>
                                    <Card className="p-4 text-center bg-muted/30">
                                        <FileCheck className="mx-auto mb-2 text-primary" size={32} />
                                        <p className="text-sm font-medium">ID Card</p>
                                        <Button variant="link" size="sm" className="text-xs">View Document</Button>
                                    </Card>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Verification Notes</label>
                                <Textarea
                                    placeholder="Add notes about the document verification..."
                                    value={verificationNotes}
                                    onChange={(e) => setVerificationNotes(e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </div>
                    </ScrollArea>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setVerifyModalOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => confirmVerification(false)}>
                            <XCircle size={16} className="mr-2" />
                            Reject Documents
                        </Button>
                        <Button onClick={() => confirmVerification(true)}>
                            <CheckCircle size={16} className="mr-2" />
                            Approve Documents
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={approveModalOpen} onOpenChange={setApproveModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Approve Booking - {selectedRequest?.id}</DialogTitle>
                        <DialogDescription>
                            Confirm booking approval for {selectedRequest?.customer}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <p className="text-sm"><strong>Customer:</strong> {selectedRequest?.customer}</p>
                            <p className="text-sm"><strong>Vehicle:</strong> {selectedRequest?.car}</p>
                            <p className="text-sm"><strong>Date:</strong> {selectedRequest?.date}</p>
                            <p className="text-sm"><strong>Phone:</strong> {selectedRequest?.phone}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setApproveModalOpen(false)}>Cancel</Button>
                        <Button onClick={confirmApproval}>
                            <CheckCircle size={16} className="mr-2" />
                            Approve Booking
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reject Booking - {selectedRequest?.id}</DialogTitle>
                        <DialogDescription>
                            Provide a reason for rejecting this booking
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Rejection Reason</label>
                            <Textarea
                                placeholder="Explain why this booking is being rejected..."
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                rows={4}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRejectModalOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmRejection}>
                            <XCircle size={16} className="mr-2" />
                            Reject Booking
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={assignCarModalOpen} onOpenChange={setAssignCarModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Assign Car - {selectedRequest?.id}</DialogTitle>
                        <DialogDescription>
                            Select an available car to assign to {selectedRequest?.customer}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Select Vehicle</label>
                            <Select value={selectedCar} onValueChange={setSelectedCar}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a car..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableCars.map((car) => (
                                        <SelectItem key={car.id} value={car.id}>
                                            {car.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAssignCarModalOpen(false)}>Cancel</Button>
                        <Button onClick={confirmCarAssignment} disabled={!selectedCar}>
                            <CheckCircle size={16} className="mr-2" />
                            Assign Car
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </EmployeeLayout>
    );
};

export default EmployeeDashboard;
