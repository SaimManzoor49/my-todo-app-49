import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';
import ForgetPassword from '../pages/ForgetPassword';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Todo from '../pages/Todo';
import View from '../pages/View';
import PrivateRoute from './PrivateRoute';
export default function Router() {


    const {userr}=useContext(AuthContext)

    return (




        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivateRoute Component={<Todo/>} />} />
                {/* <Route path="/" element={<Todo />} /> */}
                <Route path="/login" element={userr.uid?<Todo/>:<Login />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/register" element={userr.uid?<Todo/>:<Register />} />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
                <Route path="/view" element={<View />} />
            </Routes>
        </BrowserRouter>
    )
}
