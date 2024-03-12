import logo from './logo.svg';
import './App.css';
import NavBarView from './Components/NavBarView';
import NavBarComponent from './Components/NavBarComponent';
import { Route, Routes } from 'react-router-dom';
import Home from './View/Home';
import Admin from './View/Admin';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './View/Login';

function App() {
  return (
    <>
      <NavBarView />
      <NavBarComponent />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/admin' element={<Admin />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
