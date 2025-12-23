/**
 * FitChef.pro - System Prompt para IA
 * 
 * Este módulo contém o prompt otimizado para enviar à API de IA
 * (OpenAI GPT-4 ou Google Gemini) para geração de planos alimentares.
 * 
 * O prompt é construído dinamicamente com base nos dados do cliente.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import type { ClientData } from '../types/index.js';

/**
 * Mapeamento de níveis de atividade para descrições
 */
const activityDescriptions: Record<string, string> = {
  sedentary: 'sedentário (pouco ou nenhum exercício)',
  light: 'levemente ativo (exercício leve 1-3 dias/semana)',
  moderate: 'moderadamente ativo (exercício moderado 3-5 dias/semana)',
  active: 'muito ativo (exercício intenso 6-7 dias/semana)',
  very_active: 'extremamente ativo (exercício muito intenso diário)'
};

/**
 * Mapeamento de objetivos para descrições
 */
const goalDescriptions: Record<string, string> = {
  fat_loss: 'perda de gordura (déficit calórico)',
  muscle_gain: 'ganho de massa muscular (superávit calórico)',
  maintenance: 'manutenção do peso atual'
};

/**
 * Mapeamento de tipos de dieta para restrições
 */
const dietRestrictions: Record<string, string> = {
  omnivore: 'Sem restrições alimentares específicas.',
  vegetarian: 'VEGETARIANO: Não incluir carnes, aves ou peixes. Ovos e laticínios são permitidos.',
  vegan: 'VEGANO: Não incluir NENHUM produto de origem animal (carne, peixe, ovos, laticínios, mel).',
  paleo: 'PALEO: Evitar grãos, leguminosas, laticínios e alimentos processados.',
  keto: 'KETO: Máximo 20-30g de carboidratos por dia. Foco em gorduras saudáveis e proteínas.'
};

/**
 * Gera o System Prompt completo para a IA
 * 
 * @param clientData - Dados do cliente coletados pelo formulário
 * @returns String com o prompt formatado para envio à API
 */
export function generateSystemPrompt(clientData: ClientData): string {
  const {
    name,
    age,
    gender,
    height,
    weight,
    activityLevel,
    goal,
    targetCalories,
    dietType,
    allergies,
    outputLanguage
  } = clientData;

  // Formatar lista de alergias
  const allergyList = allergies.length > 0
    ? `ALERGIAS/EXCLUSÕES OBRIGATÓRIAS: ${allergies.join(', ')}. NUNCA incluir estes ingredientes ou seus derivados.`
    : 'Sem alergias reportadas.';

  // Idioma de saída
  const languageMap: Record<string, string> = {
    'pt-PT': 'Português Europeu (Portugal)',
    'en-US': 'English',
    'es-ES': 'Español'
  };

  return `### SYSTEM ROLE
Você é FitChefAI, um Nutricionista Esportivo e Cientista de Dados de classe mundial.
Seu objetivo é gerar planos alimentares semanais precisos e cientificamente embasados.
Você NÃO conversa. Você APENAS retorna JSON válido e minificado.

### DADOS DO CLIENTE
- Nome: ${name}
- Idade: ${age} anos
- Gênero: ${gender === 'male' ? 'Masculino' : 'Feminino'}
- Altura: ${height} cm
- Peso: ${weight} kg
- Nível de Atividade: ${activityDescriptions[activityLevel]}
- Objetivo: ${goalDescriptions[goal]}
- Calorias Alvo: ${targetCalories} kcal/dia

### RESTRIÇÕES ALIMENTARES
${dietRestrictions[dietType]}
${allergyList}

### INSTRUÇÕES CRÍTICAS
1. **Precisão Calórica:** Respeite ESTRITAMENTE as ${targetCalories} kcal/dia. Variação máxima de ±50 kcal.
2. **Distribuição de Macros:** Use a proporção padrão (30% Proteína, 40% Carboidratos, 30% Gordura) a menos que o tipo de dieta exija diferente.
3. **Realismo:** Use ingredientes comuns e acessíveis. Evite itens exóticos.
4. **Variedade:** Mantenha café da manhã consistente para praticidade. Varie almoço e jantar para evitar monotonia, mas reutilize ingredientes para economia.
5. **Idioma:** TODO o conteúdo (nomes de refeições, instruções, ingredientes) deve estar em ${languageMap[outputLanguage]}. As CHAVES do JSON devem permanecer em INGLÊS.

### FORMATO DE SAÍDA (JSON ESTRITO)
Retorne um objeto JSON que corresponda EXATAMENTE a esta estrutura. NÃO inclua formatação markdown (como \`\`\`json), apenas a string JSON pura.

{
  "weeklySummary": {
    "totalProteinAvg": number,
    "totalCarbsAvg": number,
    "totalFatAvg": number,
    "estimatedDailyCalories": number
  },
  "schedule": [
    {
      "day": "Segunda-feira",
      "meals": [
        {
          "type": "Breakfast" | "Lunch" | "Dinner" | "Snack",
          "name": "Nome da Refeição",
          "calories": number,
          "protein": number,
          "carbs": number,
          "fats": number,
          "ingredients": ["50g Aveia", "30g Whey Protein", "100ml Leite"],
          "recipe": "Instruções curtas de preparo."
        }
      ]
    }
    // ... repetir para 7 dias (Segunda a Domingo)
  ],
  "shoppingList": {
    "Proteins": ["700g Peito de Frango", "500g Carne Moída Magra"],
    "Carbs": ["1kg Arroz Integral", "500g Batata Doce"],
    "Fats": ["200ml Azeite de Oliva", "200g Castanhas"],
    "Vegetables": ["1kg Brócolis", "500g Espinafre"],
    "Other": ["Temperos", "Sal", "Limão"]
  }
}

### REGRAS ADICIONAIS
- A "shoppingList" deve AGREGAR quantidades. Ex: se usar "100g Frango" em 7 refeições, liste "700g Peito de Frango".
- Cada dia DEVE ter exatamente 4 refeições: Breakfast, Lunch, Dinner, Snack.
- As calorias de cada dia devem somar aproximadamente ${targetCalories} kcal.

GERE O PLANO AGORA:`;
}

/**
 * Gera um prompt simplificado para testes
 */
export function generateTestPrompt(): string {
  return 'Gere um plano alimentar de teste no formato JSON especificado.';
}
