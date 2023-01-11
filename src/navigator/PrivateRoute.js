import React, { useContext } from 'react'
import { AuthContext } from '../context/Authcontext'
import Login from '../pages/Login';

export default function PrivateRoute(props) {

const {authe}=useContext(AuthContext)
const {Component} = props

if(authe)
return Component;
  return (
    <Login />
  )
}
