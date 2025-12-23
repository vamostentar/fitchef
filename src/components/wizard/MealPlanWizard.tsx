/**
 * FitChef.pro - MealPlanWizard
 * 
 * Componente principal do wizard multi-step para criação
 * de planos alimentares. Orquestra os 3 passos e gerencia
 * o estado do formulário.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { generateMealPlan } from '../../services/api';
import type { ClientData, MealPlan } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import StepClientBio from './StepClientBio';
import StepGoals from './StepGoals';
import StepPreferences from './StepPreferences';

interface MealPlanWizardProps {
    onComplete: (mealPlan: MealPlan) => void;
}

interface WizardStep {
    id: number;
    title: string;
    shortTitle: string;
}

const steps: WizardStep[] = [
    { id: 1, title: 'Dados do Cliente', shortTitle: 'Bio' },
    { id: 2, title: 'Objetivos', shortTitle: 'Objetivos' },
    { id: 3, title: 'Preferências', shortTitle: 'Preferências' }
];

// Valores iniciais do formulário
const initialData: Partial<ClientData> = {
    name: '',
    age: undefined,
    gender: undefined,
    height: undefined,
    weight: undefined,
    activityLevel: undefined,
    goal: undefined,
    targetCalories: 2000,
    dietType: 'omnivore',
    allergies: [],
    outputLanguage: 'pt-PT'
};

export default function MealPlanWizard({ onComplete }: MealPlanWizardProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Partial<ClientData>>(initialData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    // Atualizar dados do formulário
    const handleDataChange = (data: Partial<ClientData>) => {
        setFormData(prev => ({ ...prev, ...data }));
        // Limpar erros dos campos alterados
        const changedKeys = Object.keys(data);
        setErrors(prev => {
            const newErrors = { ...prev };
            changedKeys.forEach(key => delete newErrors[key]);
            return newErrors;
        });
    };

    // Validação por step
    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (step === 1) {
            if (!formData.name?.trim()) {
                newErrors.name = 'Nome é obrigatório';
            }
            if (!formData.age || formData.age < 10 || formData.age > 120) {
                newErrors.age = 'Idade deve estar entre 10 e 120';
            }
            if (!formData.gender) {
                newErrors.gender = 'Selecione o gênero';
            }
            if (!formData.height || formData.height < 100 || formData.height > 250) {
                newErrors.height = 'Altura deve estar entre 100 e 250 cm';
            }
            if (!formData.weight || formData.weight < 30 || formData.weight > 300) {
                newErrors.weight = 'Peso deve estar entre 30 e 300 kg';
            }
            if (!formData.activityLevel) {
                newErrors.activityLevel = 'Selecione o nível de atividade';
            }
        }

        if (step === 2) {
            if (!formData.goal) {
                newErrors.goal = 'Selecione um objetivo';
            }
            if (!formData.targetCalories || formData.targetCalories < 1200) {
                newErrors.targetCalories = 'Calorias devem ser no mínimo 1200';
            }
        }

        if (step === 3) {
            if (!formData.dietType) {
                newErrors.dietType = 'Selecione o tipo de dieta';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Navegação
    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < 3) {
                setCurrentStep(prev => prev + 1);
            } else {
                handleSubmit();
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    // Submissão final
    const handleSubmit = async () => {
        if (!validateStep(3)) return;

        setIsLoading(true);
        setApiError(null);

        try {
            const response = await generateMealPlan(formData as ClientData);

            if (response.success && response.data) {
                onComplete(response.data);
            } else {
                setApiError(response.error || 'Erro ao gerar plano');
            }
        } catch (error) {
            setApiError('Erro de conexão com o servidor. Verifique se o backend está rodando.');
        } finally {
            setIsLoading(false);
        }
    };

    // Renderizar step atual
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <StepClientBio
                        data={formData}
                        onChange={handleDataChange}
                        errors={errors}
                    />
                );
            case 2:
                return (
                    <StepGoals
                        data={formData}
                        onChange={handleDataChange}
                        errors={errors}
                    />
                );
            case 3:
                return (
                    <StepPreferences
                        data={formData}
                        onChange={handleDataChange}
                        errors={errors}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center flex-1">
                            {/* Step Circle */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={`
                    wizard-step-circle
                    ${currentStep === step.id
                                            ? 'wizard-step-circle-active'
                                            : currentStep > step.id
                                                ? 'wizard-step-circle-completed'
                                                : 'wizard-step-circle-pending'
                                        }
                  `}
                                >
                                    {currentStep > step.id ? (
                                        <Check size={18} />
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <span className={`
                  text-xs mt-2 font-medium
                  ${currentStep === step.id ? 'text-emerald-400' : 'text-dark-500'}
                `}>
                                    {step.shortTitle}
                                </span>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className={`
                  flex-1 h-0.5 mx-4 rounded-full
                  ${currentStep > step.id ? 'bg-emerald-500' : 'bg-dark-800'}
                `} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="mb-8">
                {renderStep()}
            </div>

            {/* Error Message */}
            {apiError && (
                <Card className="mb-6 bg-red-500/10 border-red-500/30">
                    <p className="text-red-400 text-sm">{apiError}</p>
                </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
                <Button
                    variant="secondary"
                    onClick={handleBack}
                    disabled={currentStep === 1 || isLoading}
                    icon={<ChevronLeft size={18} />}
                >
                    Voltar
                </Button>

                <div className="flex items-center gap-2 text-sm text-dark-500">
                    Passo {currentStep} de {steps.length}
                </div>

                {currentStep < 3 ? (
                    <Button
                        onClick={handleNext}
                        disabled={isLoading}
                        icon={<ChevronRight size={18} />}
                        iconPosition="right"
                    >
                        Próximo
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        loading={isLoading}
                        icon={isLoading ? undefined : <Sparkles size={18} />}
                        className="min-w-[180px]"
                    >
                        {isLoading ? 'Gerando...' : 'Gerar Plano'}
                    </Button>
                )}
            </div>
        </div>
    );
}
