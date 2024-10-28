import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Signup from './pages/signup/SignupPage';
import Login from './pages/login/LoginPage';
import Sidebar from './components/common/Sidebar';
import RightPanel from './components/common/RightPanel';
import NotificationPage from './pages/notification/NotificationPage';
import ProfilePage from './pages/profile/ProfilePage';


function App() {
 

  return (
    <div className='flex max-w-6xl mx-auto'>
      <Sidebar/>
     <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/notifications' element={<NotificationPage/>}/>
      <Route path='/profile/:username' element={<ProfilePage/>}/>
     </Routes>
     <RightPanel/>
    </div>
  )
}

export default App
