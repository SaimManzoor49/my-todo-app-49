import React, { useContext, useEffect, useRef, useState } from 'react'
import BgAnimated from '../components/BgAnimated'
import Header from '../components/Header'
import { AuthContext } from '../context/Authcontext'
import { setDoc, serverTimestamp, doc, getDocs, collection, deleteDoc, query, where } from 'firebase/firestore/lite'
import { firestore } from '../config/firebase'
import { useNavigate } from 'react-router-dom'





export default function Todo() {

  const initialtodos = []
  const initialstate = {
    title: "",
    location: "",
    description: ""
  }

  const navigate=useNavigate();

  const [todo, setTodo] = useState(initialstate)
  const [todos, setTodos] = useState(initialtodos)
  const [documents, setDocuments] = useState([])
  const [count, setCount] = useState(0)
  const { userr,setView } = useContext(AuthContext);
  const [isProcessing, setProcessing] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [fetchingDoc, setFetchingDoc] = useState(true)

  const Rtitle = useRef(null)
  const Rlocation = useRef(null)
  const Rdescription = useRef(null)


  const Mtitle = useRef(null)
  const Mlocation = useRef(null)
  const Mdescription = useRef(null)
  const Mstatus = useRef(null)


  const randNum = () => Math.random().toString(36).slice(2);



  const fetchTodos = async () => {

    let array = []
    const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", userr.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();

      array.push(data);

    });

    setDocuments(array);
    setFetchingDoc(false);

  }

  // console.log(userr.uid)

  useEffect(() => {
    fetchTodos();
  }, [count])



////////////////////////////////HandleChane////////////////////////////////
  const handleChange = (e) => {

    let { name, value } = e.target

    setTodo((s) => ({ ...s, [name]: value }))




  }


  const clearInput = (i) => {
    i.current.value = ''
  }


////////////////////////////////HandleSubmit////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault()

    let { title, location, description } = todo

    todo.id = randNum();

    title = title.trim()
    location = location.trim()
    description = description.trim()

    if (title.length < 3) {
      clearInput(Rtitle)
      return window.notify('Enter title Correctly', "error")
    }
    if (location.length < 3) {
      clearInput(Rlocation)

      return window.notify('Enter Location Correctly', "error")
    }
    if (description.length < 6) {
      clearInput(Rdescription)

      return window.notify('Enter Description Correctly', "error")
    }


    let formData = { title, location, description }
    formData.dateCreated = serverTimestamp()
    formData.status = "active"
    formData.createdBy = {
      email: userr.email,
      uid: userr.uid
    }
    formData.id = window.getRandomId()

    createDocument(formData)



    setTodos((s) => ([...s, todo]))


    setTodo(initialstate)

    Rtitle.current.value = ''
    Rlocation.current.value = ''
    Rdescription.current.value = ''
  }





////////////////////////////////CreateDocument Function////////////////////////////////
  const createDocument = async (todo) => {
    setProcessing(true)
    try {
      await setDoc(doc(firestore, "todos", todo.id), 
        {...todo}
      );
      window.notify("Todo Added :-)", "success")
      setCount(count + 1)
    } catch (err) {
      console.log(err)
      window.notify("something went wrong :-(", "error")
    }
    setProcessing(false)
  }




  ////////////////Handle Del//////////////////////
  const handleDel = async (t) => {
    setFetchingDoc(true)

    try {
      await deleteDoc(doc(firestore, "todos", t.id));
      setCount(count - 1)
      window.notify("Todo Deleted :-)", "success")
    } catch (err) {
      console.log(err)
      window.notify("something went Wrong :-(", "error")
    }
    let filteredTodos = documents.filter((todo) => { return todo.id !== t.id })
    // setTodos(filteredTodos)

  }



  ////////////////Handle Edit//////////////////////
  const handleEdit = (t) => {

    t.modifiedAt=serverTimestamp()
    t.dateCreated=t.dateCreated;
    
    setTodo((s) => ({ ...s, ...t }))
    
    Mtitle.current.value = t.title
    Mlocation.current.value = t.location
    Mdescription.current.value = t.description
    Mstatus.current.value = t.status
  }
  
  
  
  
  ////////////////////handeleModel (Save Changes Button)////////////////
  const handleSaveChanges = async () => {
    
    
    setEditing(true)
    
    try {
      await setDoc(doc(firestore, "todos", todo.id),
      {...todo}
      , { merge: true });
      setCount(count+1)
      setDocuments((docs)=>([...docs,todo]))
      
      window.notify("Todo Updated Successfully!", "success")
      
    } catch (err) {
      console.log(err)
      window.notify("Something went Wrong :-(", "error")
    }
    
    
    setEditing(false)
    
  }




  /////////////////////////View Todo////////////////////////
  const  viewTodo=(t)=>{


    setView(t)

    
    navigate("/view")

  }

  ///////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Header />


      <div className="container ">



        {/*  ADD Todos */}


        <div className="row ">
          <div className="col col-md-8 py-5 card shadow  mt-5 ms-auto me-auto">
            <h4 className="text-center pb-4">Add Todos</h4>
            <form>
              <div className="row">
                <div className="col-8 ms-auto me-auto  col-md-6 col-offset-3  ">
                  <input type="text" name='title' ref={Rtitle} onChange={handleChange} className='form-control  me-2 ' placeholder='Title' />

                </div>
                <div className="col-8 ms-auto me-auto my-2 my-md-0 col-md-6 col-offset-3  ">
                  <input type="text" name='location' ref={Rlocation} onChange={handleChange} className='form-control  me-2 ' placeholder='Location' />

                </div>
              </div>
              <div className="row mt-3">
                <div className="col-8 col-md-12 col-offset-2 ms-auto me-auto">
                  <textarea name='description' ref={Rdescription} onChange={handleChange} className='form-control ' cols="10" rows="5" placeholder='Description...'></textarea>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col text-center">
                  <button className="btn px-5 py-2 btn-md btn-primary " disabled={isProcessing} onClick={handleSubmit}>{isProcessing ? <div className='spinner-border spinner-border-sm'></div> : <>ADD TODO</>}</button>
                </div>
              </div>
            </form>
          </div>
        </div>


        {/*  Show Todos */}


        <div className="row mt-5">
          <div className="col">
            {fetchingDoc ?
              <div className='text-center'>
                <div className=' spinner-border spinner-border-lg text-primary '></div>
              </div>
              :

              <div className="table-responsive">
                <table className="table table-striped text-center">
                  <thead >
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Location</th>
                      <th scope="col">Description</th>
                      <th scope="col"> Action</th>
                    </tr>
                  </thead>
                  <tbody>


                    {documents.map((t, i) => {
                      return <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{t.title}</td>
                        <td>{t.location}</td>
                        <td>{

                        !t.description.length>25?<>{t.description}</>:<>{t.description.slice(0,25)}...</>
                        
                        }</td>
                        <td>{<>
                          <button className='btn btn-warning  btn-sm' onClick={(e) => { viewTodo(t) }}>View</button>
                          <button className='btn btn-danger mx-1 d-button btn-sm' onClick={(e) => { handleDel(t) }}>Delete</button>
                          <button className='btn btn-primary  m btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => { handleEdit(t) }}>Edit</button>
                          </>}</td>
                      </tr>
                    })}


                  </tbody>
                </table>
              </div>
            }

          </div>
        </div>
      </div>




     
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 " id="exampleModalLabel">Edit Todoe</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">


              <h4 className="text-center pb-4"></h4>
              <form className='mb-5'>
                <div className="row">
                  <div className="col-8 ms-auto me-auto  col-md-6 col-offset-3  ">
                    <input type="text" name='title' ref={Mtitle} onChange={handleChange} className='form-control  me-2 ' placeholder='Title' />

                  </div>
                  <div className="col-8 ms-auto me-auto my-2 my-md-0 col-md-6 col-offset-3  ">
                    <input type="text" name='location' ref={Mlocation} onChange={handleChange} className='form-control  me-2 ' placeholder='Location' />

                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-8 col-md-12 col-offset-2 ms-auto me-auto">
                    <textarea name='description' ref={Mdescription} onChange={handleChange} className='form-control ' cols="10" rows="5" placeholder='Description...'></textarea>
                  </div>
                </div>
                <div className="col-8 ms-auto me-auto my-2 my-md-0 col-md-6 col-offset-3  ">

                  <label htmlFor="exampleDataList" className="fs-4 mt-2 form-label">Status</label>
                  <select name="status" onChange={handleChange} ref={Mstatus} className='form-select form-select-lg' id="">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </form>



            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" disabled={isEditing} onClick={handleSaveChanges} >{isEditing?<div className='spinner-border spinner-border-sm'></div>:<>Save changes</>}</button>
            </div>
          </div>
        </div>
      </div>







      <BgAnimated />
    </>
  )
}
