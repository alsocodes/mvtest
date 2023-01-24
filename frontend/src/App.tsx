import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  selectAuth,
  selectConfig,
  useAppDispatch,
  useAppSelector,
} from './app/hooks';
import Progressbar from './components/Progressbar';
import Sidebar from './components/Sidebar';
import ChangePasswordPage from './pages/ChangePasswordPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SetToastData } from './slices/ConfigSlice';

const App = () => {
  const { loggedIn } = useAppSelector(selectAuth);
  const { toastData, progress } = useAppSelector(selectConfig);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!toastData) return;

    const { type, message } = toastData;

    switch (type) {
      case 'error':
        toast.error(message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        break;

      case 'success':
        toast.success(message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        break;

      default:
        toast(message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        break;
    }
    dispatch(SetToastData(null));
  }, [toastData, dispatch]);

  const [progressValue, setProgressValue] = useState(0);
  useEffect(() => {
    if (!progress) {
      setProgressValue(100);
      const sto = setTimeout(() => setProgressValue(0), 10);
      return () => clearTimeout(sto);
    } else {
      setProgressValue(10);
      const sto1 = setTimeout(() => {
        setProgressValue(95);
        // const sto2 = setTimeout(() => setProgressValue(95), 100);
        // return clearTimeout(sto2);
      }, 100);

      return () => clearTimeout(sto1);
    }
  }, [progress]);
  // console.log(progress);

  return (
    <div>
      <Progressbar progressValue={progressValue} />
      <BrowserRouter>
        {!loggedIn ? (
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='*' element={<Navigate replace to='/login' />} />
          </Routes>
        ) : (
          <MainLayout />
        )}
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

const MainLayout = () => {
  return (
    <div className='h-screen overflow-hidden'>
      <Sidebar>
        <Routes>
          <Route path='/' element={<HomePage name='HOME' />} />
          <Route path='/user' element={<UserPage name='USER' />} />
          <Route
            path='/change-password'
            element={<ChangePasswordPage name='CHANGE PASSWORD' />}
          />
          <Route path='/post' element={<PostPage name='POST' />} />
          <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default App;
