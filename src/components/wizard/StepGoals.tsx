/**
 * FitChef.pro - Step 2: Objetivos
 * 
 * Segundo passo do wizard - define objetivos de treino
 * e calorias alvo (auto-calculadas ou manuais).
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { Calculator, Flame, Minus, Target, TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ClientData, Goal } from '../../types';
import { goalLabels } from '../../types';
import { calculateAllMetrics, calculateMacros } from '../../utils/calculations';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Slider from '../ui/Slider';

interface StepGoalsProps {
    data: Partial<ClientData>;
    onChange: (data: Partial<ClientData>) => void;
    errors: Record<string, string>;
}

const goals: { id: Goal; label: string; icon: React.ReactNode; description: string }[] = [
    {
        id: 'fat_loss',
        label: goalLabels.fat_loss,
        icon: <TrendingDown size={24} />,
        description: 'Déficit de 500 kcal/dia para perda gradual e saudável'
    },
    {
        id: 'muscle_gain',
        label: goalLabels.muscle_gain,
        icon: <TrendingUp size={24} />,
        description: 'Superávit de 300 kcal/dia para ganho de massa magra'
    },
    {
        id: 'maintenance',
        label: goalLabels.maintenance,
        icon: <Minus size={24} />,
        description: 'Manter o peso atual com balanço energético neutro'
    }
];

export default function StepGoals({ data, onChange, errors }: StepGoalsProps) {
    const [isManualCalories, setIsManualCalories] = useState(false);
    const [calculatedMetrics, setCalculatedMetrics] = useState({
        bmr: 0,
        tdee: 0,
        targetCalories: 0
    });
    const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0 });

    // Calcular métricas quando os dados necessários estiverem disponíveis
    useEffect(() => {
        if (data.weight && data.height && data.age && data.gender && data.activityLevel && data.goal) {
            const metrics = calculateAllMetrics({
                weight: data.weight,
                height: data.height,
                age: data.age,
                gender: data.gender,
                activityLevel: data.activityLevel,
                goal: data.goal
            });

            setCalculatedMetrics(metrics);

            // Se não está em modo manual, atualizar calorias
            if (!isManualCalories) {
                onChange({ targetCalories: metrics.targetCalories });
            }
        }
    }, [data.weight, data.height, data.age, data.gender, data.activityLevel, data.goal, isManualCalories]);

    // Calcular macros quando as calorias mudarem
    useEffect(() => {
        if (data.targetCalories) {
            setMacros(calculateMacros(data.targetCalories));
        }
    }, [data.targetCalories]);

    const handleGoalSelect = (goal: Goal) => {
        onChange({ goal });
    };

    const handleCaloriesChange = (value: number) => {
        onChange({ targetCalories: value });
    };

    const resetToCalculated = () => {
        setIsManualCalories(false);
        onChange({ targetCalories: calculatedMetrics.targetCalories });
    };

    return (
        <div className="space-y-6 animate-up">
            {/* Header do Step */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target size={32} className="text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Objetivos</h2>
                <p className="text-dark-400">
                    Defina o objetivo nutricional e as calorias diárias
                </p>
            </div>

            {/* Seleção de Objetivo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {goals.map((goal) => (
                    <button
                        key={goal.id}
                        type="button"
                        onClick={() => handleGoalSelect(goal.id)}
                        className={`
              text-left p-6 rounded-xl border-2 transition-all duration-300
              ${data.goal === goal.id
                                ? 'bg-emerald-500/10 border-emerald-500 shadow-glow'
                                : 'bg-dark-900/50 border-dark-800 hover:border-dark-600'
                            }
            `}
                    >
                        <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center mb-4
              ${data.goal === goal.id
                                ? 'bg-emerald-500 text-white'
                                : 'bg-dark-800 text-dark-400'
                            }
            `}>
                            {goal.icon}
                        </div>
                        <h3 className={`font-semibold mb-1 ${data.goal === goal.id ? 'text-emerald-400' : 'text-white'}`}>
                            {goal.label}
                        </h3>
                        <p className="text-xs text-dark-500">
                            {goal.description}
                        </p>
                    </button>
                ))}
            </div>

            {errors.goal && (
                <p className="text-sm text-red-400">{errors.goal}</p>
            )}

            {/* Métricas Calculadas */}
            {calculatedMetrics.tdee > 0 && (
                <Card className="bg-dark-900/30">
                    <div className="flex items-center gap-2 mb-4">
                        <Calculator size={18} className="text-emerald-400" />
                        <span className="text-sm font-medium text-dark-300">Cálculos Automáticos (Harris-Benedict)</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-dark-800/50 rounded-xl">
                            <p className="text-xs text-dark-500 mb-1">TMB</p>
                            <p className="text-lg font-semibold text-white">{calculatedMetrics.bmr}</p>
                            <p className="text-xs text-dark-500">kcal/dia</p>
                        </div>
                        <div className="text-center p-3 bg-dark-800/50 rounded-xl">
                            <p className="text-xs text-dark-500 mb-1">TDEE</p>
                            <p className="text-lg font-semibold text-white">{calculatedMetrics.tdee}</p>
                            <p className="text-xs text-dark-500">kcal/dia</p>
                        </div>
                        <div className="text-center p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                            <p className="text-xs text-emerald-400 mb-1">Recomendado</p>
                            <p className="text-lg font-semibold text-emerald-400">{calculatedMetrics.targetCalories}</p>
                            <p className="text-xs text-dark-500">kcal/dia</p>
                        </div>
                    </div>
                </Card>
            )}

            {/* Slider de Calorias */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Flame size={18} className="text-orange-400" />
                        <span className="font-medium text-white">Calorias Diárias Alvo</span>
                    </div>
                    {isManualCalories && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetToCalculated}
                        >
                            Resetar
                        </Button>
                    )}
                </div>

                <Slider
                    value={data.targetCalories || 2000}
                    onChange={(value) => {
                        setIsManualCalories(true);
                        handleCaloriesChange(value);
                    }}
                    min={1200}
                    max={5000}
                    step={50}
                    unit="kcal"
                />

                {isManualCalories && (
                    <p className="text-xs text-amber-400 mt-2">
                        ⚠️ Modo manual ativado. As calorias foram ajustadas manualmente.
                    </p>
                )}
            </Card>

            {/* Macros Preview */}
            {data.targetCalories && (
                <Card className="bg-gradient-to-br from-dark-900/50 to-dark-800/30">
                    <p className="text-sm text-dark-400 mb-4">Distribuição de Macros (30/40/30)</p>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <span className="text-xl">🥩</span>
                            </div>
                            <p className="text-lg font-bold text-white">{macros.protein}g</p>
                            <p className="text-xs text-dark-500">Proteína</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <span className="text-xl">🍚</span>
                            </div>
                            <p className="text-lg font-bold text-white">{macros.carbs}g</p>
                            <p className="text-xs text-dark-500">Carboidratos</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <span className="text-xl">🥑</span>
                            </div>
                            <p className="text-lg font-bold text-white">{macros.fat}g</p>
                            <p className="text-xs text-dark-500">Gorduras</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
