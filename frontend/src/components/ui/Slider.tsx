/**
 * FitChef.pro - Componente Slider
 * 
 * Slider para seleção de valores numéricos (ex: calorias).
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

interface SliderProps {
    label?: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    showValue?: boolean;
    showMinMax?: boolean;
}

export default function Slider({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    unit = '',
    showValue = true,
    showMinMax = true
}: SliderProps) {
    // Calcular porcentagem para o preenchimento visual
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="w-full">
            {/* Header com label e valor */}
            <div className="flex items-center justify-between mb-3">
                {label && (
                    <label className="input-label mb-0">{label}</label>
                )}
                {showValue && (
                    <span className="text-lg font-semibold text-emerald-400">
                        {value.toLocaleString('pt-BR')}{unit && ` ${unit}`}
                    </span>
                )}
            </div>

            {/* Slider Container */}
            <div className="relative">
                {/* Track Background */}
                <div className="absolute inset-0 h-2 bg-dark-800 rounded-full top-1/2 -translate-y-1/2" />

                {/* Track Fill */}
                <div
                    className="absolute h-2 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full top-1/2 -translate-y-1/2 transition-all duration-150"
                    style={{ width: `${percentage}%` }}
                />

                {/* Input */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="slider-track relative z-10 w-full"
                    style={{
                        background: 'transparent'
                    }}
                />
            </div>

            {/* Min/Max Labels */}
            {showMinMax && (
                <div className="flex justify-between mt-2 text-xs text-dark-500">
                    <span>{min.toLocaleString('pt-BR')}{unit}</span>
                    <span>{max.toLocaleString('pt-BR')}{unit}</span>
                </div>
            )}
        </div>
    );
}
