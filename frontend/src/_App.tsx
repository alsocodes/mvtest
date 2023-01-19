import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { selectAuth, useAppSelector } from './app/hooks';
import Sidebar from './components/Sidebar';
import ChangePasswordPage from './pages/ChangePasswordPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotfoundPage from './pages/Notfound';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';

const App = () => {
  const { loggedIn } = useAppSelector(selectAuth);

  return (
    <div>
      <BrowserRouter>
        {loggedIn ? (
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='*' element={<Navigate replace to='/login' />} />
          </Routes>
        ) : (
          <MainLayout />
        )}
      </BrowserRouter>
    </div>
  );
};

const MainLayout = () => {
  return (
    <div className='h-screen'>
      <Sidebar>
        <Routes>
          <Route path='/home' element={<HomePage name='HOME' />} />
          <Route path='/user' element={<UserPage name='USER' />} />
          <Route
            path='/change-password'
            element={<ChangePasswordPage name='CHANGE PASSWORD' />}
          />
          <Route path='/post' element={<PostPage name='POST' />} />
          <Route path='*' element={<NotfoundPage />} />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default App;
