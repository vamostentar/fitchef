/**
 * FitChef.pro - Dashboard
 * 
 * Página inicial com visão geral e estatísticas.
 * Design "Command Center" para o Personal Trainer.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import {
    Activity,
    ArrowRight,
    Calendar,
    FileText,
    Flame,
    Sparkles,
    TrendingUp,
    Users
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface DashboardProps {
    onNavigate: (page: string) => void;
}

// Dados mock para demonstração
const stats = [
    {
        label: 'Clientes Ativos',
        value: '24',
        change: '+3 este mês',
        icon: <Users size={24} />,
        color: 'emerald'
    },
    {
        label: 'Planos Gerados',
        value: '156',
        change: '+12 esta semana',
        icon: <FileText size={24} />,
        color: 'blue'
    },
    {
        label: 'Taxa de Adesão',
        value: '87%',
        change: '+5% vs mês anterior',
        icon: <TrendingUp size={24} />,
        color: 'amber'
    },
    {
        label: 'Consultas Hoje',
        value: '5',
        change: '2 pendentes',
        icon: <Calendar size={24} />,
        color: 'purple'
    }
];

const recentClients = [
    { name: 'Maria Santos', goal: 'Perda de Gordura', calories: 1800, date: 'Hoje' },
    { name: 'João Oliveira', goal: 'Ganho de Massa', calories: 2800, date: 'Ontem' },
    { name: 'Ana Costa', goal: 'Manutenção', calories: 2200, date: '2 dias atrás' },
    { name: 'Pedro Lima', goal: 'Perda de Gordura', calories: 1650, date: '3 dias atrás' }
];

const colorClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-400',
    blue: 'bg-blue-500/10 text-blue-400',
    amber: 'bg-amber-500/10 text-amber-400',
    purple: 'bg-purple-500/10 text-purple-400'
};

export default function Dashboard({ onNavigate }: DashboardProps) {
    return (
        <div className="space-y-6">
            {/* Hero Banner */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-dark-900/50 to-dark-900/50 border-emerald-500/20">
                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Bem-vindo de volta! 👋
                        </h2>
                        <p className="text-dark-400 mb-4 max-w-md">
                            Crie planos alimentares personalizados em segundos usando IA e
                            impressione seus clientes com resultados profissionais.
                        </p>
                        <Button
                            onClick={() => onNavigate('new-client')}
                            icon={<Sparkles size={18} />}
                        >
                            Criar Novo Plano
                        </Button>
                    </div>

                    {/* Decorative element */}
                    <div className="hidden lg:block">
                        <div className="w-48 h-48 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-full blur-3xl" />
                            <div className="absolute inset-4 bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 rounded-full" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Flame size={64} className="text-emerald-500/80" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background pattern */}
                <div className="absolute inset-0 pattern-grid opacity-30" />
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} hover className="group">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                                {stat.icon}
                            </div>
                            <Activity size={16} className="text-dark-600 group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-sm text-dark-400">{stat.label}</p>
                        <p className="text-xs text-emerald-400 mt-2">{stat.change}</p>
                    </Card>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Clients */}
                <Card className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Clientes Recentes</h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onNavigate('my-plans')}
                            icon={<ArrowRight size={16} />}
                            iconPosition="right"
                        >
                            Ver todos
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {recentClients.map((client, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-dark-800/30 rounded-xl hover:bg-dark-800/50 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-semibold">
                                        {client.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                                            {client.name}
                                        </p>
                                        <p className="text-sm text-dark-500">{client.goal}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-emerald-400">{client.calories} kcal</p>
                                    <p className="text-xs text-dark-500">{client.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <h3 className="text-lg font-semibold text-white mb-6">Ações Rápidas</h3>

                    <div className="space-y-3">
                        <button
                            onClick={() => onNavigate('new-client')}
                            className="w-full p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/20 transition-all flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                                <Sparkles size={20} className="text-emerald-400" />
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-emerald-400">Novo Plano com IA</p>
                                <p className="text-xs text-dark-500">Gerar plano alimentar</p>
                            </div>
                        </button>

                        <button
                            onClick={() => onNavigate('my-plans')}
                            className="w-full p-4 bg-dark-800/30 border border-dark-700 rounded-xl hover:bg-dark-800/50 hover:border-dark-600 transition-all flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 bg-dark-700/50 rounded-xl flex items-center justify-center group-hover:bg-dark-700 transition-colors">
                                <FileText size={20} className="text-dark-400 group-hover:text-white transition-colors" />
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-white">Meus Planos</p>
                                <p className="text-xs text-dark-500">Ver planos salvos</p>
                            </div>
                        </button>

                        <button
                            onClick={() => onNavigate('settings')}
                            className="w-full p-4 bg-dark-800/30 border border-dark-700 rounded-xl hover:bg-dark-800/50 hover:border-dark-600 transition-all flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 bg-dark-700/50 rounded-xl flex items-center justify-center group-hover:bg-dark-700 transition-colors">
                                <Users size={20} className="text-dark-400 group-hover:text-white transition-colors" />
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-white">Gerenciar Clientes</p>
                                <p className="text-xs text-dark-500">Base de clientes</p>
                            </div>
                        </button>
                    </div>

                    {/* Pro Tip */}
                    <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                        <p className="text-xs font-semibold text-amber-400 mb-1">💡 Dica Pro</p>
                        <p className="text-xs text-dark-400">
                            Use o cálculo automático de calorias baseado em Harris-Benedict
                            para resultados mais precisos.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
