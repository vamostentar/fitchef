/**
 * FitChef.pro - Layout Principal Responsivo
 * 
 * Estrutura de layout com Sidebar colapsável para mobile.
 * 
 * @author FitChef Team
 * @version 2.0.0
 */

import { Menu, X } from 'lucide-react';
import { ReactNode, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: ReactNode;
    currentPage: string;
    onNavigate: (page: string) => void;
    pageTitle: string;
    pageSubtitle?: string;
}

export default function Layout({
    children,
    currentPage,
    onNavigate,
    pageTitle,
    pageSubtitle
}: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleNavigate = (page: string) => {
        onNavigate(page);
        setIsSidebarOpen(false); // Fechar sidebar ao navegar (mobile)
    };

    return (
        <div className="min-h-screen bg-dark-950 pattern-grid">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-dark-800 rounded-lg border border-dark-700 text-white hover:bg-dark-700 transition-colors"
                aria-label="Toggle menu"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay para fechar sidebar em mobile */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                currentPage={currentPage}
                onNavigate={handleNavigate}
                isOpen={isSidebarOpen}
            />

            {/* Main Content */}
            <main className="lg:ml-64 min-h-screen">
                <Header title={pageTitle} subtitle={pageSubtitle} />

                {/* Page Content */}
                <div className="p-4 md:p-6 animate-in pt-16 lg:pt-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
