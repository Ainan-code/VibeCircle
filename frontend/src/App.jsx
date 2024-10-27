import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Signup from './pages/signup/SignupPage';
import Login from './pages/login/LoginPage';


function App() {
 

  return (
    <div className='flex max-w-6xl mx-auto'>
     <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
     </Routes>
    </div>
  )
}

export default App
