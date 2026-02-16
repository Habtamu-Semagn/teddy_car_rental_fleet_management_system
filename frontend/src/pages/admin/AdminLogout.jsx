import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';

const AdminLogout = () => {
    const { logout } = useAuth();

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-6">
                    <LogOut className="h-8 w-8 text-red-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Logged Out</h2>
                <p className="text-gray-500 mb-8">
                    You have been logged out of the Employee Portal.
                </p>

                <div className="space-y-4">
                    <Link to="/admin/login" className="block">
                        <Button>Login Again</Button>
                    </Link>
                    <Link to="/" className="block">
                        <Button variant="outline">Go to Public Site</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogout;
