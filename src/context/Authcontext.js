import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';

export const AuthContext = createContext();
// export const userContext = createContext();

export default function AuthcontextProvider(props) {


  const initialState = false;
  const initialUser = {};

  const [authe, setAuth] = useState(initialState)
  const [userr, setUserr] = useState(initialUser)
  const [view, setView] = useState({})
  const [isLoading, setLoading] = useState(true)
  console.log(isLoading)
  
  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setAuth(true)
        setUserr(user)
        // ...
      } else {
        // User is signed out
        // ...
      }
      
      setLoading(false)
      console.log(isLoading)
    });
    
    
  }, [])
  
  
  return (

    <AuthContext.Provider value={{ authe, setAuth, userr, setUserr, view, setView, isLoading, setLoading }} >
      {props.children}
    </AuthContext.Provider>
  )
}
