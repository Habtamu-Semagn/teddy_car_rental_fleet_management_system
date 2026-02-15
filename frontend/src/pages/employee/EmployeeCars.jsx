import React, { useState } from 'react';
import {
    Car, Eye, Settings, Calendar, Search as SearchIcon
} from 'lucide-react';

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const EmployeeCars = () => {
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Mock Data
    const cars = [
        { id: 'CAR-001', model: 'Toyota Corolla', year: 2021, plate: 'AA-12345', status: 'Available', mileage: '45,000 km', lastService: '2024-02-15', assignedTo: null },
        { id: 'CAR-002', model: 'Hyundai Elantra', year: 2022, plate: 'AA-23456', status: 'Assigned', mileage: '32,000 km', lastService: '2024-03-01', assignedTo: 'John Doe (BR-10236)' },
        { id: 'CAR-003', model: 'Toyota Land Cruiser', year: 2020, plate: 'AA-34567', status: 'Available', mileage: '78,000 km', lastService: '2024-01-20', assignedTo: null },
        { id: 'CAR-004', model: 'Suzuki Dzire', year: 2023, plate: 'AA-45678', status: 'Maintenance', mileage: '15,000 km', lastService: '2024-03-10', assignedTo: null },
        { id: 'CAR-005', model: 'Toyota Hilux', year: 2021, plate: 'AA-56789', status: 'Available', mileage: '52,000 km', lastService: '2024-02-28', assignedTo: null },
        { id: 'CAR-006', model: 'Nissan Patrol', year: 2019, plate: 'AA-67890', status: 'Out of Service', mileage: '95,000 km', lastService: '2024-01-05', assignedTo: null },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Available': return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">Available</Badge>;
            case 'Assigned': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">Assigned</Badge>;
            case 'Maintenance': return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800">Maintenance</Badge>;
            case 'Out of Service': return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">Out of Service</Badge>;
            default: return <Badge variant="secondary">Unknown</Badge>;
        }
    };

    const handleViewDetails = (car) => {
        setSelectedCar(car);
        setDetailsModalOpen(true);
    };

    const filteredCars = cars.filter(car => {
        const matchesSearch = car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.plate.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || car.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const availableCount = cars.filter(c => c.status === 'Available').length;
    const assignedCount = cars.filter(c => c.status === 'Assigned').length;
    const maintenanceCount = cars.filter(c => c.status === 'Maintenance').length;
    const outOfServiceCount = cars.filter(c => c.status === 'Out of Service').length;

    return (
        <EmployeeLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Cars Management</h1>
                    <p className="text-muted-foreground mt-1">Manage vehicle inventory and assignments</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Available Cars</CardTitle>
                        <Car className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{availableCount}</div>
                        <p className="text-xs text-muted-foreground mt-1 text-green-600 dark:text-green-400">
                            Ready to assign
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Assigned Cars</CardTitle>
                        <Car className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{assignedCount}</div>
                        <p className="text-xs text-muted-foreground mt-1 text-blue-600 dark:text-blue-400">
                            Currently in use
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">In Maintenance</CardTitle>
                        <Settings className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{maintenanceCount}</div>
                        <p className="text-xs text-muted-foreground mt-1 text-yellow-600 dark:text-yellow-400">
                            Under service
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-border/60">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Out of Service</CardTitle>
                        <Settings className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{outOfServiceCount}</div>
                        <p className="text-xs text-muted-foreground mt-1 text-red-600 dark:text-red-400">
                            Not operational
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content with Tabs */}
            <Card className="border-border/60 shadow-sm">
                <Tabs defaultValue="list" className="w-full">
                    <div className="p-6 border-b border-border">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <TabsList>
                                <TabsTrigger value="list">List View</TabsTrigger>
                                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                            </TabsList>
                            <div className="flex gap-2 w-full md:w-auto">
                                <div className="relative flex-1 md:w-64">
                                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input
                                        placeholder="Search cars..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="Available">Available</SelectItem>
                                        <SelectItem value="Assigned">Assigned</SelectItem>
                                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                                        <SelectItem value="Out of Service">Out of Service</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <TabsContent value="list" className="m-0">
                        <ScrollArea className="h-[500px]">
                            <Table>
                                <TableHeader className="bg-muted/40">
                                    <TableRow>
                                        <TableHead className="w-[100px]">ID</TableHead>
                                        <TableHead>Model</TableHead>
                                        <TableHead>Year</TableHead>
                                        <TableHead>Plate</TableHead>
                                        <TableHead>Mileage</TableHead>
                                        <TableHead>Last Service</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCars.map((car) => (
                                        <TableRow key={car.id}>
                                            <TableCell className="font-mono font-medium text-xs">{car.id}</TableCell>
                                            <TableCell className="font-medium">{car.model}</TableCell>
                                            <TableCell>{car.year}</TableCell>
                                            <TableCell className="font-mono text-xs">{car.plate}</TableCell>
                                            <TableCell className="text-muted-foreground">{car.mileage}</TableCell>
                                            <TableCell className="text-muted-foreground">{car.lastService}</TableCell>
                                            <TableCell>{getStatusBadge(car.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                    onClick={() => handleViewDetails(car)}
                                                >
                                                    <Eye size={16} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="calendar" className="p-6">
                        <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-border rounded-lg">
                            <div className="text-center">
                                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
                                <p className="text-muted-foreground">Car availability calendar coming soon</p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="assignments" className="p-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Current Assignments</h3>
                            {cars.filter(c => c.status === 'Assigned').map((car) => (
                                <Card key={car.id} className="p-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{car.model} ({car.plate})</p>
                                            <p className="text-sm text-muted-foreground">Assigned to: {car.assignedTo}</p>
                                        </div>
                                        <Button variant="outline" size="sm">View Details</Button>
                                    </div>
                                </Card>
                            ))}
                            {cars.filter(c => c.status === 'Assigned').length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    No cars currently assigned
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </Card>

            {/* Car Details Modal */}
            <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Car Details - {selectedCar?.id}</DialogTitle>
                        <DialogDescription>
                            Complete information about {selectedCar?.model}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Model</p>
                                <p className="text-sm font-semibold">{selectedCar?.model}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Year</p>
                                <p className="text-sm font-semibold">{selectedCar?.year}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Plate Number</p>
                                <p className="text-sm font-semibold font-mono">{selectedCar?.plate}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                {selectedCar && getStatusBadge(selectedCar.status)}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Mileage</p>
                                <p className="text-sm font-semibold">{selectedCar?.mileage}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Last Service</p>
                                <p className="text-sm font-semibold">{selectedCar?.lastService}</p>
                            </div>
                        </div>
                        {selectedCar?.assignedTo && (
                            <div className="pt-4 border-t">
                                <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
                                <p className="text-sm font-semibold">{selectedCar.assignedTo}</p>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDetailsModalOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </EmployeeLayout>
    );
};

export default EmployeeCars;
