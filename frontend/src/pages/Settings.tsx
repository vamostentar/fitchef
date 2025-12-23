/**
 * FitChef.pro - Página Configurações
 * 
 * Configurações do perfil e preferências do app.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { Bell, ChefHat, Globe, Key, Palette, User } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

export default function Settings() {
    return (
        <div className="max-w-3xl space-y-6">
            {/* Profile Section */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <User size={20} className="text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">Perfil Profissional</h3>
                </div>

                <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center">
                        <ChefHat size={40} className="text-white" />
                    </div>
                    <div>
                        <Button variant="secondary" size="sm">Alterar Foto</Button>
                        <p className="text-xs text-dark-500 mt-2">JPG, PNG ou GIF. Máximo 2MB.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Nome Completo"
                        placeholder="Seu nome"
                        defaultValue="João Trainer"
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="seu@email.com"
                        defaultValue="joao@fitchef.pro"
                    />
                    <Input
                        label="Telefone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        defaultValue="(11) 98765-4321"
                    />
                    <Input
                        label="CREF"
                        placeholder="Número do CREF"
                        defaultValue="123456-G/SP"
                    />
                </div>

                <div className="mt-4">
                    <Input
                        label="Especialização"
                        placeholder="Ex: Nutrição Esportiva, Emagrecimento..."
                        defaultValue="Nutrição Esportiva, Hipertrofia, Emagrecimento"
                    />
                </div>
            </Card>

            {/* Branding */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <Palette size={20} className="text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">Branding dos PDFs</h3>
                </div>

                <div className="space-y-4">
                    <Input
                        label="Nome da Empresa/Studio"
                        placeholder="Ex: Studio Fit & Performance"
                        defaultValue="JT Personal Training"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="input-label">Logo</label>
                            <div className="border-2 border-dashed border-dark-700 rounded-xl p-6 text-center hover:border-emerald-500/50 transition-colors cursor-pointer">
                                <p className="text-sm text-dark-400">Arraste ou clique para upload</p>
                                <p className="text-xs text-dark-500 mt-1">PNG ou SVG, 500x500px</p>
                            </div>
                        </div>
                        <div>
                            <label className="input-label">Cor Principal</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    defaultValue="#10b981"
                                    className="w-12 h-12 rounded-xl cursor-pointer bg-transparent"
                                />
                                <Input
                                    placeholder="#10b981"
                                    defaultValue="#10b981"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Preferences */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <Globe size={20} className="text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">Preferências</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        label="Idioma Padrão dos Planos"
                        options={[
                            { value: 'pt-BR', label: 'Português (Brasil)' },
                            { value: 'en-US', label: 'English (US)' },
                            { value: 'es-ES', label: 'Español' }
                        ]}
                        defaultValue="pt-BR"
                    />

                    <Select
                        label="Sistema de Medidas"
                        options={[
                            { value: 'metric', label: 'Métrico (kg, cm)' },
                            { value: 'imperial', label: 'Imperial (lb, in)' }
                        ]}
                        defaultValue="metric"
                    />

                    <Select
                        label="Distribuição de Macros Padrão"
                        options={[
                            { value: '30-40-30', label: '30% P / 40% C / 30% G' },
                            { value: '40-30-30', label: '40% P / 30% C / 30% G' },
                            { value: '25-50-25', label: '25% P / 50% C / 25% G' }
                        ]}
                        defaultValue="30-40-30"
                    />

                    <Select
                        label="Número de Refeições"
                        options={[
                            { value: '4', label: '4 refeições' },
                            { value: '5', label: '5 refeições' },
                            { value: '6', label: '6 refeições' }
                        ]}
                        defaultValue="4"
                    />
                </div>
            </Card>

            {/* Notifications */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <Bell size={20} className="text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">Notificações</h3>
                </div>

                <div className="space-y-4">
                    {[
                        { label: 'Novos recursos e atualizações', checked: true },
                        { label: 'Lembretes de consultas', checked: true },
                        { label: 'Relatórios semanais', checked: false },
                        { label: 'Dicas e tutoriais', checked: true }
                    ].map((item, index) => (
                        <label key={index} className="flex items-center justify-between cursor-pointer group">
                            <span className="text-dark-300 group-hover:text-white transition-colors">
                                {item.label}
                            </span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    defaultChecked={item.checked}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-dark-700 peer-focus:ring-2 peer-focus:ring-emerald-500/50 rounded-full peer peer-checked:bg-emerald-500 transition-colors" />
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                            </div>
                        </label>
                    ))}
                </div>
            </Card>

            {/* AI Status */}
            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                        <Key size={20} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Integração com IA</h3>
                        <p className="text-sm text-emerald-400">✅ Google Gemini Ativo</p>
                    </div>
                </div>

                <p className="text-sm text-dark-400">
                    A geração de planos alimentares utiliza o <strong className="text-white">Google Gemini AI</strong>,
                    gerenciado de forma segura e centralizada no servidor. Você não precisa configurar nenhuma chave API.
                </p>

                <div className="mt-4 p-3 bg-dark-800/50 rounded-xl">
                    <p className="text-xs text-dark-500">
                        💡 Cada plano é gerado em tempo real pela IA, considerando todos os dados do cliente,
                        preferências alimentares e objetivos definidos.
                    </p>
                </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
                <Button variant="secondary">Cancelar</Button>
                <Button>Salvar Alterações</Button>
            </div>
        </div>
    );
}
