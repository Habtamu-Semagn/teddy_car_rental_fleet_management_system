import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Info, Mail, LogIn, UserPlus, Briefcase, User, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Layout = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-end justify-between pb-4">

                    {/* Left Group: Logo & Navigation */}
                    <div className="flex items-end gap-16">
                        {/* Logo Section - Left Bottom */}
                        <Link to="/" className="flex items-center transition-transform hover:scale-105 active:scale-95 duration-200">
                            <img src={logo} alt="Teddy Rental" className="w-24 h-10 object-contain" />
                        </Link>

                        {/* Navigation - Spaced by Proximity */}
                        <nav className="hidden lg:flex items-center gap-10 mb-1">
                            <Link to="/" className="group flex items-center gap-2.5 text-gray-500 hover:text-gray-900 font-semibold transition-all duration-300">
                                <HomeIcon size={18} className="group-hover:scale-110 transition-transform" />
                                <span className="relative">
                                    {t('nav.home')}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                </span>
                            </Link>

                            {isAuthenticated && (
                                <Link to="/my-bookings" className="group flex items-center gap-2.5 text-gray-500 hover:text-gray-900 font-semibold transition-all duration-300">
                                    <Briefcase size={18} className="group-hover:scale-110 transition-transform" />
                                    <span className="relative">
                                        {t('nav.myRentals')}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </Link>
                            )}

                            <Link to="/about" className="group flex items-center gap-2.5 text-gray-500 hover:text-gray-900 font-semibold transition-all duration-300">
                                <Info size={18} className="group-hover:scale-110 transition-transform" />
                                <span className="relative">
                                    {t('nav.about')}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                </span>
                            </Link>
                        </nav>
                    </div>

                    {/* Right Group: Actions */}
                    <div className="flex items-center gap-6 mb-1">
                        <LanguageSwitcher />
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
                                    <LogIn size={18} />
                                    {t('nav.signIn')}
                                </Link>
                                <Link to="/register" className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-300">
                                    <UserPlus size={18} />
                                    {t('nav.signUp')}
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex flex-col items-end mr-2">
                                    <span className="text-sm font-bold text-gray-900">
                                        {user?.customerProfile?.firstName || user?.email?.split('@')[0]}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">
                                        {user?.role}
                                    </span>
                                </div>
                                <div className="h-10 w-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-primary shadow-inner group">
                                    <User size={20} className="group-hover:scale-110 transition-transform" />
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
                                    title="Sign Out"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow bg-gray-50">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <img src={logo} alt="Teddy Rental" className="w-20 h-20 object-contain mb-4" />
                        <p className="text-gray-400">{t('footer.desc')}</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">{t('footer.quickLinks')}</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/" className="hover:text-white">{t('nav.home')}</Link></li>
                            <li><Link to="/about" className="hover:text-white">{t('nav.about')}</Link></li>
                            <li><Link to="/contact" className="hover:text-white">{t('contact.title')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">{t('footer.legal')}</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/terms" className="hover:text-white">{t('footer.terms')}</Link></li>
                            <li><Link to="/privacy" className="hover:text-white">{t('footer.privacy')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">{t('footer.connect')}</h4>
                        <div className="text-gray-400">
                            <p>{t('contact.addressText')}</p>
                            <p>+251 900 000 000</p>
                            <p>info@teddyrental.com</p>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
                    © {new Date().getFullYear()} Teddy Car Rental. {t('footer.rights')}
                </div>
            </footer>
        </div>
    );
};

export default Layout;
