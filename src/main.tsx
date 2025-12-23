/**
 * FitChef.pro - Entry Point
 * 
 * Ponto de entrada da aplicação React.
 * 
 * @author FitChef Team
 * @version 1.0.0
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
