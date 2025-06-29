import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './styles/theme.less'

createRoot(document.getElementById('root')!).render(<App />)
