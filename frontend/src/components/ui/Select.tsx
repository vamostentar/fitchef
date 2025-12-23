/**
 * FitChef.pro - Componente Select
 * 
 * Dropdown customizado com estilo Cyber-Fitness.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, placeholder, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="input-label">
                        {label}
                        {props.required && <span className="text-emerald-500 ml-1">*</span>}
                    </label>
                )}

                <select
                    ref={ref}
                    className={`
            select-field
            ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
            ${className}
          `}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {error && (
                    <p className="mt-1 text-xs text-red-400">{error}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;
