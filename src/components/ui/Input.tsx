/**
 * FitChef.pro - Componente Input
 * 
 * Campo de texto customizado com label e mensagem de erro.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="input-label">
                        {label}
                        {props.required && <span className="text-emerald-500 ml-1">*</span>}
                    </label>
                )}

                <input
                    ref={ref}
                    className={`
            input-field
            ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
            ${className}
          `}
                    {...props}
                />

                {hint && !error && (
                    <p className="mt-1 text-xs text-dark-500">{hint}</p>
                )}

                {error && (
                    <p className="mt-1 text-xs text-red-400">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
