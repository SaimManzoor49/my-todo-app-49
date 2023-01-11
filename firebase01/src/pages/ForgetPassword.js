import React from 'react'
import { Link } from 'react-router-dom'
import BgAnimated from '../components/BgAnimated'

export default function ForgetPassword() {
    return (
        <>


            <div className="container-fluid  d-flex align-items-center justify-content-center flex-column  " style={{ minHeight: "100vh" }} >
                <div className="row   ">
                    <div className="col-12 col-sm-6 col-md-6 w1   py-sm-4 py-md-0 py-4 rounded-3 shadow-lg bg-transparent mt-5 d-flex align-items-center justify-content-center flex-column " style={{ maxHeight: "73vh" }}>
                        <h2 className='text-center border-bottom border-3 border-dark mb-'>Get your password!</h2>



                        <form className='mt-'>
                            <div className="mb-2  border-start mb-4">
                                <input type="email" className="py-1 fs form-control my-2 border-0 border-start border-primary border-5" placeholder='   |  Enter your email here!' id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <small id="emailHelp" className=" form-text disabled ">We'll never share your email with anyone else.</small>
                            </div>
                            {/* <div className="mb-2">
                                <input type="password" className="py-1 fs form-control border-0 border-start border-primary border-5" placeholder='   |  Input your password here!' id="exampleInputPassword1" />
                            </div> */}
                            <div className="mb-4 d-flex justify-content-between form-check">
                               <div > 
                                {/* <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" >Remember me!</label> */}
                                </div>
                                {/* <Link className='fw-bold text-' >Forgot Password?</Link> */}
                            </div>
                            
                            <div className="text-center">
                            <button type="submit" className="btn mt- btn-primary mt- btn-hover px-4 fs-5 py-1">Get Password!</button>

                            </div>
                        </form>




                    </div>


                    <div className="col-12 col-sm-6 col-md-6 py-3 w2  d-flex rounded-3 shadoww text-white bg align-items-center justify-content-center flex-column minus " style={{ minHeight: "79vh" }}>
                        {/* <BgAnimated1 /> */}
                        <div className='w2-text'>
                        <h1 className='text-center mt-5'>Welcome</h1>
                        <h5 className='text-center'>Enter your details and start joureny with us!</h5>
                       <div className='text-center'> <Link to={'/'} className='btn btn-bl btn-lg shadow-lg px-4 mt-1 btn-hover2  ' >LOGIN</Link>
                       </div>
                        </div>
                    </div>
                </div>
            </div>

            <BgAnimated />
        </>
    )
}
