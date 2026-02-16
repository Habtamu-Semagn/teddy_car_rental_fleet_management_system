import React, { useState, useEffect } from 'react';
import {
    DollarSign, TrendingUp, TrendingDown,
    Calendar, Download, ArrowUpRight, ArrowDownRight,
    PieChart, BarChart3, Wallet, Loader2
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
import { api } from "@/api";

const AdminFinancials = () => {
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalExpenses: 0,
        netProfit: 0,
        profitMargin: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFinancialData = async () => {
            try {
                const [overview, txs] = await Promise.all([
                    api.get('/reports/financials'),
                    api.get('/reports/transactions')
                ]);
                setStats(overview.summary);
                setTransactions(txs);
            } catch (error) {
                console.error('Failed to fetch financial data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFinancialData();
    }, []);


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
                        <div className="text-3xl font-black text-foreground">ETB {stats.totalRevenue.toLocaleString()}</div>
                        <div className="flex items-center gap-1.5 mt-2 text-emerald-600 font-bold text-sm">
                            <TrendingUp size={16} />
                            <span>Live Sync</span>
                            <span className="text-muted-foreground font-normal">from all payments</span>
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
                        <div className="text-3xl font-black text-foreground">ETB {stats.totalExpenses.toLocaleString()}</div>
                        <div className="flex items-center gap-1.5 mt-2 text-red-600 font-bold text-sm">
                            <TrendingDown size={16} />
                            <span>Operational</span>
                            <span className="text-muted-foreground font-normal">maintenance & fuel</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/60 shadow-sm bg-primary/[0.03] border-primary/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-primary uppercase tracking-wider">Net Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-primary">ETB {stats.netProfit.toLocaleString()}</div>
                        <div className="flex items-center gap-1.5 mt-2 text-emerald-600 font-bold text-sm">
                            <ArrowUpRight size={16} />
                            <span>{stats.profitMargin.toFixed(1)}%</span>
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
                    <div className="flex gap-2 items-center">
                        {loading && <Loader2 className="animate-spin text-primary" size={20} />}
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
                        {!loading && transactions.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                                    No transaction history available.
                                </TableCell>
                            </TableRow>
                        )}
                        {transactions.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell className="font-mono text-xs font-bold">{tx.id}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.5 rounded-full ${tx.type === 'Revenue' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                            {tx.type === 'Revenue' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                        </div>
                                        <span className="font-medium text-sm">{tx.customer}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={tx.type === 'Revenue' ? 'default' : 'secondary'} className="text-[10px]">
                                        {tx.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-xs">
                                    {new Date(tx.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-xs text-foreground/80">
                                    <div className="flex items-center gap-2">
                                        <Wallet size={12} className="text-muted-foreground" />
                                        {tx.method}
                                    </div>
                                </TableCell>
                                <TableCell className={`text-right font-black text-sm ${tx.type === 'Revenue' ? 'text-foreground' : 'text-red-600'}`}>
                                    {tx.type === 'Expense' ? '-' : ''}ETB {tx.amount.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge
                                        variant={tx.status === 'SUCCESS' ? 'success' : tx.status === 'PENDING' ? 'warning' : 'destructive'}
                                        className="text-[10px]"
                                    >
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
