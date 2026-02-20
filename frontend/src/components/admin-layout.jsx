import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
    LayoutDashboard, Car, Users, Package, FileText, Menu, Bell, LogOut, Search, User, DollarSign
} from 'lucide-react';

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from 'react';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    // Mock Notifications
    const notifications = [
        { id: 1, type: 'critical', message: 'Fleet maintenance alert: Car AA-12345', time: '10 min ago' },
        { id: 2, type: 'info', message: 'New employee account created: John Wilson', time: '1 hour ago' },
        { id: 3, type: 'success', message: 'Monthly revenue report generated', time: '3 hours ago' },
    ];

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/cars', icon: Car, label: 'Fleet Management' },
        { path: '/admin/employees', icon: Users, label: 'Employee Management' },
        { path: '/admin/packages', icon: Package, label: 'Rental Packages' },
        { path: '/admin/financials', icon: DollarSign, label: 'Financials' },
    ];

    return (
        <div className="min-h-screen bg-background flex font-sans text-foreground">
            {/* Sidebar */}
            <Card className={`${sidebarOpen ? 'w-64' : 'w-20'} border-r border-border transition-all duration-300 fixed h-full z-20 flex flex-col shadow-sm rounded-none`}>
                <div className="h-20 flex items-center justify-center border-b border-border p-2">
                    {sidebarOpen ? (
                        <img src={logo} alt="Teddy Admin" className="w-20 h-20 object-contain" />
                    ) : (
                        <img src={logo} alt="TA" className="h-12 w-12 object-cover rounded" />
                    )}
                </div>

                <ScrollArea className="flex-1">
                    <nav className="mt-6 px-3 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors group ${active
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                >
                                    <Icon size={20} className={active ? 'group-hover:scale-110 transition-transform' : 'group-hover:text-primary transition-colors'} />
                                    {sidebarOpen && <span className="ml-3">{item.label}</span>}
                                </Link>
                            );
                        })}
                    </nav>
                </ScrollArea>

                <Separator />

                <div className="p-4">
                    <Link
                        to="/admin/logout"
                        className="flex items-center px-4 py-3 text-muted-foreground hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        {sidebarOpen && <span className="ml-3 font-medium">Logout</span>}
                    </Link>
                </div>
            </Card>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Header */}
                <Card className="border-b border-border h-16 flex flex-row items-center justify-between px-6 sticky top-0 z-50 rounded-none shadow-md bg-card">
                    {/* Left Section: Menu Toggle + Search */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            <Menu size={20} />
                        </Button>
                        <div className="relative w-96 hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search admin tasks, fleet, or staff..."
                                className="pl-10 bg-secondary/50 border-transparent focus:bg-background focus:border-primary/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Right Section: Notifications + Theme + User Profile */}
                    <div className="flex items-center gap-2">
                        {/* Notifications Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
                                    <Bell size={20} />
                                    <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full ring-2 ring-card"></span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <DropdownMenuLabel>Admin Notifications</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <ScrollArea className="h-64">
                                    {notifications.map((notif) => (
                                        <DropdownMenuItem key={notif.id} className="flex flex-col items-start py-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant={notif.type === 'critical' ? 'destructive' : 'outline'} className="text-[10px] px-1 h-4">
                                                    {notif.type.toUpperCase()}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">{notif.time}</span>
                                            </div>
                                            <span className="text-sm font-medium leading-tight">{notif.message}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </ScrollArea>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        <Separator orientation="vertical" className="h-8 mx-1" />

                        {/* User Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                                    <Avatar className="h-9 w-9 border-2 border-primary/20">
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                            AD
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="text-left hidden lg:block">
                                        <p className="text-sm font-semibold text-foreground leading-none">Admin User</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">Fleet Manager</p>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Admin Profile</DropdownMenuItem>
                                <DropdownMenuItem>Security Settings</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </Card>

                {/* Page Content */}
                <main className="flex-1 p-8 bg-muted/30">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
