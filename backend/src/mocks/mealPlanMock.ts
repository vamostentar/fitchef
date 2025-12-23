/**
 * FitChef.pro - Mock de Plano Alimentar
 * 
 * Este módulo fornece dados mock realistas para desenvolvimento
 * e testes enquanto a integração com IA não está ativa.
 * 
 * Os dados simulam um plano alimentar completo de 7 dias
 * com aproximadamente 2000 kcal/dia.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import type { DayPlan, Meal, MealPlan, ShoppingList, WeeklySummary } from '../types/index.js';

/**
 * Gera um plano alimentar mock baseado nos dados do cliente
 * 
 * @param clientName - Nome do cliente
 * @param targetCalories - Calorias alvo diárias
 * @returns Plano alimentar completo mock
 */
export function generateMockMealPlan(clientName: string, targetCalories: number): MealPlan {
    // Calcular macros baseado na distribuição padrão (30/40/30)
    const proteinCalories = targetCalories * 0.30;
    const carbsCalories = targetCalories * 0.40;
    const fatCalories = targetCalories * 0.30;

    // Converter para gramas (proteína: 4kcal/g, carbs: 4kcal/g, gordura: 9kcal/g)
    const proteinGrams = Math.round(proteinCalories / 4);
    const carbsGrams = Math.round(carbsCalories / 4);
    const fatGrams = Math.round(fatCalories / 9);

    const weeklySummary: WeeklySummary = {
        totalProteinAvg: proteinGrams,
        totalCarbsAvg: carbsGrams,
        totalFatAvg: fatGrams,
        estimatedDailyCalories: targetCalories
    };

    // Refeições base que serão reutilizadas
    const breakfastBase: Meal = {
        type: 'Breakfast',
        name: 'Mingau de Aveia Proteico',
        calories: Math.round(targetCalories * 0.25),
        protein: Math.round(proteinGrams * 0.25),
        carbs: Math.round(carbsGrams * 0.30),
        fats: Math.round(fatGrams * 0.15),
        ingredients: [
            '60g Aveia em flocos',
            '30g Whey Protein (baunilha)',
            '200ml Leite desnatado',
            '1 Banana média',
            '10g Mel',
            '15g Pasta de amendoim'
        ],
        recipe: 'Cozinhe a aveia com o leite em fogo médio por 3-4 minutos. Retire do fogo, adicione o whey e misture bem. Cubra com banana fatiada e pasta de amendoim. Regue com mel.'
    };

    const lunchOptions: Meal[] = [
        {
            type: 'Lunch',
            name: 'Frango Grelhado com Arroz Integral',
            calories: Math.round(targetCalories * 0.35),
            protein: Math.round(proteinGrams * 0.40),
            carbs: Math.round(carbsGrams * 0.35),
            fats: Math.round(fatGrams * 0.25),
            ingredients: [
                '180g Peito de frango',
                '120g Arroz integral cozido',
                '100g Brócolis',
                '50g Cenoura',
                '15ml Azeite de oliva',
                'Temperos: sal, pimenta, alho, limão'
            ],
            recipe: 'Tempere o frango com sal, pimenta, alho e limão. Grelhe por 6-7 minutos de cada lado. Cozinhe o arroz integral. Refogue os vegetais no azeite. Sirva tudo junto.'
        },
        {
            type: 'Lunch',
            name: 'Carne Moída com Batata Doce',
            calories: Math.round(targetCalories * 0.35),
            protein: Math.round(proteinGrams * 0.40),
            carbs: Math.round(carbsGrams * 0.35),
            fats: Math.round(fatGrams * 0.30),
            ingredients: [
                '150g Carne moída magra (patinho)',
                '200g Batata doce',
                '80g Espinafre refogado',
                '1 Tomate médio',
                '10ml Azeite de oliva',
                'Temperos: cebola, alho, sal, pimenta'
            ],
            recipe: 'Asse a batata doce no forno por 40 minutos. Refogue a carne moída com cebola e alho. Adicione tomate picado. Refogue o espinafre com azeite. Monte o prato.'
        },
        {
            type: 'Lunch',
            name: 'Salmão com Quinoa e Legumes',
            calories: Math.round(targetCalories * 0.35),
            protein: Math.round(proteinGrams * 0.38),
            carbs: Math.round(carbsGrams * 0.32),
            fats: Math.round(fatGrams * 0.35),
            ingredients: [
                '150g Filé de salmão',
                '80g Quinoa cozida',
                '100g Abobrinha',
                '80g Pimentão colorido',
                '15ml Azeite de oliva',
                'Temperos: limão, dill, sal, pimenta'
            ],
            recipe: 'Tempere o salmão com limão e dill. Asse no forno a 200°C por 15 minutos. Cozinhe a quinoa. Grelhe os legumes com azeite. Sirva com fatias de limão.'
        }
    ];

    const dinnerOptions: Meal[] = [
        {
            type: 'Dinner',
            name: 'Omelete de Claras com Salada',
            calories: Math.round(targetCalories * 0.25),
            protein: Math.round(proteinGrams * 0.25),
            carbs: Math.round(carbsGrams * 0.15),
            fats: Math.round(fatGrams * 0.30),
            ingredients: [
                '5 Claras de ovo',
                '1 Ovo inteiro',
                '30g Queijo cottage',
                '50g Espinafre',
                '100g Mix de folhas verdes',
                '50g Tomate cereja',
                '10ml Azeite de oliva'
            ],
            recipe: 'Bata os ovos com sal e pimenta. Adicione espinafre picado e queijo. Cozinhe a omelete em frigideira antiaderente. Sirva com salada temperada com azeite e limão.'
        },
        {
            type: 'Dinner',
            name: 'Peito de Peru com Legumes Assados',
            calories: Math.round(targetCalories * 0.25),
            protein: Math.round(proteinGrams * 0.28),
            carbs: Math.round(carbsGrams * 0.18),
            fats: Math.round(fatGrams * 0.25),
            ingredients: [
                '150g Peito de peru',
                '100g Abobrinha',
                '100g Berinjela',
                '80g Cebola roxa',
                '15ml Azeite de oliva',
                'Temperos: alecrim, tomilho, sal, pimenta'
            ],
            recipe: 'Corte os legumes em cubos, tempere com ervas e azeite. Asse a 200°C por 25 minutos. Grelhe o peito de peru. Sirva junto.'
        },
        {
            type: 'Dinner',
            name: 'Tilápia Grelhada com Purê de Couve-flor',
            calories: Math.round(targetCalories * 0.25),
            protein: Math.round(proteinGrams * 0.27),
            carbs: Math.round(carbsGrams * 0.12),
            fats: Math.round(fatGrams * 0.28),
            ingredients: [
                '170g Filé de tilápia',
                '200g Couve-flor',
                '30ml Leite desnatado',
                '10g Manteiga',
                '80g Aspargos',
                'Temperos: limão, páprica, sal'
            ],
            recipe: 'Cozinhe a couve-flor até ficar macia, bata com leite e manteiga até virar purê. Grelhe a tilápia temperada. Cozinhe os aspargos no vapor.'
        }
    ];

    const snackBase: Meal = {
        type: 'Snack',
        name: 'Mix de Castanhas com Iogurte',
        calories: Math.round(targetCalories * 0.15),
        protein: Math.round(proteinGrams * 0.10),
        carbs: Math.round(carbsGrams * 0.20),
        fats: Math.round(fatGrams * 0.30),
        ingredients: [
            '170g Iogurte grego natural',
            '25g Mix de castanhas (nozes, amêndoas, castanha-do-pará)',
            '50g Frutas vermelhas (morango, mirtilo)',
            '5g Canela em pó'
        ],
        recipe: 'Coloque o iogurte em uma tigela. Adicione as frutas vermelhas por cima. Polvilhe as castanhas picadas e a canela. Consuma imediatamente.'
    };

    // Dias da semana em português
    const diasSemana = [
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
        'Domingo'
    ];

    // Gerar plano semanal
    const schedule: DayPlan[] = diasSemana.map((day, index) => ({
        day,
        meals: [
            breakfastBase,
            lunchOptions[index % lunchOptions.length],
            dinnerOptions[index % dinnerOptions.length],
            snackBase
        ]
    }));

    // Lista de compras agregada
    const shoppingList: ShoppingList = {
        Proteins: [
            '1.2kg Peito de frango',
            '500g Carne moída magra (patinho)',
            '300g Filé de salmão',
            '500g Peito de peru',
            '350g Filé de tilápia',
            '24 Ovos',
            '200g Queijo cottage',
            '1kg Iogurte grego natural',
            '250g Whey Protein'
        ],
        Carbs: [
            '500g Aveia em flocos',
            '1kg Arroz integral',
            '1kg Batata doce',
            '500g Quinoa',
            '7 Bananas'
        ],
        Fats: [
            '500ml Azeite de oliva',
            '200g Pasta de amendoim natural',
            '300g Mix de castanhas',
            '100g Manteiga'
        ],
        Vegetables: [
            '500g Brócolis',
            '400g Espinafre',
            '500g Abobrinha',
            '400g Berinjela',
            '300g Cenoura',
            '300g Pimentão colorido',
            '400g Couve-flor',
            '200g Aspargos',
            '500g Mix de folhas verdes',
            '300g Tomate cereja',
            '300g Frutas vermelhas'
        ],
        Other: [
            'Mel (200g)',
            'Leite desnatado (2L)',
            'Canela em pó',
            'Limões (6 unidades)',
            'Cebola (500g)',
            'Alho (2 cabeças)',
            'Tomates (500g)',
            'Temperos: sal, pimenta, páprica, alecrim, tomilho, dill'
        ]
    };

    return {
        clientName,
        targetCalories,
        generatedAt: new Date().toISOString(),
        weeklySummary,
        schedule,
        shoppingList
    };
}
