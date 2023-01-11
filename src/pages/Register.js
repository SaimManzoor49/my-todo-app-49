import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BgAnimated from '../components/BgAnimated';
import { createUserWithEmailAndPassword } from '../../node_modules/firebase/auth';
import { auth, firestore } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore/lite';
import { AuthContext } from '../context/Authcontext';
export default function Register() {

    const {authe}=useContext(AuthContext)

    const navigate=useNavigate()

    if(authe){
    navigate('/')
}


    const initialstate = { email: "", password: "" }

    const [state, setState] = useState(initialstate)
    const [isProcessing, setProcessing] = useState(false)

    const {setAuth} = useContext(AuthContext)

    const handleChange = (e) => {

        const { name, value } = e.target;

        setState((s) => ({ ...s, [name]: value }))

    }

    const handleRegister = (e) => {
        e.preventDefault();
        setProcessing(true);

        let { email, password } = state

        password=password.trim()
        if(password.length<6)
        {
            window.notify('Password is too short',"warning")
            setProcessing(false)
            return
        }
        
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            let user = userCredential.user
            setDocument(user);
            console.log("user created ")
        }).catch((error) => {
             console.error(error); setProcessing(false) 
             window.notify(error.message,"warning")
            
            });
        


        // setProcessing(false);
    }


    const setDocument = async (user) => {

        try {
            await setDoc(doc(firestore, "users", user.uid), {
                firstName: "",
                lastName: "",
                uid: user.uid
            });
            console.log("user doc created ")
        } catch (error) {
            console.log(error)
        }
        setProcessing(false)
        setAuth(true)
    }



    return (
        <>


            <div className="container-fluid  d-flex align-items-center justify-content-center flex-column  " style={{ minHeight: "100vh" }} >
                <div className="row   ">
                    <div className="col-12 col-sm-6 col-md-6 w1  ms-auto me-auto  py-sm-4 py-md-0 py-4 rounded-3 shadow-lg bg-transparent mt-5 d-flex align-items-center justify-content-center flex-column " style={{ maxHeight: "73vh" }}>
                        <h2 className='text-center border-bottom border-3 border-dark mb-'>Register here!</h2>



                        <form onSubmit={handleRegister}>
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
                                {/* <Link className='fw-bold text-' >Forgot Password?</Link> */}
                            </div>

                            <div className="text-center">
                                <button type="submit" disabled={isProcessing} className="btn mt- btn-primary  btn-hover px-4 fs-5 py-1">{isProcessing ? <div className='spinner-border spinner-border-sm mb-1'></div> : <>Take me in!</>}</button>

                            </div>
                        </form>




                    </div>


                    <div className="col-12 col-sm-6 col-md-6 py-3 w2  ms-auto me-auto d-flex rounded-3 shadoww text-white bg align-items-center justify-content-center flex-column minus " style={{ minHeight: "79vh" }}>
                        {/* <BgAnimated1 /> */}
                        <div className='w2-text'>
                            <h1 className='text-center mt-5'>Welcome</h1>
                            <h5 className='text-center'>Enter your details and start joureny with us!</h5>
                            <div className='text-center'> <Link to={'/login'} className='btn btn-bl btn-lg shadow-lg px-4 mt-1 btn-hover2  ' >LOGIN</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BgAnimated />
        </>
    )
}
