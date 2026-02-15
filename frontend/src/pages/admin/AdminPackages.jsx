import React, { useState } from 'react';
import {
    Package, Plus, Edit, Trash2,
    CheckCircle2, Info, DollarSign, Calendar
} from 'lucide-react';

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/admin-layout";

const AdminPackages = () => {
    // Mock Package Data
    const [packages, setPackages] = useState([
        { id: 1, name: 'Daily Rental', price: 1500, period: 'per day', features: ['Standard Insurance', '24/7 Support', 'Free Cancellation'], category: 'Standard' },
        { id: 2, name: 'Weekly Package', price: 9000, period: 'per week', features: ['Premium Insurance', 'Unlimited Mileage', 'Free Delivery'], category: 'Popular' },
        { id: 3, name: 'Monthly Special', price: 32000, period: 'per month', features: ['Full Maintenance', 'Replacement Car', 'Priority Support'], category: 'Long-term' },
        { id: 4, name: 'Corporate Plan', price: 'Custom', period: 'variable', features: ['Dedicated Manager', 'Fleet Discounts', 'Tax Benefits'], category: 'Corporate' },
    ]);

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Rental Packages</h1>
                    <p className="text-muted-foreground mt-1">Configure and manage your rental options and pricing.</p>
                </div>
                <Button className="gap-2 shadow-lg hover:shadow-primary/25">
                    <Plus size={18} />
                    Create New Package
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {packages.map((pkg) => (
                    <Card key={pkg.id} className="flex flex-col border-border/60 hover:shadow-lg transition-all group overflow-hidden">
                        <CardHeader className="relative">
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant={pkg.category === 'Popular' ? 'default' : 'outline'} className="text-[10px] uppercase font-bold tracking-wide">
                                    {pkg.category}
                                </Badge>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                        <Edit size={14} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50">
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            </div>
                            <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-3xl font-black text-primary">
                                    {typeof pkg.price === 'number' ? `ETB ${pkg.price.toLocaleString()}` : pkg.price}
                                </span>
                                <span className="text-sm text-muted-foreground">{pkg.period}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-2">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="bg-muted/30 p-4 border-t border-border/50">
                            <Button variant="outline" className="w-full text-xs h-8 gap-2 bg-background">
                                <Info size={12} /> View Details
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </AdminLayout>
    );
};

export default AdminPackages;
