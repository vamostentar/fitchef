/**
 * FitChef.pro - Página Novo Cliente
 * 
 * Página que contém o wizard de criação de plano alimentar
 * e exibe o resultado gerado.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { ArrowLeft, Calendar, Check, Flame, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import PDFRenderer from '../components/pdf/PDFRenderer';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import MealPlanWizard from '../components/wizard/MealPlanWizard';
import type { DayPlan, Meal, MealPlan } from '../types';
import { mealTypeLabels } from '../types';

interface NewClientProps {
    onNavigate: (page: string) => void;
}

export default function NewClient({ onNavigate }: NewClientProps) {
    const [generatedPlan, setGeneratedPlan] = useState<MealPlan | null>(null);
    const [selectedDay, setSelectedDay] = useState(0);

    const handlePlanComplete = (mealPlan: MealPlan) => {
        setGeneratedPlan(mealPlan);
    };

    const handleNewPlan = () => {
        setGeneratedPlan(null);
        setSelectedDay(0);
    };

    // Se ainda não gerou o plano, mostrar o wizard
    if (!generatedPlan) {
        return <MealPlanWizard onComplete={handlePlanComplete} />;
    }

    // Exibir o plano gerado
    const currentDay = generatedPlan.schedule[selectedDay];

    return (
        <div className="space-y-6 animate-in">
            {/* Success Header */}
            <Card className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 border-emerald-500/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                            <Check size={28} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                Plano Gerado com Sucesso!
                            </h2>
                            <p className="text-dark-400">
                                Plano alimentar para <span className="text-emerald-400 font-medium">{generatedPlan.clientName}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <PDFRenderer mealPlan={generatedPlan} />
                        <Button variant="secondary" onClick={handleNewPlan}>
                            Novo Plano
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="text-center">
                    <Flame size={24} className="text-orange-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{generatedPlan.targetCalories}</p>
                    <p className="text-xs text-dark-500">Kcal/dia</p>
                </Card>
                <Card className="text-center">
                    <span className="text-2xl mb-2 block">🥩</span>
                    <p className="text-2xl font-bold text-white">{generatedPlan.weeklySummary.totalProteinAvg}g</p>
                    <p className="text-xs text-dark-500">Proteína</p>
                </Card>
                <Card className="text-center">
                    <span className="text-2xl mb-2 block">🍚</span>
                    <p className="text-2xl font-bold text-white">{generatedPlan.weeklySummary.totalCarbsAvg}g</p>
                    <p className="text-xs text-dark-500">Carboidratos</p>
                </Card>
                <Card className="text-center">
                    <span className="text-2xl mb-2 block">🥑</span>
                    <p className="text-2xl font-bold text-white">{generatedPlan.weeklySummary.totalFatAvg}g</p>
                    <p className="text-xs text-dark-500">Gorduras</p>
                </Card>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Day Selector & Meals */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Day Tabs */}
                    <Card padding="sm">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            <Calendar size={18} className="text-emerald-400 flex-shrink-0" />
                            {generatedPlan.schedule.map((day: DayPlan, index: number) => (
                                <button
                                    key={day.day}
                                    onClick={() => setSelectedDay(index)}
                                    className={`
                    px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
                    ${selectedDay === index
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-dark-800/50 text-dark-400 hover:text-white hover:bg-dark-700/50'
                                        }
                  `}
                                >
                                    {day.day.split('-')[0]}
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Meals for Selected Day */}
                    <Card>
                        <h3 className="text-lg font-semibold text-white mb-4">{currentDay.day}</h3>
                        <div className="space-y-4">
                            {currentDay.meals.map((meal: Meal, index: number) => (
                                <div
                                    key={index}
                                    className="p-4 bg-dark-800/30 rounded-xl hover:bg-dark-800/50 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                                                {mealTypeLabels[meal.type]}
                                            </span>
                                            <h4 className="text-white font-medium mt-1">{meal.name}</h4>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-emerald-400">{meal.calories}</p>
                                            <p className="text-xs text-dark-500">kcal</p>
                                        </div>
                                    </div>

                                    {/* Macros */}
                                    <div className="flex gap-4 mb-3 text-sm">
                                        <span className="text-dark-400">
                                            P: <span className="text-white">{meal.protein}g</span>
                                        </span>
                                        <span className="text-dark-400">
                                            C: <span className="text-white">{meal.carbs}g</span>
                                        </span>
                                        <span className="text-dark-400">
                                            G: <span className="text-white">{meal.fats}g</span>
                                        </span>
                                    </div>

                                    {/* Ingredients */}
                                    <div className="mb-3">
                                        <p className="text-xs text-dark-500 mb-1">Ingredientes:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {meal.ingredients.map((ing, i) => (
                                                <span key={i} className="text-xs bg-dark-700/50 px-2 py-1 rounded text-dark-300">
                                                    {ing}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Recipe */}
                                    <p className="text-sm text-dark-400 italic">
                                        📝 {meal.recipe}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Shopping List */}
                <Card>
                    <div className="flex items-center gap-2 mb-4">
                        <ShoppingCart size={20} className="text-emerald-400" />
                        <h3 className="text-lg font-semibold text-white">Lista de Compras</h3>
                    </div>

                    <div className="space-y-4">
                        {Object.entries(generatedPlan.shoppingList).map(([category, items]) => (
                            <div key={category}>
                                <h4 className="text-sm font-semibold text-emerald-400 mb-2">{category}</h4>
                                <ul className="space-y-1">
                                    {(items as string[]).map((item: string, index: number) => (
                                        <li
                                            key={index}
                                            className="text-sm text-dark-300 flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 bg-dark-600 rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={() => onNavigate('dashboard')}
                icon={<ArrowLeft size={18} />}
            >
                Voltar ao Dashboard
            </Button>
        </div>
    );
}
