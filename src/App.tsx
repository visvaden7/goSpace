import {FunctionComponent} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import {ChatbotPage} from './pages/Chatbot';
import {Results} from './pages/Results';
import {MainLayout} from './layouts/MainLayout';
import {Press} from "./pages/Press.tsx";

const App: FunctionComponent = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chatbot" element={<ChatbotPage />} />
                    <Route path="/results" element={<Results />} />
                  <Route path="/press" element={<Press />} />
                </Routes>
            </MainLayout>
        </Router>
    );
};

export default App;