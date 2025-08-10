
import './App.css'
import Login from './pages/login'
import Singup from './pages/singup';
import Home from './pages/home';
import OtpVerify from'./pages/otpverification';
import{Routes,Route, Navigate} from 'react-router-dom';
function App() {
  
  return (
    <>
    <Routes>
    <Route path='/' element={<Navigate to ='/login'></Navigate>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/singup' element={<Singup></Singup>}></Route>
      <Route path='/otpverification' element={<OtpVerify></OtpVerify>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>
    </Routes>
    </>
  )
}

export default App
