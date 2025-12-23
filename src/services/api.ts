/**
 * FitChef.pro - Serviço de API
 * 
 * Funções para comunicação com o backend.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import type { ClientData, GeneratePlanResponse } from '../types';

const API_BASE_URL = '/api';

/**
 * Gera um plano alimentar baseado nos dados do cliente
 * 
 * @param clientData - Dados do cliente coletados pelo wizard
 * @returns Resposta da API com o plano gerado
 */
export async function generateMealPlan(clientData: ClientData): Promise<GeneratePlanResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/generate-plan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clientData }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao gerar plano');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro na API:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Erro de conexão com o servidor',
        };
    }
}

/**
 * Verifica o status do servidor
 * 
 * @returns Status do servidor
 */
export async function checkHealth(): Promise<{ status: string; version: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return await response.json();
    } catch {
        throw new Error('Servidor indisponível');
    }
}
