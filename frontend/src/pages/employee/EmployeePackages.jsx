import React, { useState } from 'react';
import {
    Package, Eye, CheckCircle, Search as SearchIcon, Clock, DollarSign
} from 'lucide-react';

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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

const EmployeePackages = () => {
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState('');

    // Mock Data
    const packages = [
        {
            id: 'PKG-001',
            name: 'Daily Rental',
            type: 'Daily',
            duration: '1 Day',
            price: '1,500 ETB',
            features: ['24-hour rental', 'Basic insurance', '100km included', 'Fuel not included'],
            popularity: 85,
            description: 'Perfect for short trips and daily errands'
        },
        {
            id: 'PKG-002',
            name: 'Weekend Special',
            type: 'Weekend',
            duration: '2-3 Days',
            price: '4,000 ETB',
            features: ['48-72 hour rental', 'Full insurance', '300km included', 'Free GPS'],
            popularity: 92,
            description: 'Ideal for weekend getaways and short trips'
        },
        {
            id: 'PKG-003',
            name: 'Weekly Package',
            type: 'Weekly',
            duration: '7 Days',
            price: '9,500 ETB',
            features: ['7-day rental', 'Comprehensive insurance', '700km included', 'Free GPS & WiFi', '24/7 support'],
            popularity: 78,
            description: 'Best value for week-long rentals'
        },
        {
            id: 'PKG-004',
            name: 'Monthly Business',
            type: 'Monthly',
            duration: '30 Days',
            price: '35,000 ETB',
            features: ['30-day rental', 'Premium insurance', 'Unlimited km', 'Free GPS & WiFi', 'Priority support', 'Free maintenance'],
            popularity: 65,
            description: 'Perfect for business travelers and long-term needs'
        },
        {
            id: 'PKG-005',
            name: 'Corporate Package',
            type: 'Custom',
            duration: 'Flexible',
            price: 'Custom Pricing',
            features: ['Flexible duration', 'Fleet management', 'Dedicated account manager', 'Custom insurance', 'Bulk discounts'],
            popularity: 45,
            description: 'Tailored solutions for corporate clients'
        },
    ];

    const bookings = [
        { id: 'BR-10234', customer: 'Abebe Kebede', status: 'Pending' },
        { id: 'BR-10235', customer: 'Sara Tadesse', status: 'Verified' },
        { id: 'BR-10236', customer: 'John Doe', status: 'Approved' },
    ];

    const getTypeBadge = (type) => {
        switch (type) {
            case 'Daily': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">Daily</Badge>;
            case 'Weekend': return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">Weekend</Badge>;
            case 'Weekly': return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">Weekly</Badge>;
            case 'Monthly': return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800">Monthly</Badge>;
            case 'Custom': return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800">Custom</Badge>;
            default: return <Badge variant="secondary">Unknown</Badge>;
        }
    };

    const handleViewDetails = (pkg) => {
        setSelectedPackage(pkg);
        setDetailsModalOpen(true);
    };

    const handleAssignPackage = (pkg) => {
        setSelectedPackage(pkg);
        setAssignModalOpen(true);
    };

    const confirmAssignment = () => {
        console.log(`Package ${selectedPackage.id} assigned to booking ${selectedBooking}`);
        setAssignModalOpen(false);
        setSelectedBooking('');
    };

    const filteredPackages = packages.filter(pkg => {
        const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === 'all' || pkg.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <EmployeeLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Packages Management</h1>
                    <p className="text-muted-foreground mt-1">Manage rental packages and assignments</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Packages</CardTitle>
                        <Package className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{packages.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Available options
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Most Popular</CardTitle>
                        <CheckCircle className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Weekend Special</div>
                        <p className="text-xs text-muted-foreground mt-1 text-green-600 dark:text-green-400">
                            92% popularity
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Assignments</CardTitle>
                        <Clock className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground mt-1 text-blue-600 dark:text-blue-400">
                            Currently assigned
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search packages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full md:w-[200px]">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekend">Weekend</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Custom">Custom</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                    <Card key={pkg.id} className="hover:shadow-lg transition-all cursor-pointer border-border/60 flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                                    <CardDescription className="mt-1">{pkg.description}</CardDescription>
                                </div>
                                {getTypeBadge(pkg.type)}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            <div className="mb-4">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <DollarSign className="h-5 w-5 text-primary" />
                                    <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                                    <span className="text-sm text-muted-foreground">/ {pkg.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock size={14} />
                                    <span>{pkg.duration}</span>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-2 mb-4 flex-1">
                                <p className="text-sm font-medium">Features:</p>
                                <ul className="space-y-1">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <CheckCircle size={14} className="text-primary mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                    <span>Popularity</span>
                                    <span>{pkg.popularity}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all"
                                        style={{ width: `${pkg.popularity}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => handleViewDetails(pkg)}
                                >
                                    <Eye size={16} className="mr-2" />
                                    Details
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={() => handleAssignPackage(pkg)}
                                >
                                    <CheckCircle size={16} className="mr-2" />
                                    Assign
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Package Details Modal */}
            <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>{selectedPackage?.name}</DialogTitle>
                        <DialogDescription>
                            {selectedPackage?.description}
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[400px]">
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Package ID</p>
                                    <p className="text-sm font-semibold font-mono">{selectedPackage?.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Type</p>
                                    {selectedPackage && getTypeBadge(selectedPackage.type)}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                                    <p className="text-sm font-semibold">{selectedPackage?.duration}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Price</p>
                                    <p className="text-sm font-semibold text-primary">{selectedPackage?.price}</p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <p className="text-sm font-medium mb-3">Features Included:</p>
                                <ul className="space-y-2">
                                    {selectedPackage?.features.map((feature, idx) => (
                                        <li key={idx} className="text-sm flex items-start gap-2">
                                            <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Separator />

                            <div>
                                <p className="text-sm font-medium mb-2">Popularity</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-muted rounded-full h-3">
                                        <div
                                            className="bg-primary h-3 rounded-full transition-all"
                                            style={{ width: `${selectedPackage?.popularity}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-semibold">{selectedPackage?.popularity}%</span>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDetailsModalOpen(false)}>Close</Button>
                        <Button onClick={() => {
                            setDetailsModalOpen(false);
                            handleAssignPackage(selectedPackage);
                        }}>
                            <CheckCircle size={16} className="mr-2" />
                            Assign Package
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Assign Package Modal */}
            <Dialog open={assignModalOpen} onOpenChange={setAssignModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Assign Package - {selectedPackage?.name}</DialogTitle>
                        <DialogDescription>
                            Select a booking to assign this package to
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Select Booking</label>
                            <Select value={selectedBooking} onValueChange={setSelectedBooking}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a booking..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {bookings.map((booking) => (
                                        <SelectItem key={booking.id} value={booking.id}>
                                            {booking.id} - {booking.customer} ({booking.status})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Card className="p-4 bg-muted/30">
                            <p className="text-sm font-medium mb-2">Package Summary:</p>
                            <div className="space-y-1 text-sm">
                                <p><strong>Name:</strong> {selectedPackage?.name}</p>
                                <p><strong>Duration:</strong> {selectedPackage?.duration}</p>
                                <p><strong>Price:</strong> {selectedPackage?.price}</p>
                            </div>
                        </Card>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAssignModalOpen(false)}>Cancel</Button>
                        <Button onClick={confirmAssignment} disabled={!selectedBooking}>
                            <CheckCircle size={16} className="mr-2" />
                            Assign Package
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </EmployeeLayout>
    );
};

export default EmployeePackages;
