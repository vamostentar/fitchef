/**
 * FitChef.pro - Componente Card
 * 
 * Card com efeito glassmorphism para containers de conteúdo.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
};

export default function Card({
    children,
    className = '',
    hover = false,
    glow = false,
    padding = 'md'
}: CardProps) {
    const baseClasses = hover ? 'glass-card-hover' : 'glass-card';
    const glowClasses = glow ? 'shadow-glow' : '';
    const padClasses = paddingClasses[padding];

    return (
        <div className={`${baseClasses} ${padClasses} ${glowClasses} ${className}`}>
            {children}
        </div>
    );
}
