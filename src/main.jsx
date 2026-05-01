import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from './redux/store.js'
export const serverurl = import.meta.env.VITE_BACKEND_URL

createRoot(document.getElementById('root')).render(
    <BrowserRouter> {/* react-router */}
    <Provider store={store}> {/* redux */}
    <App />
    </Provider>
    </BrowserRouter>
)
