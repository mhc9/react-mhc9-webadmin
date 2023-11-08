import React from "react";
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './DefaultLayout';
import GuardRoute from './components/GuardRoute';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PostList from "./pages/Posts/List";
import AddPost from "./pages/Posts/Add";

function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />} >
                <Route index element={<GuardRoute><Home /></GuardRoute>} />
                {/* Post */}
                <Route path="posts" element={<GuardRoute><PostList /></GuardRoute>} />
                <Route path="posts/new" element={<GuardRoute><AddPost /></GuardRoute>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
