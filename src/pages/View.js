import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BgAnimated from '../components/BgAnimated'
import Header from '../components/Header'
import { AuthContext } from '../context/Authcontext'

export default function View() {
const {view}=useContext(AuthContext)
const navigate=useNavigate();

const{title,location,description}=view


if(!view.title)
{

    navigate("/")


}


  return (
    <>
    <Header />
<div className="container">
    <div className="row mt-4">
        <div className="col">
    <div className="d-flex align-items-center justify-content-center flex-column " style={{minHeight:"70vh"}}>
    <h1 className='text-primary '>Title: </h1>
    <h3 > {title}</h3>
    <h1 className='text-primary'>Location: </h1>
    <h3 > {location}</h3>
    <h1  className='text-primary'>Description: </h1>
    <h3 >  {description}</h3>
    <div className="text-end">

    <Link className='fs-3 ' to={"/"}>Go to Home</Link>
    </div>
    </div>

        </div>
    </div>
</div>

    
    <BgAnimated />
    </>
  )
}
