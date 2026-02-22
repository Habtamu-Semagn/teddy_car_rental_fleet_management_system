import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, PenTool } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/api';
import { useAuth } from '../context/AuthContext';

const Agreement = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, refreshUser, isAuthenticated, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const [signature, setSignature] = useState('');
    const [agreed, setAgreed] = useState(false);
    const carId = searchParams.get('carId');
    const packageId = searchParams.get('packageId');

    // Skip if already signed
    useEffect(() => {
        if (!authLoading && isAuthenticated && user?.profile?.agreementSigned) {
            if (carId) {
                navigate(`/payment?carId=${carId}`);
            } else if (packageId) {
                navigate(`/payment?packageId=${packageId}`);
            } else {
                navigate('/');
            }
        }
    }, [authLoading, isAuthenticated, user, carId, packageId, navigate]);

    // Unified Agreement: No longer blocks without carId.
    // This allows setup during registration.

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!signature || !agreed) return;

        setLoading(true);
        try {
            // Save agreement to profile
            await api.patch('/auth/profile', {
                agreementSigned: true,
                // Pass existing details to avoid clearing them if upsert logic needs them
                firstName: user?.profile?.firstName,
                lastName: user?.profile?.lastName,
                phoneNumber: user?.profile?.phoneNumber
            });

            // Sync local state
            await refreshUser();

            if (carId) {
                navigate(`/payment?carId=${carId}`);
            } else if (packageId) {
                navigate(`/payment?packageId=${packageId}`);
            } else {
                toast.success('Onboarding complete! You can now book your first car.');
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to save agreement. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Rental Agreement</h2>
                <p className="mt-3 text-lg text-gray-500">
                    Please review and digitally sign the document below.
                </p>
            </div>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
                {/* Document Header */}
                <div className="px-8 py-5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="text-primary" size={24} />
                        <span className="font-bold text-gray-900 uppercase tracking-wide">Standard Rental Contract</span>
                    </div>
                    <span className="text-xs font-mono text-gray-400">REF-89302-2024</span>
                </div>

                {/* Agreement Text - Contrast: Paper-like feel */}
                <div className="px-8 py-8 h-[400px] overflow-y-auto text-sm text-gray-700 leading-relaxed font-serif bg-white">
                    <h3 className="font-bold text-xl mb-6 text-center underline decoration-primary decoration-2 underline-offset-4">TERMS AND CONDITIONS</h3>

                    <div className="space-y-4 max-w-3xl mx-auto">
                        <p><strong>1. PARTIES:</strong> The Renter agrees to rent the Vehicle described above from the Owner for the period and rate specified.</p>
                        <p><strong>2. OWNER PROPERTY:</strong> The Renter acknowledges that the Vehicle is the property of the Owner and that the Renter has received the Vehicle in good mechanical condition.</p>
                        <p><strong>3. RETURN:</strong> The Renter agrees to return the Vehicle to the Owner at the location and on the date and time specified in the Rental Agreement. Be it known strictly that a late return will result in extra charges.</p>
                        <p><strong>4. PAYMENT:</strong> The Renter agrees to pay the Owner the rental rate specified in the Rental Agreement, plus any additional charges incurred.</p>
                        <p><strong>5. USE OF VEHICLE:</strong> The Renter agrees to use the Vehicle only for lawful purposes and in a safe and careful manner.</p>
                        <p><strong>6. AUTHORIZED DRIVERS:</strong> The Renter agrees not to allow any other person to operate the Vehicle unless authorized by the Owner.</p>
                        <p><strong>7. INSURANCE:</strong> The Renter is responsible for the full value of the Vehicle if it is lost, stolen, or damaged during the rental period, unless the Renter has purchased the optional Collision Damage Waiver (CDW).</p>
                        <p><strong>8. INDEMNITY:</strong> The Renter agrees to indemnify and hold the Owner harmless from any and all claims, liabilities, costs, and expenses arising out of the Renter's use or operation of the Vehicle.</p>

                        <p className="pt-6 font-bold">Signed this day, <span className="underline">{new Date().toLocaleDateString()}</span>.</p>
                    </div>
                </div>

                {/* Signature Section - Alignment: Grid based */}
                <div className="px-8 py-8 bg-gray-50 border-t border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <label htmlFor="signature" className="block text-sm font-bold text-gray-900 mb-3">
                                Digital Signature <span className="font-normal text-gray-500">(Type your full name)</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="signature"
                                    className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl shadow-inner focus:ring-4 focus:ring-primary/20 focus:border-primary font-script text-2xl text-gray-800 placeholder-gray-300 outline-none transition-all"
                                    placeholder="Sign here..."
                                    value={signature}
                                    onChange={(e) => setSignature(e.target.value)}
                                    required
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary p-1 bg-primary/10 rounded">
                                    <PenTool size={20} />
                                </div>
                            </div>
                            <p className="mt-2 text-xs text-gray-400">By typing your name, you consent to use an electronic signature.</p>
                        </div>

                        <div className="flex items-start bg-white p-4 rounded-xl border border-gray-200">
                            <div className="flex items-center h-5">
                                <input
                                    id="agree"
                                    name="agree"
                                    type="checkbox"
                                    className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="agree" className="font-medium text-gray-900 cursor-pointer">
                                    I have read and agree to the Terms and Conditions above.
                                </label>
                                <p className="text-gray-500">You confirm that you are at least 18 years old and hold a valid driver's license.</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={() => navigate(carId ? `/upload-docs?carId=${carId}` : '/upload-docs')} className="w-auto px-8 py-3 rounded-xl">
                                Back
                            </Button>
                            <Button type="submit" isLoading={loading} disabled={!signature || !agreed} className="w-auto px-8 py-3 rounded-xl font-bold shadow-md">
                                Sign & Continue
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Agreement;
