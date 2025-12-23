/**
 * FitChef.pro - Header
 * 
 * Cabeçalho com busca, notificações e perfil do usuário.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { Bell, Moon, Search, User } from 'lucide-react';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
    return (
        <header className="h-16 bg-dark-900/50 backdrop-blur-md border-b border-dark-800 flex items-center justify-between px-6 sticky top-0 z-40">
            {/* Título da Página */}
            <div>
                <h1 className="text-xl font-semibold text-white">{title}</h1>
                {subtitle && (
                    <p className="text-sm text-dark-400">{subtitle}</p>
                )}
            </div>

            {/* Ações */}
            <div className="flex items-center gap-3">
                {/* Busca */}
                <div className="relative hidden md:block">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
                    <input
                        type="text"
                        placeholder="Buscar cliente..."
                        className="w-64 bg-dark-800/50 border border-dark-700 rounded-xl pl-10 pr-4 py-2 text-sm text-dark-200 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                    />
                </div>

                {/* Separador */}
                <div className="divider-vertical h-8 mx-2" />

                {/* Modo Escuro */}
                <button className="btn-icon">
                    <Moon size={18} />
                </button>

                {/* Notificações */}
                <button className="btn-icon relative">
                    <Bell size={18} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                        3
                    </span>
                </button>

                {/* Perfil */}
                <button className="flex items-center gap-3 ml-2 p-2 rounded-xl hover:bg-dark-800/50 transition-all">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                        <User size={16} className="text-white" />
                    </div>
                    <div className="hidden lg:block text-left">
                        <p className="text-sm font-medium text-white">João Trainer</p>
                        <p className="text-xs text-dark-500">Personal Trainer</p>
                    </div>
                </button>
            </div>
        </header>
    );
}
