import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
//import { ArticlesContext } from './hooks/ArticlesContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ArticlesContext> */}
        <App />
      {/* </ArticlesContext> */}
    </BrowserRouter>
  </React.StrictMode>,
)