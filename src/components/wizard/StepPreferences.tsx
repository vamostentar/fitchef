/**
 * FitChef.pro - Step 3: Preferências Alimentares
 * 
 * Terceiro passo do wizard - define tipo de dieta,
 * alergias e preferências de idioma.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { AlertTriangle, Globe, Plus, Utensils } from 'lucide-react';
import { useState } from 'react';
import type { ClientData, DietType } from '../../types';
import { dietTypeLabels } from '../../types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface StepPreferencesProps {
    data: Partial<ClientData>;
    onChange: (data: Partial<ClientData>) => void;
    errors: Record<string, string>;
}

const dietTypes: { id: DietType; label: string; icon: string; description: string }[] = [
    { id: 'omnivore', label: 'Onívoro', icon: '🍖', description: 'Sem restrições' },
    { id: 'vegetarian', label: 'Vegetariano', icon: '🥗', description: 'Sem carnes' },
    { id: 'vegan', label: 'Vegano', icon: '🌱', description: 'Sem produtos animais' },
    { id: 'paleo', label: 'Paleo', icon: '🥩', description: 'Dieta ancestral' },
    { id: 'keto', label: 'Keto', icon: '🥑', description: 'Baixo carboidrato' }
];

const languageOptions = [
    { value: 'pt-PT', label: '🇵🇹 Português (Portugal)' },
    { value: 'en-US', label: '🇺🇸 English (US)' },
    { value: 'es-ES', label: '🇪🇸 Español' }
];

const commonAllergies = [
    'Amendoim', 'Nozes', 'Leite', 'Ovos', 'Soja',
    'Trigo/Glúten', 'Frutos do mar', 'Peixes'
];

export default function StepPreferences({ data, onChange, errors }: StepPreferencesProps) {
    const [allergyInput, setAllergyInput] = useState('');
    const allergies = data.allergies || [];

    const handleDietSelect = (diet: DietType) => {
        onChange({ dietType: diet });
    };

    const handleAddAllergy = () => {
        if (allergyInput.trim() && !allergies.includes(allergyInput.trim())) {
            onChange({ allergies: [...allergies, allergyInput.trim()] });
            setAllergyInput('');
        }
    };

    const handleRemoveAllergy = (allergy: string) => {
        onChange({ allergies: allergies.filter(a => a !== allergy) });
    };

    const handleQuickAddAllergy = (allergy: string) => {
        if (!allergies.includes(allergy)) {
            onChange({ allergies: [...allergies, allergy] });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddAllergy();
        }
    };

    return (
        <div className="space-y-6 animate-up">
            {/* Header do Step */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Utensils size={32} className="text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Preferências Alimentares</h2>
                <p className="text-dark-400">
                    Configure o tipo de dieta e restrições alimentares
                </p>
            </div>

            {/* Tipo de Dieta */}
            <Card>
                <h3 className="text-lg font-semibold text-white mb-4">Tipo de Dieta</h3>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {dietTypes.map((diet) => (
                        <button
                            key={diet.id}
                            type="button"
                            onClick={() => handleDietSelect(diet.id)}
                            className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-center
                ${data.dietType === diet.id
                                    ? 'bg-emerald-500/10 border-emerald-500'
                                    : 'bg-dark-800/50 border-dark-700 hover:border-dark-600'
                                }
              `}
                        >
                            <span className="text-2xl mb-2 block">{diet.icon}</span>
                            <p className={`text-sm font-medium ${data.dietType === diet.id ? 'text-emerald-400' : 'text-white'}`}>
                                {diet.label}
                            </p>
                            <p className="text-xs text-dark-500 mt-1">{diet.description}</p>
                        </button>
                    ))}
                </div>

                {errors.dietType && (
                    <p className="text-sm text-red-400 mt-2">{errors.dietType}</p>
                )}
            </Card>

            {/* Alergias e Exclusões */}
            <Card>
                <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle size={18} className="text-amber-400" />
                    <h3 className="text-lg font-semibold text-white">Alergias e Exclusões</h3>
                </div>

                {/* Input para adicionar */}
                <div className="flex gap-2 mb-4">
                    <Input
                        placeholder="Digite uma alergia ou alimento a excluir..."
                        value={allergyInput}
                        onChange={(e) => setAllergyInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                    />
                    <Button
                        variant="secondary"
                        onClick={handleAddAllergy}
                        icon={<Plus size={18} />}
                    >
                        Adicionar
                    </Button>
                </div>

                {/* Quick Add */}
                <div className="mb-4">
                    <p className="text-xs text-dark-500 mb-2">Adicionar rapidamente:</p>
                    <div className="flex flex-wrap gap-2">
                        {commonAllergies.map((allergy) => (
                            <button
                                key={allergy}
                                type="button"
                                onClick={() => handleQuickAddAllergy(allergy)}
                                disabled={allergies.includes(allergy)}
                                className={`
                  px-3 py-1 text-xs rounded-full border transition-all
                  ${allergies.includes(allergy)
                                        ? 'bg-dark-800 border-dark-700 text-dark-600 cursor-not-allowed'
                                        : 'bg-dark-800/50 border-dark-700 text-dark-400 hover:border-amber-500/50 hover:text-amber-400'
                                    }
                `}
                            >
                                + {allergy}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Lista de Alergias Selecionadas */}
                {allergies.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-4 bg-dark-800/30 rounded-xl">
                        {allergies.map((allergy) => (
                            <Badge
                                key={allergy}
                                variant="warning"
                                onRemove={() => handleRemoveAllergy(allergy)}
                            >
                                {allergy}
                            </Badge>
                        ))}
                    </div>
                )}

                {allergies.length === 0 && (
                    <p className="text-sm text-dark-500 italic">
                        Nenhuma alergia ou exclusão adicionada.
                    </p>
                )}
            </Card>

            {/* Idioma de Saída */}
            <Card>
                <div className="flex items-center gap-2 mb-4">
                    <Globe size={18} className="text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">Idioma do Plano</h3>
                </div>

                <Select
                    label="O plano alimentar será gerado em:"
                    options={languageOptions}
                    value={data.outputLanguage || 'pt-BR'}
                    onChange={(e) => onChange({ outputLanguage: e.target.value as ClientData['outputLanguage'] })}
                />
            </Card>

            {/* Resumo das Configurações */}
            <Card className="bg-gradient-to-br from-emerald-500/5 to-emerald-600/5 border-emerald-500/20">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">✅</span>
                    <h3 className="font-semibold text-emerald-400">Resumo das Preferências</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <p className="text-dark-500">Dieta</p>
                        <p className="text-white font-medium">
                            {data.dietType ? dietTypeLabels[data.dietType] : 'Não selecionada'}
                        </p>
                    </div>
                    <div>
                        <p className="text-dark-500">Restrições</p>
                        <p className="text-white font-medium">
                            {allergies.length > 0 ? `${allergies.length} item(s)` : 'Nenhuma'}
                        </p>
                    </div>
                    <div>
                        <p className="text-dark-500">Idioma</p>
                        <p className="text-white font-medium">
                            {data.outputLanguage === 'pt-PT' ? 'Português (PT)' :
                                data.outputLanguage === 'pt-BR' ? 'Português (BR)' :
                                    data.outputLanguage === 'en-US' ? 'English' : 'Español'}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
