import React, { useState, useEffect, useCallback, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {
    FileText, Download, Calendar, TrendingUp, Users, Car as CarIcon, DollarSign, CheckCircle, Loader2
} from 'lucide-react';

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import EmployeeLayout from "@/components/employee-layout";
import { api } from "@/api";
import { toast } from 'sonner';
import { format } from "date-fns";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const EmployeeReports = () => {
    const [filterType, setFilterType] = useState('all'); // 'all' or 'dateRange'
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    const [loading, setLoading] = useState(true);
    const [financials, setFinancials] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [bookings, setBookings] = useState([]);

    const fetchReportsData = useCallback(async () => {
        setLoading(true);
        try {
            const [finData, txData, bookingData] = await Promise.all([
                api.get('/reports/financials'),
                api.get('/reports/transactions'),
                api.get('/bookings')
            ]);
            setFinancials(finData);
            setTransactions(txData);
            setBookings(bookingData);
        } catch (error) {
            console.error('Failed to fetch reports data:', error);
            toast.error('Failed to load report data.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReportsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'COMPLETED': return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
            case 'ACTIVE': return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>;
            case 'CANCELLED': return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
            case 'APPROVED': return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
            case 'REJECTED': return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
            case 'PENDING': return <Badge variant="secondary">Pending</Badge>;
            case 'VERIFIED': return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Verified</Badge>;
            case 'SUCCESS': return <Badge className="bg-green-100 text-green-800 border-green-200">Success</Badge>;
            case 'FAILED': return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    // --- Export Functions ---
    const exportCSV = (data, filename, headers, rowMapper) => {
        const csvContent = [
            headers.join(','),
            ...data.map(rowMapper)
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        toast.success(`Exported ${filename}`);
    };

    const filteredBookings = useMemo(() => {
        if (filterType === 'all' || !dateFrom || !dateTo) {
            return bookings;
        }
        const from = new Date(dateFrom);
        const to = new Date(dateTo);
        to.setHours(23, 59, 59);
        return bookings.filter(b => {
            const d = new Date(b.startDate);
            return d >= from && d <= to;
        });
    }, [bookings, filterType, dateFrom, dateTo]);

    // Filter transactions by date as well
    const filteredTransactions = useMemo(() => {
        if (filterType === 'all' || !dateFrom || !dateTo) {
            return transactions;
        }
        const from = new Date(dateFrom);
        const to = new Date(dateTo);
        to.setHours(23, 59, 59);
        return transactions.filter(tx => {
            if (!tx.createdAt) return true;
            const d = new Date(tx.createdAt);
            return d >= from && d <= to;
        });
    }, [transactions, filterType, dateFrom, dateTo]);

    // Export functions use filteredBookings instead of bookings
    const handleExportBookingsCSV = () => {
        exportCSV(
            filteredBookings,
            'bookings_report.csv',
            ['ID', 'Customer', 'Car', 'Start Date', 'End Date', 'Status', 'Total Amount'],
            b => [
                b.id,
                b.user?.customerProfile ? `${b.user.customerProfile.firstName} ${b.user.customerProfile.lastName}` : b.user?.email,
                `${b.car?.make || ''} ${b.car?.model || ''}`.trim(),
                b.startDate ? format(new Date(b.startDate), 'yyyy-MM-dd') : '',
                b.endDate ? format(new Date(b.endDate), 'yyyy-MM-dd') : '',
                b.status,
                b.totalAmount
            ].map(v => `"${v}"`).join(',')
        );
    };

    const handleExportVerificationCSV = () => {
        const docReports = filteredBookings.filter(b => ['VERIFIED', 'APPROVED', 'REJECTED'].includes(b.status));
        exportCSV(
            docReports,
            'verification_history.csv',
            ['Booking ID', 'Customer', 'Status', 'Last Updated'],
            b => [
                b.id,
                b.user?.customerProfile ? `${b.user.customerProfile.firstName} ${b.user.customerProfile.lastName}` : b.user?.email,
                b.status,
                b.updatedAt ? format(new Date(b.updatedAt), 'yyyy-MM-dd HH:mm') : ''
            ].map(v => `"${v}"`).join(',')
        );
    };

    const handleExportRevenuePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Teddy Car Rental — Revenue Summary', 105, 20, { align: 'center' });
        doc.setFontSize(10);
        doc.text(`Generated: ${format(new Date(), 'MMMM dd, yyyy')}`, 105, 28, { align: 'center' });

        autoTable(doc, {
            startY: 40,
            head: [['Metric', 'Value']],
            body: [
                ['Total Revenue', `ETB ${Number(financials?.summary?.totalRevenue || 0).toLocaleString()}`],
                ['Total Expenses', `ETB ${Number(financials?.summary?.totalExpenses || 0).toLocaleString()}`],
                ['Net Profit', `ETB ${Number(financials?.summary?.netProfit || 0).toLocaleString()}`],
                ['Profit Margin', `${Number(financials?.summary?.profitMargin || 0).toFixed(1)}%`],
                ['Total Bookings', filteredBookings.length],
                ['Active Rentals', financials?.stats?.activeRentals || 0],
            ],
        });

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 15,
            head: [['TX ID', 'Customer', 'Method', 'Amount', 'Status']],
            body: transactions.slice(0, 20).map(tx => [tx.id, tx.customer, tx.method, `ETB ${Number(tx.amount).toLocaleString()}`, tx.status]),
        });

        doc.save(`revenue_summary_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
        toast.success('Revenue PDF exported!');
    };

    // Build per-car utilization from filtered bookings
    const carUtilization = Object.values(
        filteredBookings.reduce((acc, b) => {
            const id = b.car?.id;
            if (!id) return acc;
            if (!acc[id]) {
                acc[id] = { car: b.car, count: 0, totalRevenue: 0 };
            }
            acc[id].count++;
            acc[id].totalRevenue += Number(b.totalAmount || 0);
            return acc;
        }, {})
    ).sort((a, b) => b.count - a.count);

    const docReports = filteredBookings.filter(b => ['VERIFIED', 'APPROVED', 'REJECTED'].includes(b.status));

    return (
        <EmployeeLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports Dashboard</h1>
                    <p className="text-muted-foreground mt-1">View and export comprehensive reports</p>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="hover:shadow-md transition-shadow border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
                        <FileText className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{loading ? <Loader2 className="animate-spin h-5 w-5" /> : filteredBookings.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Lifetime bookings
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : `ETB ${Number(financials?.summary?.totalRevenue || 0).toLocaleString()}`}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-green-600 dark:text-green-400">
                            From successful payments
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Documents Verified</CardTitle>
                        <CheckCircle className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : docReports.length}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-blue-600 dark:text-blue-400">
                            Processed applications
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Rentals</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : financials?.stats?.activeRentals || 0}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Currently on road
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Filter Controls */}
            <Card className="mb-6 border-border/60">
                <CardHeader>
                    <CardTitle className="text-lg">Filter Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        {/* Filter Type Toggle */}
                        <div className="flex gap-2">
                            <Button
                                variant={filterType === 'all' ? "default" : "outline"}
                                onClick={() => {
                                    setFilterType('all');
                                    setDateFrom(null);
                                    setDateTo(null);
                                }}
                            >
                                All
                            </Button>
                            <Button
                                variant={filterType === 'dateRange' ? "default" : "outline"}
                                onClick={() => setFilterType('dateRange')}
                            >
                                Date Range
                            </Button>
                        </div>

                        {/* Date Range Pickers - shown when Date Range is selected */}
                        {filterType === 'dateRange' && (
                            <>
                                <div className="flex-1">
                                    <label className="text-sm font-medium mb-2 block">From Date</label>
                                    <DatePicker
                                        selected={dateFrom}
                                        onChange={(date) => setDateFrom(date)}
                                        selectsStart
                                        startDate={dateFrom}
                                        endDate={dateTo}
                                        placeholderText="Select start date"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-medium mb-2 block">To Date</label>
                                    <DatePicker
                                        selected={dateTo}
                                        onChange={(date) => setDateTo(date)}
                                        selectsEnd
                                        startDate={dateFrom}
                                        endDate={dateTo}
                                        minDate={dateFrom}
                                        placeholderText="Select end date"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </div>
                            </>
                        )}

                        <div className="flex items-end">
                            <Button
                                disabled={loading || filterType === 'all'}
                                onClick={() => {
                                    toast.success('Filter applied successfully');
                                }}
                            >
                                Apply Filter
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>


            {/* Reports Tabs */}
            <Card className="border-border/60 shadow-sm">
                <Tabs defaultValue="bookings" className="w-full">
                    <div className="p-6 border-b border-border">
                        <TabsList>
                            <TabsTrigger value="bookings">Booking Reports</TabsTrigger>
                            <TabsTrigger value="documents">Document Verification</TabsTrigger>
                            <TabsTrigger value="revenue">Revenue Summary</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="bookings" className="m-0">
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">Detailed Bookings</h3>
                                <p className="text-sm text-muted-foreground">All booking records and their current status</p>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleExportBookingsCSV} disabled={loading}>
                                <Download size={14} className="mr-2" />
                                Export CSV
                            </Button>
                        </div>
                        <ScrollArea className="h-[400px]">
                            <Table>
                                <TableHeader className="bg-muted/40">
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Dates</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Total Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-10">
                                                <Loader2 className="animate-spin inline-block mr-2" />
                                                Loading bookings...
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {!loading && filteredBookings.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                                No bookings found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {filteredBookings.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-mono font-medium text-xs">#{booking.id}</TableCell>
                                            <TableCell>
                                                <div className="font-medium">
                                                    {booking.user?.customerProfile ?
                                                        `${booking.user.customerProfile.firstName} ${booking.user.customerProfile.lastName}` :
                                                        booking.user?.email}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground">
                                                {format(new Date(booking.startDate), 'MMM dd')} - {format(new Date(booking.endDate), 'MMM dd, yyyy')}
                                            </TableCell>
                                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                                            <TableCell className="text-right font-semibold">
                                                ETB {Number(booking.totalAmount).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="documents" className="m-0">
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">Verification History</h3>
                                <p className="text-sm text-muted-foreground">Activity log for document approvals and rejections</p>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleExportVerificationCSV} disabled={loading}>
                                <Download size={14} className="mr-2" />
                                Export CSV
                            </Button>
                        </div>
                        <ScrollArea className="h-[400px]">
                            <Table>
                                <TableHeader className="bg-muted/40">
                                    <TableRow>
                                        <TableHead>Booking ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Resulting Status</TableHead>
                                        <TableHead>Last Updated</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-10">
                                                <Loader2 className="animate-spin inline-block mr-2" />
                                                Loading history...
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {!loading && docReports.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                                                No verification activity recorded.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {docReports.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-mono font-medium text-xs">#{booking.id}</TableCell>
                                            <TableCell className="font-medium">
                                                {booking.user?.customerProfile ?
                                                    `${booking.user.customerProfile.firstName} ${booking.user.customerProfile.lastName}` :
                                                    booking.user?.email}
                                            </TableCell>
                                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                                            <TableCell className="text-xs text-muted-foreground">
                                                {format(new Date(booking.updatedAt), 'MMM dd, yyyy HH:mm')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="revenue" className="p-6">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg">Revenue Summary</h3>
                                <Button variant="outline" size="sm" onClick={handleExportRevenuePDF} disabled={loading}>
                                    <Download size={14} className="mr-2" />
                                    Export PDF
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="bg-muted/30">
                                    <CardHeader>
                                        <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-3xl font-bold text-primary">
                                            {loading ? '...' : `ETB ${Number(financials?.summary?.totalRevenue || 0).toLocaleString()}`}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-2">Successful payments</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-muted/30">
                                    <CardHeader>
                                        <CardTitle className="text-sm text-muted-foreground">Total Expenses</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-3xl font-bold text-orange-600">
                                            {loading ? '...' : `ETB ${Number(financials?.summary?.totalExpenses || 0).toLocaleString()}`}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-2">Maintenance costs</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-muted/30">
                                    <CardHeader>
                                        <CardTitle className="text-sm text-muted-foreground">Net Profit</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-3xl font-bold text-green-600">
                                            {loading ? '...' : `ETB ${Number(financials?.summary?.netProfit || 0).toLocaleString()}`}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            Margin: {loading ? '...' : Number(financials?.summary?.profitMargin || 0).toFixed(1)}%
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="font-semibold mb-4">Recent Transactions</h4>
                                <ScrollArea className="h-[300px]">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>TX ID</TableHead>
                                                <TableHead>Customer</TableHead>
                                                <TableHead>Method</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {loading && (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center py-4">Loading transactions...</TableCell>
                                                </TableRow>
                                            )}
                                            {!loading && filteredTransactions.length === 0 && (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center py-4">No transactions found.</TableCell>
                                                </TableRow>
                                            )}
                                            {filteredTransactions.map(tx => (
                                                <TableRow key={tx.id}>
                                                    <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                                                    <TableCell className="text-sm">{tx.customer}</TableCell>
                                                    <TableCell className="text-xs">{tx.method}</TableCell>
                                                    <TableCell className="text-sm font-semibold">ETB {Number(tx.amount).toLocaleString()}</TableCell>
                                                    <TableCell>{getStatusBadge(tx.status)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                            </div>
                        </div>
                    </TabsContent>

                </Tabs>
            </Card>
        </EmployeeLayout>
    );
};

export default EmployeeReports;
