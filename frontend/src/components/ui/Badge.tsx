/**
 * FitChef.pro - Componente Badge/Tag
 * 
 * Tags para exibir informações ou itens removíveis.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { X } from 'lucide-react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'emerald' | 'warning' | 'error';
    onRemove?: () => void;
    size?: 'sm' | 'md';
}

const variantClasses = {
    default: 'bg-dark-800 border-dark-700 text-dark-300',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400'
};

const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
};

export default function Badge({
    children,
    variant = 'default',
    onRemove,
    size = 'md'
}: BadgeProps) {
    return (
        <span className={`
      inline-flex items-center gap-1 rounded-full border
      ${variantClasses[variant]}
      ${sizeClasses[size]}
    `}>
            {children}
            {onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="ml-1 hover:text-white transition-colors"
                >
                    <X size={12} />
                </button>
            )}
        </span>
    );
}
