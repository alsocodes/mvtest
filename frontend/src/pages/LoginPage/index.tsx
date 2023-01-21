import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import TextInput from '../../components/TextInput';
import { PostLogin } from '../../slices/AuthSlice';
// import { PostLogin } from '../../slices/AuthSlice';

export interface IFormLogin {
  username: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useAppDispatch();
  // const { loggedIn } = useTypedSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<IFormLogin>();

  const inputs = [
    {
      name: 'username',
      type: 'text',
      // label: 'What is your username, ',
      placeholder: 'Username',
      register: register('username', { required: 'Username harus diisi' }),
      errors: errors,
      // defaultValue: 'superadmin',
    },
    {
      name: 'password',
      type: 'password',
      // label: 'and your password?',
      placeholder: 'Password',
      register: register('password', { required: 'Password harus diisi' }),
      errors: errors,
      // defaultValue: '123456',
    },
  ];

  const formSubmit: SubmitHandler<IFormLogin> = (data) => {
    // console.log(data);
    // dispatch(setToast({ type: 'error', message: 'Wrong username or password' }));
    dispatch(PostLogin(data));
  };

  return (
    <section className='h-screen'>
      <div className='flex justify-center items-center flex-wrap h-full g-6'>
        {/* <div className='xl:w-5/12 lg:w-5/12 md:w-8/12 w-full py-10 px-20 border border-primary rounded-lg'> */}
        <div className='w-full max-w-lg py-10 px-20 border border-primary rounded-lg'>
          <div className='items-center justify-center flex w-full h-full flex-grow'>
            <form className='w-full' onSubmit={handleSubmit(formSubmit)}>
              <div className='flex flex-row items-center justify-center lg:justify-start mb-2'>
                <p className='text-xl text-center w-full text-black py-2'>
                  Login
                </p>
              </div>
              {inputs.map((item) => {
                return <TextInput key={item.name} {...item} />;
              })}

              <div className='text-center mt-4 mb-2'>
                <button
                  className='btn btn-primary px-5 w-full mb-2'
                  type='submit'
                >
                  Login
                </button>
                <Link
                  to={'/register'}
                  className='text-sm link link-hover link-primary'
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
