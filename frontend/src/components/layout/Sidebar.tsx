/**
 * FitChef.pro - Sidebar
 * 
 * Componente de navegação lateral com menu e branding.
 * Design: Cyber-Fitness com ícones Lucide.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import {
    ChefHat,
    FileText,
    LayoutDashboard,
    Settings,
    Sparkles,
    UserPlus
} from 'lucide-react';

interface SidebarProps {
    currentPage: string;
    onNavigate: (page: string) => void;
}

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'new-client', label: 'Novo Cliente', icon: <UserPlus size={20} /> },
    { id: 'my-plans', label: 'Meus Planos', icon: <FileText size={20} /> },
    { id: 'settings', label: 'Configurações', icon: <Settings size={20} /> },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-900/80 backdrop-blur-xl border-r border-dark-800 flex flex-col z-50">
            {/* Logo */}
            <div className="p-6 border-b border-dark-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-glow">
                        <ChefHat size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-white">
                            Fit<span className="text-emerald-400">Chef</span>
                        </h1>
                        <p className="text-xs text-dark-500">.pro</p>
                    </div>
                </div>
            </div>

            {/* Navegação Principal */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={
                            currentPage === item.id
                                ? 'sidebar-link-active w-full'
                                : 'sidebar-link w-full'
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Seção Pro/Upgrade */}
            <div className="p-4 border-t border-dark-800">
                <div className="glass-card p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={16} className="text-emerald-400" />
                        <span className="text-sm font-semibold text-emerald-400">Pro Edition</span>
                    </div>
                    <p className="text-xs text-dark-400 mb-3">
                        Integração com IA avançada e templates ilimitados
                    </p>
                    <button className="btn-primary w-full text-sm py-2">
                        Upgrade
                    </button>
                </div>
            </div>

            {/* Versão */}
            <div className="p-4 text-center text-xs text-dark-600">
                v1.0.0 MVP
            </div>
        </aside>
    );
}
