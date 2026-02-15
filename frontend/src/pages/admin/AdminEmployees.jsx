import React, { useState } from 'react';
import {
    Users, Plus, Search, Mail, Phone,
    ShieldCheck, UserPlus, MoreHorizontal,
    UserCheck, UserX, Edit
} from 'lucide-react';

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdminLayout from "@/components/admin-layout";

const AdminEmployees = () => {
    // Mock Employee Data
    const [employees, setEmployees] = useState([
        { id: 1, name: 'Abebe Kebede', role: 'Staff', email: 'abebe@teddy.com', phone: '+251 911 234 567', status: 'Active', initials: 'AK' },
        { id: 2, name: 'Sara Tadesse', role: 'Manager', email: 'sara@teddy.com', phone: '+251 922 345 678', status: 'Active', initials: 'ST' },
        { id: 3, name: 'John Wilson', role: 'Staff', email: 'john@teddy.com', phone: '+251 933 456 789', status: 'Inactive', initials: 'JW' },
        { id: 4, name: 'Mulugeta Dawit', role: 'Admin', email: 'mulu@teddy.com', phone: '+251 944 567 890', status: 'Active', initials: 'MD' },
    ]);

    const getStatusBadge = (status) => {
        return status === 'Active' ? (
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 gap-1 font-medium">
                Active
            </Badge>
        ) : (
            <Badge variant="outline" className="text-muted-foreground gap-1 font-medium">
                Inactive
            </Badge>
        );
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Employee Management</h1>
                    <p className="text-muted-foreground mt-1">Oversee staff accounts, roles, and access.</p>
                </div>
                <Button className="gap-2 shadow-lg hover:shadow-primary/25">
                    <UserPlus size={18} />
                    Add Staff Member
                </Button>
            </div>

            <Card className="border-border/60 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border bg-card flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input placeholder="Search employees by name or email..." className="pl-10 h-10" />
                    </div>
                </div>
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead>Staff Member</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Contact Info</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow key={emp.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-primary/10">
                                            <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                                                {emp.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm">{emp.name}</span>
                                            <span className="text-xs text-muted-foreground">ID: EMP-{1000 + emp.id}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5">
                                        <ShieldCheck size={14} className={emp.role === 'Admin' ? 'text-primary' : 'text-muted-foreground'} />
                                        <span className="text-sm">{emp.role}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Mail size={12} /> {emp.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Phone size={12} /> {emp.phone}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(emp.status)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal size={16} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="gap-2">
                                                <Edit size={14} /> Edit Profile
                                            </DropdownMenuItem>
                                            {emp.status === 'Active' ? (
                                                <DropdownMenuItem className="gap-2 text-red-600">
                                                    <UserX size={14} /> Deactivate Account
                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem className="gap-2 text-emerald-600">
                                                    <UserCheck size={14} /> Activate Account
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="gap-2">
                                                <ShieldCheck size={14} /> Change Role
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </AdminLayout>
    );
};

export default AdminEmployees;
