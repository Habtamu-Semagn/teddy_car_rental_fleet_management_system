import React, { useState } from 'react';
import {
    FileText, Download, Calendar, TrendingUp, Users, Car as CarIcon, DollarSign, CheckCircle
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

const EmployeeReports = () => {
    const [dateFrom, setDateFrom] = useState('2024-03-01');
    const [dateTo, setDateTo] = useState('2024-03-20');

    // Mock Data
    const bookingReports = [
        { id: 'BR-10234', customer: 'Abebe Kebede', car: 'Toyota Corolla', date: '2024-03-20', status: 'Completed', revenue: '4,500 ETB' },
        { id: 'BR-10235', customer: 'Sara Tadesse', car: 'Hyundai Elantra', date: '2024-03-19', status: 'Active', revenue: '9,500 ETB' },
        { id: 'BR-10236', customer: 'John Doe', car: 'Toyota Land Cruiser', date: '2024-03-18', status: 'Completed', revenue: '15,000 ETB' },
        { id: 'BR-10237', customer: 'Dawit Mulatu', car: 'Toyota Hilux', date: '2024-03-17', status: 'Cancelled', revenue: '0 ETB' },
    ];

    const documentReports = [
        { id: 'BR-10234', customer: 'Abebe Kebede', verifiedBy: 'Employee User', date: '2024-03-20', status: 'Approved' },
        { id: 'BR-10235', customer: 'Sara Tadesse', verifiedBy: 'Employee User', date: '2024-03-19', status: 'Approved' },
        { id: 'BR-10238', customer: 'Meron Haile', verifiedBy: 'Employee User', date: '2024-03-16', status: 'Rejected' },
    ];

    const carUtilization = [
        { car: 'Toyota Corolla (AA-12345)', bookings: 8, days: 45, revenue: '67,500 ETB', utilization: 75 },
        { car: 'Hyundai Elantra (AA-23456)', bookings: 6, days: 38, revenue: '57,000 ETB', utilization: 63 },
        { car: 'Toyota Land Cruiser (AA-34567)', bookings: 5, days: 30, revenue: '75,000 ETB', utilization: 50 },
        { car: 'Suzuki Dzire (AA-45678)', bookings: 4, days: 22, revenue: '33,000 ETB', utilization: 37 },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">Completed</Badge>;
            case 'Active': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">Active</Badge>;
            case 'Cancelled': return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">Cancelled</Badge>;
            case 'Approved': return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">Approved</Badge>;
            case 'Rejected': return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">Rejected</Badge>;
            default: return <Badge variant="secondary">Unknown</Badge>;
        }
    };

    const handleExport = (type) => {
        console.log(`Exporting ${type} report...`);
        alert(`Exporting ${type} report... (Feature coming soon)`);
    };

    return (
        <EmployeeLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports Dashboard</h1>
                    <p className="text-muted-foreground mt-1">View and export comprehensive reports</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Calendar size={16} className="mr-2" />
                        Date Range
                    </Button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
                        <FileText className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">23</div>
                        <p className="text-xs text-muted-foreground mt-1 text-green-600 dark:text-green-400">
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">232,500 ETB</div>
                        <p className="text-xs text-muted-foreground mt-1 text-green-600 dark:text-green-400">
                            +18% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Documents Verified</CardTitle>
                        <CheckCircle className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-muted-foreground mt-1 text-blue-600 dark:text-blue-400">
                            3 pending review
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Utilization</CardTitle>
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">56%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Fleet average
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Date Range Filter */}
            <Card className="mb-6 border-border/60">
                <CardHeader>
                    <CardTitle className="text-lg">Filter Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="text-sm font-medium mb-2 block">From Date</label>
                            <Input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm font-medium mb-2 block">To Date</label>
                            <Input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                            />
                        </div>
                        <div className="flex items-end">
                            <Button>Apply Filter</Button>
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
                            <TabsTrigger value="utilization">Car Utilization</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="bookings" className="m-0">
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">Booking Reports</h3>
                                <p className="text-sm text-muted-foreground">All booking transactions and their status</p>
                            </div>
                            <Button onClick={() => handleExport('Bookings CSV')}>
                                <Download size={16} className="mr-2" />
                                Export CSV
                            </Button>
                        </div>
                        <ScrollArea className="h-[400px]">
                            <Table>
                                <TableHeader className="bg-muted/40">
                                    <TableRow>
                                        <TableHead>Booking ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Car</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Revenue</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookingReports.map((booking) => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-mono font-medium text-xs">{booking.id}</TableCell>
                                            <TableCell className="font-medium">{booking.customer}</TableCell>
                                            <TableCell>{booking.car}</TableCell>
                                            <TableCell className="text-muted-foreground">{booking.date}</TableCell>
                                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                                            <TableCell className="text-right font-semibold">{booking.revenue}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="documents" className="m-0">
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">Document Verification Reports</h3>
                                <p className="text-sm text-muted-foreground">All document verification activities</p>
                            </div>
                            <Button onClick={() => handleExport('Documents CSV')}>
                                <Download size={16} className="mr-2" />
                                Export CSV
                            </Button>
                        </div>
                        <ScrollArea className="h-[400px]">
                            <Table>
                                <TableHeader className="bg-muted/40">
                                    <TableRow>
                                        <TableHead>Booking ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Verified By</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {documentReports.map((doc) => (
                                        <TableRow key={doc.id}>
                                            <TableCell className="font-mono font-medium text-xs">{doc.id}</TableCell>
                                            <TableCell className="font-medium">{doc.customer}</TableCell>
                                            <TableCell>{doc.verifiedBy}</TableCell>
                                            <TableCell className="text-muted-foreground">{doc.date}</TableCell>
                                            <TableCell>{getStatusBadge(doc.status)}</TableCell>
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
                                <Button onClick={() => handleExport('Revenue PDF')}>
                                    <Download size={16} className="mr-2" />
                                    Export PDF
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="bg-muted/30">
                                    <CardHeader>
                                        <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-3xl font-bold text-primary">232,500 ETB</p>
                                        <p className="text-xs text-muted-foreground mt-2">March 1-20, 2024</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-muted/30">
                                    <CardHeader>
                                        <CardTitle className="text-sm text-muted-foreground">Average Booking Value</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-3xl font-bold text-primary">10,109 ETB</p>
                                        <p className="text-xs text-muted-foreground mt-2">Per booking</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-muted/30">
                                    <CardHeader>
                                        <CardTitle className="text-sm text-muted-foreground">Projected Monthly</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-3xl font-bold text-primary">348,750 ETB</p>
                                        <p className="text-xs text-muted-foreground mt-2">Based on current trend</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="font-semibold mb-4">Revenue by Package Type</h4>
                                <div className="space-y-3">
                                    {[
                                        { type: 'Weekly Package', revenue: 95000, percentage: 41 },
                                        { type: 'Daily Rental', revenue: 67500, percentage: 29 },
                                        { type: 'Weekend Special', revenue: 48000, percentage: 21 },
                                        { type: 'Monthly Business', revenue: 22000, percentage: 9 },
                                    ].map((item) => (
                                        <div key={item.type}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium">{item.type}</span>
                                                <span className="text-muted-foreground">{item.revenue.toLocaleString()} ETB ({item.percentage}%)</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-2">
                                                <div
                                                    className="bg-primary h-2 rounded-full transition-all"
                                                    style={{ width: `${item.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="utilization" className="m-0">
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">Car Utilization Reports</h3>
                                <p className="text-sm text-muted-foreground">Fleet performance and utilization metrics</p>
                            </div>
                            <Button onClick={() => handleExport('Utilization CSV')}>
                                <Download size={16} className="mr-2" />
                                Export CSV
                            </Button>
                        </div>
                        <ScrollArea className="h-[400px]">
                            <Table>
                                <TableHeader className="bg-muted/40">
                                    <TableRow>
                                        <TableHead>Car</TableHead>
                                        <TableHead>Bookings</TableHead>
                                        <TableHead>Days Rented</TableHead>
                                        <TableHead>Revenue</TableHead>
                                        <TableHead>Utilization</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {carUtilization.map((car, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="font-medium">{car.car}</TableCell>
                                            <TableCell>{car.bookings}</TableCell>
                                            <TableCell>{car.days} days</TableCell>
                                            <TableCell className="font-semibold">{car.revenue}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 bg-muted rounded-full h-2">
                                                        <div
                                                            className="bg-primary h-2 rounded-full transition-all"
                                                            style={{ width: `${car.utilization}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-medium">{car.utilization}%</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </Card>
        </EmployeeLayout>
    );
};

export default EmployeeReports;
