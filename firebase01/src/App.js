import './App.scss';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import Routes from './navigator/Routes';
import { useState } from 'react';
import Loading from './components/Loading';

function App() {
  const [isLoading , setLoading]=useState(true)

  setTimeout(() => {{setLoading(false)}},780)
  return (
    <>

      <div className='container' >
        <div className='row'>
          <div className='col'>
            {isLoading ?<div className=''> <Loading /></div>: <Routes />}
            
            
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
