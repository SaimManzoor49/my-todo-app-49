import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgetPassword from '../pages/ForgetPassword';
import Login from '../pages/Login';
import Register from '../pages/Register';
export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
            </Routes>
        </BrowserRouter>
    )
}
