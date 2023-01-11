import './App.scss';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import Routes from './navigator/Routes';
import { AuthContext } from './context/Authcontext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading';
import { useContext } from 'react';

function App() {

  const { isLoading } = useContext(AuthContext)





  return (
    <>
      {isLoading ? <Loading /> :
        <main>
          <Routes />
        </main>


      }

      <ToastContainer />
    </>
  );
}

export default App;
