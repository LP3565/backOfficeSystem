import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { store } from './store'

import { HashRouter, Routes, Route } from 'react-router-dom'

import App from './App.tsx'
import { AuthProvider } from './context/AuthProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <AuthProvider>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </AuthProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
)
