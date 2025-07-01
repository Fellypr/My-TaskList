import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import App from './App.jsx'

import Login from './pages/Login/Login.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import TelaHome from './pages/TelaHome/TelaHome.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Login />} />
          <Route path="cadastro" element={<Cadastro/>} />
          <Route path="telaHome" element={<TelaHome/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
