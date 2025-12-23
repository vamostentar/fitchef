/**
 * FitChef.pro - Aplicação Principal
 * 
 * Componente raiz que gerencia navegação e layout.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import MyPlans from './pages/MyPlans';
import NewClient from './pages/NewClient';
import Settings from './pages/Settings';

// Mapeamento de páginas para títulos
const pageTitles: Record<string, { title: string; subtitle?: string }> = {
    'dashboard': { title: 'Dashboard', subtitle: 'Visão geral do seu negócio' },
    'new-client': { title: 'Novo Plano', subtitle: 'Crie um plano alimentar personalizado' },
    'my-plans': { title: 'Meus Planos', subtitle: 'Gerencie planos criados' },
    'settings': { title: 'Configurações', subtitle: 'Personalize sua experiência' }
};

function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');

    const handleNavigate = (page: string) => {
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard onNavigate={handleNavigate} />;
            case 'new-client':
                return <NewClient onNavigate={handleNavigate} />;
            case 'my-plans':
                return <MyPlans />;
            case 'settings':
                return <Settings />;
            default:
                return <Dashboard onNavigate={handleNavigate} />;
        }
    };

    const pageInfo = pageTitles[currentPage] || pageTitles['dashboard'];

    return (
        <Layout
            currentPage={currentPage}
            onNavigate={handleNavigate}
            pageTitle={pageInfo.title}
            pageSubtitle={pageInfo.subtitle}
        >
            {renderPage()}
        </Layout>
    );
}

export default App;
