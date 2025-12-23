/**
 * FitChef.pro - Página Meus Planos
 * 
 * Lista de planos alimentares gerados anteriormente.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { Calendar, Download, Eye, FileText, Filter, Flame, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

// Dados mock de planos salvos
const savedPlans = [
    {
        id: 1,
        clientName: 'Maria Santos',
        goal: 'Perda de Gordura',
        calories: 1800,
        createdAt: '2024-01-15',
        dietType: 'Onívoro'
    },
    {
        id: 2,
        clientName: 'João Oliveira',
        goal: 'Ganho de Massa',
        calories: 2800,
        createdAt: '2024-01-14',
        dietType: 'Onívoro'
    },
    {
        id: 3,
        clientName: 'Ana Costa',
        goal: 'Manutenção',
        calories: 2200,
        createdAt: '2024-01-12',
        dietType: 'Vegetariano'
    },
    {
        id: 4,
        clientName: 'Pedro Lima',
        goal: 'Perda de Gordura',
        calories: 1650,
        createdAt: '2024-01-10',
        dietType: 'Keto'
    },
    {
        id: 5,
        clientName: 'Carla Mendes',
        goal: 'Ganho de Massa',
        calories: 2400,
        createdAt: '2024-01-08',
        dietType: 'Onívoro'
    }
];

export default function MyPlans() {
    return (
        <div className="space-y-6">
            {/* Header com Filtros */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Meus Planos</h2>
                    <p className="text-dark-400">Gerencie os planos alimentares criados</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
                        <input
                            type="text"
                            placeholder="Buscar por cliente..."
                            className="w-64 bg-dark-800/50 border border-dark-700 rounded-xl pl-10 pr-4 py-2 text-sm text-dark-200 placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                        />
                    </div>

                    {/* Filter */}
                    <Button variant="secondary" icon={<Filter size={18} />}>
                        Filtrar
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                        <FileText size={24} className="text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">{savedPlans.length}</p>
                        <p className="text-sm text-dark-400">Planos Salvos</p>
                    </div>
                </Card>

                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <Calendar size={24} className="text-blue-400" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">12</p>
                        <p className="text-sm text-dark-400">Este Mês</p>
                    </div>
                </Card>

                <Card className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                        <Flame size={24} className="text-amber-400" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">2.150</p>
                        <p className="text-sm text-dark-400">Média Calórica</p>
                    </div>
                </Card>
            </div>

            {/* Plans Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-dark-800">
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-400">Cliente</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-400">Objetivo</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-400">Dieta</th>
                                <th className="text-center py-4 px-4 text-sm font-semibold text-dark-400">Calorias</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-400">Data</th>
                                <th className="text-right py-4 px-4 text-sm font-semibold text-dark-400">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {savedPlans.map((plan) => (
                                <tr
                                    key={plan.id}
                                    className="border-b border-dark-800/50 hover:bg-dark-800/30 transition-colors"
                                >
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-semibold">
                                                {plan.clientName.charAt(0)}
                                            </div>
                                            <span className="font-medium text-white">{plan.clientName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${plan.goal === 'Perda de Gordura'
                                                ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                                                : plan.goal === 'Ganho de Massa'
                                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                                    : 'bg-green-500/10 text-green-400 border border-green-500/30'
                                            }
                    `}>
                                            {plan.goal}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-dark-300">{plan.dietType}</td>
                                    <td className="py-4 px-4 text-center">
                                        <span className="text-emerald-400 font-semibold">{plan.calories}</span>
                                        <span className="text-dark-500 text-sm"> kcal</span>
                                    </td>
                                    <td className="py-4 px-4 text-dark-400">
                                        {new Date(plan.createdAt).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="btn-icon">
                                                <Eye size={16} />
                                            </button>
                                            <button className="btn-icon">
                                                <Download size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-dark-500">
                    Mostrando {savedPlans.length} de {savedPlans.length} planos
                </p>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" disabled>Anterior</Button>
                    <Button variant="ghost" size="sm" disabled>Próximo</Button>
                </div>
            </div>
        </div>
    );
}
