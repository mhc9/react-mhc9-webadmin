import React from "react";
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import GuardRoute from './components/GuardRoute';

function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />} >
                <Route index element={<GuardRoute><Home /></GuardRoute>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
