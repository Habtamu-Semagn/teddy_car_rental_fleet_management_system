import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Upload, FileText, CheckCircle } from 'lucide-react';

const UploadDocs = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState({ idCard: null, license: null });

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setFiles(prev => ({ ...prev, [type]: file }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!files.idCard || !files.license) return;

        setLoading(true);
        // Simulate upload
        setTimeout(() => {
            setLoading(false);
            navigate('/agreement');
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-gray-900">Verify Your Identity</h2>
                <p className="mt-4 text-lg text-gray-600">
                    To ensure safety and compliance, please upload your valid identification documents.
                </p>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* ID Card Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">National ID / Passport</label>
                            <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${files.idCard ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}>
                                <div className="space-y-1 text-center">
                                    {files.idCard ? (
                                        <CheckCircle className="mx-auto h-12 w-12 text-primary" />
                                    ) : (
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    )}
                                    <div className="flex text-sm text-gray-600 justify-center">
                                        <label htmlFor="id-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-opacity-80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary px-2">
                                            <span>{files.idCard ? files.idCard.name : 'Upload a file'}</span>
                                            <input id="id-upload" name="id-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'idCard')} accept="image/*,.pdf" />
                                        </label>
                                    </div>
                                    {!files.idCard && <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>}
                                </div>
                            </div>
                        </div>

                        {/* License Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Driver's License</label>
                            <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${files.license ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}>
                                <div className="space-y-1 text-center">
                                    {files.license ? (
                                        <CheckCircle className="mx-auto h-12 w-12 text-primary" />
                                    ) : (
                                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                    )}
                                    <div className="flex text-sm text-gray-600 justify-center">
                                        <label htmlFor="license-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-opacity-80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary px-2">
                                            <span>{files.license ? files.license.name : 'Upload a file'}</span>
                                            <input id="license-upload" name="license-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'license')} accept="image/*,.pdf" />
                                        </label>
                                    </div>
                                    {!files.license && <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline" onClick={() => navigate('/')} className="w-auto px-8">
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={loading} disabled={!files.idCard || !files.license} className="w-auto px-8">
                                Proceed to Agreement
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadDocs;
