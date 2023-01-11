import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

export default function Header() {

    const navigate = useNavigate()

    const [date, setDate] = useState('')
    const { authe, setAuth, setUserr } = useContext(AuthContext)

    useEffect(() => {
        setInterval(() => {
            setDate(dayjs().format("dddd D, MMMM YYYY, hh:mm A"))

        }, 1)

    }, [])
    // console.log(auth)



    const handleSignout = () => {

        signOut(auth)
            .then(() => {
                setUserr(false)
                setAuth(false)
                //    console.log(userr)


                navigate('/login')
            })
            .catch((err) => { console.log(err) })

    }

    return (

        <>
            <header>
                <div className="container-fluid ">
                    <div className="row  text-white ">
                        <div className="col bg-primary">
                            <div className="top-bar py-1 text-center">{date}</div>
                        </div>

                        <div className="row">

                            <nav className="navbar navbar-expand-lg bg-transparent">
                                <div className="container">
                                    <Link to={"/"} className="navbar-brand" href="#">My-Todos</Link>
                                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> */}
                                    {/* <span className="navbar-toggler-icon"></span> */}
                                    {/* </button> */}
                                    <Link to={'/'} className="nav-link active text-black" aria-current="page" href="#">Home</Link>
                                    <div className=" d-flex " >

                                        {authe
                                            ?
                                            <button className="btn btn-primary" onClick={handleSignout}>SignOut</button>
                                            :
                                            <form className="d-flex" role="search">
                                                <Link to={'/login'} className="btn btn-primary" type="submit">Login</Link>
                                            </form>
                                        }

                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header >
        </>
    )
}
