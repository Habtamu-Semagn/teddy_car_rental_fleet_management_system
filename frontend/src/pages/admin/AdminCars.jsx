import React, { useState } from 'react';
import {
    Car, Plus, Search, Filter, Edit, Trash2,
    CheckCircle2, AlertCircle, Clock
} from 'lucide-react';

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AdminLayout from "@/components/admin-layout";

const AdminCars = () => {
    // Mock Fleet Data
    const [cars, setCars] = useState([
        { id: 1, model: 'Toyota Corolla', year: 2021, plate: 'AA-2-B12345', status: 'Available', type: 'Economy', price: 1500 },
        { id: 2, model: 'Hyundai Elantra', year: 2022, plate: 'AA-2-C23456', status: 'Rented', type: 'Economy', price: 1800 },
        { id: 3, model: 'Toyota Land Cruiser', year: 2023, plate: 'AA-2-A34567', status: 'Maintenance', type: 'Luxury', price: 5000 },
        { id: 4, model: 'Suzuki Dzire', year: 2020, plate: 'AA-2-D45678', status: 'Available', type: 'Economy', price: 1200 },
        { id: 5, model: 'Toyota Hilux', year: 2021, plate: 'AA-2-E56789', status: 'Available', type: 'SUV', price: 3500 },
    ]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Available':
                return <Badge variant="success" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 gap-1">
                    <CheckCircle2 size={12} /> Available
                </Badge>;
            case 'Rented':
                return <Badge variant="info" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 gap-1">
                    <Clock size={12} /> Rented
                </Badge>;
            case 'Maintenance':
                return <Badge variant="warning" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200 gap-1">
                    <AlertCircle size={12} /> Maintenance
                </Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Fleet Management</h1>
                    <p className="text-muted-foreground mt-1">Manage your vehicle inventory and status.</p>
                </div>
                <Button className="gap-2 shadow-lg hover:shadow-primary/25">
                    <Plus size={18} />
                    Add New Vehicle
                </Button>
            </div>

            <Card className="border-border/60 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border bg-card flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input placeholder="Search by model or plate number..." className="pl-10 h-10" />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter size={14} /> Filter
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">Reset</Button>
                    </div>
                </div>
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead>Vehicle Model</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Plate Number</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Daily Rate</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cars.map((car) => (
                            <TableRow key={car.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-muted-foreground">
                                            <Car size={20} />
                                        </div>
                                        <span className="font-medium">{car.model}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{car.year}</TableCell>
                                <TableCell className="font-mono text-xs">{car.plate}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-normal">{car.type}</Badge>
                                </TableCell>
                                <TableCell className="font-medium">ETB {car.price}</TableCell>
                                <TableCell>
                                    {getStatusBadge(car.status)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                            <Edit size={16} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                                            <Trash2 size={16} />
                                        </Button>
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

export default AdminCars;
