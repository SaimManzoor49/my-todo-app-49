import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BgAnimated from '../components/BgAnimated'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { AuthContext } from '../context/Authcontext'

export default function Login() {
    
    const {  setAuth  ,setUserr } = useContext(AuthContext)
    
    const initialstate = { email: "", password: "" }
    
    const [state, setState] = useState(initialstate)
    const [isProcessing, setProcessing] = useState(false)
    
    
    const navigate = useNavigate();
   

                                       

    const handleChange = (e) => {

        const { name, value } = e.target;

        setState((s) => ({ ...s, [name]: value }))



    }


    const handleLogin = (e) => {
        e.preventDefault();
        setProcessing(true);


        const { email, password } = state

        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            let user = userCredentials.user
            setUserr(user);


            // console.log(user)
            // console.log(userr)
            setAuth(true)
            navigate("/")
        }).catch((error) => {
             console.log(error) 
            window.notify(error.message, 'error')
            }).finally(() => { setProcessing(false) })



    }


    return (
        <>


            <div className="container-fluid  d-flex align-items-center justify-content-center flex-column  " style={{ minHeight: "100vh" }} >
                <div className="row   ">
                    <div className="col-12 col-sm-6 col-md-6 w1    ms-auto me-auto   col-xxl-6          py-sm-4 py-md-0 py-4 rounded-3 shadow-lg bg-transparent mt-5 d-flex align-items-center justify-content-center flex-column " style={{ maxHeight: "73vh" }}>
                        <h2 className='text-center border-bottom border-3 border-dark mb-'>Login Please!</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-2  border-start mb-4">
                                <input type="email" name='email' onChange={handleChange} className="py-1 fs form-control border-0 border-start border-primary border-5" placeholder='   |  Input your email here!' id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <small id="emailHelp" className=" form-text disabled ">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="mb-2">
                                <input type="password" name='password' onChange={handleChange} className="py-1 fs form-control border-0 border-start border-primary border-5" placeholder='   |  Input your password here!' id="exampleInputPassword1" />
                            </div>
                            <div className="mb-4 d-flex justify-content-between form-check">
                                <div > <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" >Remember me!</label>
                                </div>
                                <Link to={"/forgetpassword"} className='fw-bold text-' >Forgot Password?</Link>
                            </div>
                            <div className="text-center">
                                <button disabled={isProcessing} type="submit" className="btn mt- btn-primary mt- btn-hover px-4 fs-5 py-1">{isProcessing ? <div className='spinner-border spinner-border-sm mb-1'></div> : <>LOGIN</>}</button>
                            </div>
                        </form>
                    </div>

                    <div className="col-12 col-sm-6 col-md-6 py-3 w2   ms-auto me-auto text-center   col-xxl-6       d-flex rounded-3 shadoww text-white bg align-items-center justify-content-center flex-column minus " style={{ minHeight: "79vh" }}>
                        {/* <BgAnimated1 /> */}
                        <div className='w2-text'>
                            <h1 className='text-center mt-5'>Welcome</h1>
                            <h5 className='text-center'>Enter your details and start joureny with us!</h5>
                            <div className='text-center'> <Link to={'/register'} className='btn btn-bl btn-lg shadow-lg px-4 mt-1 btn-hover2  ' >SIGNUP</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BgAnimated />
        </>
    )
}
