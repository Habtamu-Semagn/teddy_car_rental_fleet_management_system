import React, { useState } from 'react';
import {
    CheckCircle, XCircle, Eye, FileCheck, ClipboardCheck, AlertCircle, TrendingUp
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

    // Mock Data
    const requests = [
        { id: 'BR-10234', customer: 'Abebe Kebede', car: 'Toyota Corolla 2021', date: '2024-03-20', status: 'Documents Submitted', phone: '+251-911-234567' },
        { id: 'BR-10235', customer: 'Sara Tadesse', car: 'Hyundai Elantra', date: '2024-03-19', status: 'Verified', phone: '+251-911-345678' },
        { id: 'BR-10236', customer: 'John Doe', car: 'Toyota Land Cruiser', date: '2024-03-18', status: 'Approved', phone: '+251-911-456789' },
        { id: 'BR-10237', customer: 'Dawit Mulatu', car: 'Toyota Hilux', date: '2024-03-17', status: 'Pending', phone: '+251-911-567890' },
        { id: 'BR-10238', customer: 'Meron Haile', car: 'Suzuki Dzire', date: '2024-03-16', status: 'Documents Submitted', phone: '+251-911-678901' },
    ];

    const availableCars = [
        { id: 'CAR-001', name: 'Toyota Corolla 2021 - Plate: AA-12345' },
        { id: 'CAR-002', name: 'Hyundai Elantra 2022 - Plate: AA-23456' },
        { id: 'CAR-003', name: 'Toyota Land Cruiser 2020 - Plate: AA-34567' },
        { id: 'CAR-004', name: 'Suzuki Dzire 2023 - Plate: AA-45678' },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending': return <Badge variant="warning" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800">Pending</Badge>;
            case 'Documents Submitted': return <Badge variant="info" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">Docs Submitted</Badge>;
            case 'Verified': return <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">Verified</Badge>;
            case 'Approved': return <Badge variant="success" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">Approved</Badge>;
            case 'Rejected': return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">Rejected</Badge>;
            default: return <Badge variant="secondary">Unknown</Badge>;
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

    const confirmVerification = (approved) => {
        console.log(`Document ${approved ? 'approved' : 'rejected'} for ${selectedRequest.id}`, verificationNotes);
        setVerifyModalOpen(false);
        setVerificationNotes('');
    };

    const confirmApproval = () => {
        console.log(`Booking approved for ${selectedRequest.id}`);
        setApproveModalOpen(false);
    };

    const confirmRejection = () => {
        console.log(`Booking rejected for ${selectedRequest.id}:`, rejectionReason);
        setRejectModalOpen(false);
        setRejectionReason('');
    };

    const confirmCarAssignment = () => {
        console.log(`Car ${selectedCar} assigned to ${selectedRequest.id}`);
        setAssignCarModalOpen(false);
        setSelectedCar('');
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
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground mt-1 text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                            <AlertCircle size={12} /> Requires attention
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
                        <ClipboardCheck className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground mt-1 text-blue-600 dark:text-blue-400">
                            Ready for approval
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Bookings</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground mt-1 text-green-600 dark:text-green-400">
                            Currently approved
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Available Cars</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{availableCars.length}</div>
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
                    <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/5">View All</Button>
                </div>
                <ScrollArea className="h-[400px]">
                    <Table>
                        <TableHeader className="bg-muted/40">
                            <TableRow>
                                <TableHead className="w-[100px]">Reference</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Vehicle</TableHead>
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
                                        <div className="text-xs text-muted-foreground">{req.phone}</div>
                                    </TableCell>
                                    <TableCell>{req.car}</TableCell>
                                    <TableCell className="text-muted-foreground">{req.date}</TableCell>
                                    <TableCell>
                                        {getStatusBadge(req.status)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20" title="View Details">
                                                <Eye size={16} />
                                            </Button>
                                            {req.status === 'Documents Submitted' && (
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
                                            {req.status === 'Verified' && (
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
                                            {req.status === 'Approved' && (
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
