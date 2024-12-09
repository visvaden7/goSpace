import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ChatbotPage from './pages/Chatbot';
import Results from './pages/Results';
import MainLayout from './layouts/MainLayout';

const App: React.FC = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chatbot" element={<ChatbotPage />} />
                    <Route path="/results" element={<Results />} />
                </Routes>
            </MainLayout>
        </Router>
    );
};

export default App;