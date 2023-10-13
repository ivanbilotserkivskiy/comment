import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SharedStateProvider } from './store/store.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SharedStateProvider>
    <App />
    </SharedStateProvider>
  </React.StrictMode>,
)
