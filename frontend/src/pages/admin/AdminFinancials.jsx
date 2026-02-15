import React from 'react';
import {
    DollarSign, TrendingUp, TrendingDown,
    Calendar, Download, ArrowUpRight, ArrowDownRight,
    PieChart, BarChart3, Wallet
} from 'lucide-react';

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

const AdminFinancials = () => {
    // Mock Transaction Data
    const transactions = [
        { id: 'TX-1001', customer: 'Abebe Kebede', amount: 4500, status: 'Completed', date: '2024-03-20', method: 'CBE Birr', type: 'Revenue' },
        { id: 'TX-1002', customer: 'Sara Tadesse', amount: 18000, status: 'Completed', date: '2024-03-19', method: 'Bank Transfer', type: 'Revenue' },
        { id: 'TX-1003', vendor: 'TotalEnergies', amount: 5000, status: 'Completed', date: '2024-03-18', method: 'Cash', type: 'Expense' },
        { id: 'TX-1004', customer: 'John Doe', amount: 12500, status: 'Pending', date: '2024-03-18', method: 'Telebirr', type: 'Revenue' },
        { id: 'TX-1005', vendor: 'City Garage', amount: 2500, status: 'Completed', date: '2024-03-17', method: 'Bank Transfer', type: 'Expense' },
    ];

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Financial Overview</h1>
                    <p className="text-muted-foreground mt-1">Track revenue, expenses, and financial performance.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Calendar size={16} />
                        Current Month
                    </Button>
                    <Button className="gap-2 shadow-lg hover:shadow-primary/25">
                        <Download size={16} />
                        Export Data
                    </Button>
                </div>
            </div>

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="border-border/60 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <DollarSign size={80} />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-foreground">ETB 245,300</div>
                        <div className="flex items-center gap-1.5 mt-2 text-emerald-600 font-bold text-sm">
                            <TrendingUp size={16} />
                            <span>+12.5%</span>
                            <span className="text-muted-foreground font-normal">vs last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/60 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <ArrowDownRight size={80} className="text-red-500" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-foreground">ETB 42,800</div>
                        <div className="flex items-center gap-1.5 mt-2 text-red-600 font-bold text-sm">
                            <TrendingDown size={16} />
                            <span>+4.2%</span>
                            <span className="text-muted-foreground font-normal">vs last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/60 shadow-sm bg-primary/[0.03] border-primary/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-primary uppercase tracking-wider">Net Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-primary">ETB 202,500</div>
                        <div className="flex items-center gap-1.5 mt-2 text-emerald-600 font-bold text-sm">
                            <ArrowUpRight size={16} />
                            <span>82.5%</span>
                            <span className="text-muted-foreground font-normal">profit margin</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="border-border/60 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border bg-card flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg">Transaction History</h3>
                        <p className="text-sm text-muted-foreground">Recent revenue and operating expense entries.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <PieChart size={14} /> Charts
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                            <BarChart3 size={14} /> Summary
                        </Button>
                    </div>
                </div>
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Source/Target</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell className="font-mono text-xs font-bold">{tx.id}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.5 rounded-full ${tx.type === 'Revenue' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                            {tx.type === 'Revenue' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                        </div>
                                        <span className="font-medium">{tx.customer || tx.vendor}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={tx.type === 'Revenue' ? 'default' : 'secondary'} className="text-[10px]">
                                        {tx.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">{tx.date}</TableCell>
                                <TableCell className="text-sm text-foreground/80">
                                    <div className="flex items-center gap-2">
                                        <Wallet size={12} className="text-muted-foreground" />
                                        {tx.method}
                                    </div>
                                </TableCell>
                                <TableCell className={`text-right font-black ${tx.type === 'Revenue' ? 'text-foreground' : 'text-red-600'}`}>
                                    {tx.type === 'Expense' ? '-' : ''}ETB {tx.amount.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={tx.status === 'Completed' ? 'success' : 'outline'} className="text-[10px]">
                                        {tx.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </AdminLayout>
    );
};

export default AdminFinancials;
