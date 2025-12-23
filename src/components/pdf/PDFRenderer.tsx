/**
 * FitChef.pro - PDFRenderer
 * 
 * Componente para renderização de PDF do plano alimentar.
 * Usa @react-pdf/renderer para gerar documentos A4 profissionais.
 * Usa file-saver para garantir download com nome correto.
 * 
 * @author FitChef Team
 * @version 2.2.0 - Usando file-saver para download confiável
 */

import {
    Document,
    Page,
    StyleSheet,
    Text,
    View,
    pdf
} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import type { DayPlan, Meal, MealPlan } from '../../types';
import { mealTypeLabels } from '../../types';
import Button from '../ui/Button';

// Estilos do PDF
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        backgroundColor: '#ffffff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#10b981'
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#18181b'
    },
    logoAccent: {
        color: '#10b981'
    },
    clientInfo: {
        textAlign: 'right'
    },
    clientName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#18181b'
    },
    clientMeta: {
        fontSize: 9,
        color: '#71717a'
    },
    summarySection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f4f4f5',
        borderRadius: 8
    },
    summaryItem: {
        textAlign: 'center'
    },
    summaryValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#10b981'
    },
    summaryLabel: {
        fontSize: 8,
        color: '#71717a',
        marginTop: 2
    },
    daySection: {
        marginBottom: 15
    },
    dayHeader: {
        backgroundColor: '#18181b',
        padding: 8,
        borderRadius: 4,
        marginBottom: 8
    },
    dayTitle: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 11
    },
    mealRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e4e4e7',
        paddingVertical: 6
    },
    mealType: {
        width: '20%',
        fontWeight: 'bold',
        color: '#10b981',
        fontSize: 9
    },
    mealName: {
        width: '40%',
        fontSize: 9
    },
    mealCalories: {
        width: '15%',
        fontSize: 9,
        textAlign: 'center'
    },
    mealMacros: {
        width: '25%',
        fontSize: 8,
        color: '#71717a'
    },
    shoppingSection: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#e4e4e7'
    },
    shoppingTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#18181b'
    },
    shoppingGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    shoppingCategory: {
        width: '50%',
        marginBottom: 10,
        paddingRight: 10
    },
    shoppingCategoryTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#10b981',
        marginBottom: 4
    },
    shoppingItem: {
        fontSize: 8,
        color: '#52525b',
        marginBottom: 2
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#e4e4e7'
    },
    footerText: {
        fontSize: 8,
        color: '#a1a1aa'
    },
    footerBrand: {
        fontSize: 9,
        color: '#10b981',
        fontWeight: 'bold'
    }
});

// Componente do Documento PDF
const MealPlanPDF = ({ mealPlan }: { mealPlan: MealPlan }) => (
    <Document>
        {/* Página 1: Plano Semanal */}
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>
                        Fit<Text style={styles.logoAccent}>Chef</Text>.pro
                    </Text>
                </View>
                <View style={styles.clientInfo}>
                    <Text style={styles.clientName}>{mealPlan.clientName}</Text>
                    <Text style={styles.clientMeta}>
                        Gerado em: {new Date(mealPlan.generatedAt).toLocaleDateString('pt-BR')}
                    </Text>
                </View>
            </View>

            {/* Summary */}
            <View style={styles.summarySection}>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>{mealPlan.targetCalories}</Text>
                    <Text style={styles.summaryLabel}>KCAL/DIA</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>{mealPlan.weeklySummary.totalProteinAvg}g</Text>
                    <Text style={styles.summaryLabel}>PROTEINA</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>{mealPlan.weeklySummary.totalCarbsAvg}g</Text>
                    <Text style={styles.summaryLabel}>CARBOIDRATOS</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryValue}>{mealPlan.weeklySummary.totalFatAvg}g</Text>
                    <Text style={styles.summaryLabel}>GORDURAS</Text>
                </View>
            </View>

            {/* Dias da Semana (primeiros 4) */}
            {mealPlan.schedule.slice(0, 4).map((day: DayPlan) => (
                <View key={day.day} style={styles.daySection}>
                    <View style={styles.dayHeader}>
                        <Text style={styles.dayTitle}>{day.day}</Text>
                    </View>
                    {day.meals.map((meal: Meal, idx: number) => (
                        <View key={idx} style={styles.mealRow}>
                            <Text style={styles.mealType}>
                                {mealTypeLabels[meal.type] || meal.type}
                            </Text>
                            <Text style={styles.mealName}>{meal.name}</Text>
                            <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
                            <Text style={styles.mealMacros}>
                                P:{meal.protein}g | C:{meal.carbs}g | G:{meal.fats}g
                            </Text>
                        </View>
                    ))}
                </View>
            ))}

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerBrand}>Gerado por FitChef.pro</Text>
                <Text style={styles.footerText}>Plano alimentar personalizado - Pagina 1/2</Text>
            </View>
        </Page>

        {/* Página 2: Resto da semana + Lista de Compras */}
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logo}>
                    <Text style={styles.logoText}>
                        Fit<Text style={styles.logoAccent}>Chef</Text>.pro
                    </Text>
                </View>
                <View style={styles.clientInfo}>
                    <Text style={styles.clientName}>{mealPlan.clientName}</Text>
                </View>
            </View>

            {/* Dias restantes */}
            {mealPlan.schedule.slice(4).map((day: DayPlan) => (
                <View key={day.day} style={styles.daySection}>
                    <View style={styles.dayHeader}>
                        <Text style={styles.dayTitle}>{day.day}</Text>
                    </View>
                    {day.meals.map((meal: Meal, idx: number) => (
                        <View key={idx} style={styles.mealRow}>
                            <Text style={styles.mealType}>
                                {mealTypeLabels[meal.type] || meal.type}
                            </Text>
                            <Text style={styles.mealName}>{meal.name}</Text>
                            <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
                            <Text style={styles.mealMacros}>
                                P:{meal.protein}g | C:{meal.carbs}g | G:{meal.fats}g
                            </Text>
                        </View>
                    ))}
                </View>
            ))}

            {/* Lista de Compras */}
            <View style={styles.shoppingSection}>
                <Text style={styles.shoppingTitle}>Lista de Compras</Text>
                <View style={styles.shoppingGrid}>
                    {Object.entries(mealPlan.shoppingList).map(([category, items]) => (
                        <View key={category} style={styles.shoppingCategory}>
                            <Text style={styles.shoppingCategoryTitle}>{category}</Text>
                            {(items as string[]).map((item: string, idx: number) => (
                                <Text key={idx} style={styles.shoppingItem}>- {item}</Text>
                            ))}
                        </View>
                    ))}
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerBrand}>Gerado por FitChef.pro</Text>
                <Text style={styles.footerText}>Plano alimentar personalizado - Pagina 2/2</Text>
            </View>
        </Page>
    </Document>
);

// Componente exportável com botão de download
interface PDFRendererProps {
    mealPlan: MealPlan;
}

export default function PDFRenderer({ mealPlan }: PDFRendererProps) {
    const [isGenerating, setIsGenerating] = useState(false);

    // Nome do arquivo limpo (sem caracteres especiais)
    const sanitizedName = mealPlan.clientName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-zA-Z0-9\s]/g, '')  // Remove caracteres especiais
        .replace(/\s+/g, '-')            // Espaços viram hífens
        .toLowerCase();

    const fileName = `plano-alimentar-${sanitizedName}.pdf`;

    const handleDownload = async () => {
        setIsGenerating(true);

        try {
            console.log('Iniciando geração do PDF...');

            // Gerar o documento PDF
            const pdfDoc = pdf(<MealPlanPDF mealPlan={mealPlan} />);

            // Converter para blob
            const blob = await pdfDoc.toBlob();

            console.log('PDF gerado, tamanho:', blob.size, 'bytes');
            console.log('Usando file-saver para download:', fileName);

            // Usar file-saver para garantir download com nome correto
            saveAs(blob, fileName);

            console.log('Download iniciado com sucesso!');

        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            alert('Erro ao gerar o PDF. Por favor, tente novamente.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Button
            onClick={handleDownload}
            disabled={isGenerating}
        >
            {isGenerating ? (
                <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Gerando PDF...
                </>
            ) : (
                <>
                    <Download size={18} className="mr-2" />
                    Baixar PDF
                </>
            )}
        </Button>
    );
}

// Exportar componente do documento para uso externo
export { MealPlanPDF };

