/**
 * FitChef.pro - Step 1: Dados do Cliente
 * 
 * Primeiro passo do wizard - coleta informações pessoais
 * e métricas corporais do cliente.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { Activity, Calendar, Ruler, User, Weight } from 'lucide-react';
import type { ClientData } from '../../types';
import { activityLevelLabels } from '../../types';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface StepClientBioProps {
    data: Partial<ClientData>;
    onChange: (data: Partial<ClientData>) => void;
    errors: Record<string, string>;
}

const genderOptions = [
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Feminino' }
];

const activityOptions = Object.entries(activityLevelLabels).map(([value, label]) => ({
    value,
    label
}));

export default function StepClientBio({ data, onChange, errors }: StepClientBioProps) {
    const handleChange = (field: keyof ClientData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        onChange({ [field]: value });
    };

    return (
        <div className="space-y-6 animate-up">
            {/* Header do Step */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <User size={32} className="text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Dados do Cliente</h2>
                <p className="text-dark-400">
                    Informe os dados pessoais e métricas corporais do seu cliente
                </p>
            </div>

            {/* Formulário */}
            <Card className="space-y-6">
                {/* Nome */}
                <Input
                    label="Nome Completo"
                    placeholder="Ex: João Silva"
                    value={data.name || ''}
                    onChange={handleChange('name')}
                    error={errors.name}
                    required
                />

                {/* Grid 2 colunas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Idade */}
                    <div className="relative">
                        <Input
                            label="Idade"
                            type="number"
                            placeholder="Ex: 30"
                            min={10}
                            max={120}
                            value={data.age || ''}
                            onChange={handleChange('age')}
                            error={errors.age}
                            required
                        />
                        <Calendar size={18} className="absolute right-4 top-10 text-dark-500" />
                    </div>

                    {/* Gênero */}
                    <Select
                        label="Gênero"
                        options={genderOptions}
                        value={data.gender || ''}
                        onChange={handleChange('gender')}
                        error={errors.gender}
                        placeholder="Selecione..."
                        required
                    />
                </div>

                {/* Grid 2 colunas - Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Altura */}
                    <div className="relative">
                        <Input
                            label="Altura (cm)"
                            type="number"
                            placeholder="Ex: 175"
                            min={100}
                            max={250}
                            value={data.height || ''}
                            onChange={handleChange('height')}
                            error={errors.height}
                            hint="Em centímetros"
                            required
                        />
                        <Ruler size={18} className="absolute right-4 top-10 text-dark-500" />
                    </div>

                    {/* Peso */}
                    <div className="relative">
                        <Input
                            label="Peso (kg)"
                            type="number"
                            placeholder="Ex: 75"
                            min={30}
                            max={300}
                            step={0.1}
                            value={data.weight || ''}
                            onChange={handleChange('weight')}
                            error={errors.weight}
                            hint="Em quilogramas"
                            required
                        />
                        <Weight size={18} className="absolute right-4 top-10 text-dark-500" />
                    </div>
                </div>

                {/* Nível de Atividade */}
                <div className="relative">
                    <Select
                        label="Nível de Atividade Física"
                        options={activityOptions}
                        value={data.activityLevel || ''}
                        onChange={handleChange('activityLevel')}
                        error={errors.activityLevel}
                        placeholder="Selecione o nível de atividade..."
                        required
                    />
                    <Activity size={18} className="absolute right-4 top-10 text-dark-500 pointer-events-none" />
                </div>
            </Card>

            {/* Info Card */}
            <Card className="bg-emerald-500/5 border-emerald-500/20">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Activity size={16} className="text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-emerald-400 mb-1">
                            Sobre o Nível de Atividade
                        </p>
                        <p className="text-xs text-dark-400">
                            O nível de atividade física é usado para calcular o gasto calórico diário (TDEE)
                            usando a fórmula de Harris-Benedict. Escolha o nível que melhor representa
                            a rotina semanal do cliente.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
