import React from 'react';import {createRoot} from 'react-dom/client';import {HashRouter} from 'react-router-dom';
import App from './App';import {AppProvider} from './context/AppContext';import {AuthProvider} from './context/AuthContext';import './styles/styles.css';
createRoot(document.getElementById('root')).render(<HashRouter><AuthProvider><AppProvider><App/></AppProvider></AuthProvider></HashRouter>);
