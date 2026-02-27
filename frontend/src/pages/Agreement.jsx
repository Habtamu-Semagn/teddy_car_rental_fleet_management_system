import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, PenTool } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { api } from '@/api';
import { useAuth } from '../context/AuthContext';

const Agreement = () => {
    const { t } = useTranslation();
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
                toast.success(t('booking.agreementSigned'));
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message || t('booking.failedToSaveAgreement'));
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
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t('booking.rentalAgreement')}</h2>
                <p className="mt-3 text-lg text-gray-500">
                    {t('booking.reviewSign')}
                </p>
            </div>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
                {/* Document Header */}
                <div className="px-8 py-5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="text-primary" size={24} />
                        <span className="font-bold text-gray-900 uppercase tracking-wide">{t('booking.standardContract')}</span>
                    </div>
                    <span className="text-xs font-mono text-gray-400">REF-89302-2024</span>
                </div>

                {/* Agreement Text - Contrast: Paper-like feel */}
                <div className="px-8 py-8 h-[400px] overflow-y-auto text-sm text-gray-700 leading-relaxed font-sans bg-white">
                    <h3 className="font-bold text-xl mb-6 text-center underline decoration-primary decoration-2 underline-offset-4">{t('termsPage.title')}</h3>

                    <div className="space-y-4 max-w-3xl mx-auto">
                        <p><strong>{t('termsPage.s1Title')}:</strong> {t('termsPage.s1Desc')}</p>
                        <p><strong>{t('termsPage.s2Title')}:</strong> {t('termsPage.s2Desc')}</p>
                        <p><strong>{t('termsPage.s3Title')}:</strong> {t('termsPage.s3Desc')}</p>
                        <p><strong>{t('termsPage.s4Title')}:</strong> {t('termsPage.s4Desc')}</p>
                        <p><strong>{t('termsPage.s5Title')}:</strong> {t('termsPage.s5Desc')}</p>
                        <p><strong>{t('termsPage.s6Title')}:</strong> {t('termsPage.s6Desc')}</p>
                        <p><strong>{t('termsPage.s7Title')}:</strong> {t('termsPage.s7Desc')}</p>

                        <p className="pt-6 font-bold">Signed this day, <span className="underline">{new Date().toLocaleDateString()}</span>.</p>
                    </div>
                </div>

                {/* Signature Section - Alignment: Grid based */}
                <div className="px-8 py-8 bg-gray-50 border-t border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <label htmlFor="signature" className="block text-sm font-bold text-gray-900 mb-3">
                                {t('booking.digitalSignature')}
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="signature"
                                    className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl shadow-inner focus:ring-4 focus:ring-primary/20 focus:border-primary font-script text-2xl text-gray-800 placeholder-gray-300 outline-none transition-all"
                                    placeholder={t('booking.signHere')}
                                    value={signature}
                                    onChange={(e) => setSignature(e.target.value)}
                                    required
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary p-1 bg-primary/10 rounded">
                                    <PenTool size={20} />
                                </div>
                            </div>
                            <p className="mt-2 text-xs text-gray-400">{t('booking.consentElectronic')}</p>
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
                                    {t('booking.iAgree')}
                                </label>
                                <p className="text-gray-500">{t('booking.confirmAge')}</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={() => navigate(carId ? `/upload-docs?carId=${carId}` : '/upload-docs')} className="w-auto px-8 py-3 rounded-xl">
                                {t('booking.back')}
                            </Button>
                            <Button type="submit" isLoading={loading} disabled={!signature || !agreed} className="w-auto px-8 py-3 rounded-xl font-bold shadow-md">
                                {t('booking.signContinue')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Agreement;
