/**
 * FitChef.pro - Layout Principal
 * 
 * Estrutura de layout com Sidebar e área de conteúdo.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { ReactNode } from 'react';
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
    return (
        <div className="min-h-screen bg-dark-950 pattern-grid">
            {/* Sidebar */}
            <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

            {/* Main Content */}
            <main className="ml-64">
                <Header title={pageTitle} subtitle={pageSubtitle} />

                {/* Page Content */}
                <div className="p-6 animate-in">
                    {children}
                </div>
            </main>
        </div>
    );
}
