import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoImageOutline } from 'react-icons/io5';

import TextInput from '../../components/TextInput';
// import { PostLogin } from '../../slices/AuthSlice';

export interface IFormRegister {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  photo: string;
}

const RegisterPage = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const { loggedIn } = useTypedSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<IFormRegister>();

  const inputs = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      register: register('name', { required: 'Name harus diisi' }),
      errors: errors,
    },
    {
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      register: register('username', { required: 'Username harus diisi' }),
      errors: errors,
    },
    {
      name: 'email',
      type: 'text',
      placeholder: 'Email',
      register: register('email', { required: 'Email harus diisi' }),
      errors: errors,
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      register: register('password', { required: 'Password harus diisi' }),
      errors: errors,
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      register: register('confirmPassword', {
        required: 'ConfirmPassword harus diisi',
      }),
      errors: errors,
    },
  ];

  const formSubmit: SubmitHandler<IFormRegister> = (data) => {
    // console.log(data);
    // dispatch(setToast({ type: 'error', message: 'Wrong username or password' }));
    // dispatch(PostLogin(data));
  };

  return (
    <section className='h-screen'>
      <div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
        <div className='xl:w-5/12 lg:w-5/12 md:w-8/12 w-full py-10 px-20 border border-primary rounded-lg'>
          <div className='items-center justify-center flex w-full h-full flex-grow'>
            <form className='w-full' onSubmit={handleSubmit(formSubmit)}>
              <div className='flex flex-row items-center justify-center lg:justify-start mb-2'>
                <p className='text-xl text-center w-full text-black py-2'>
                  Register
                </p>
              </div>
              {inputs.map((item) => {
                return <TextInput key={item.name} {...item} />;
              })}

              {/* <TextInput
                placeholder='Photo'
                name='photo'
                type='image'
                register={register('photo', { required: true })}
                errors={errors}
              /> */}

              <div className='form-control w-full'>
                <label className='label'></label>
                <div className='flex'>
                  <input
                    type={'text'}
                    placeholder={'Photo'}
                    id={'photo'}
                    readOnly={true}
                    {...register('photo', { required: true })}
                    className={`input flex-grow input-bordered w-full rounded-r-none`}
                  />
                  <button
                    type='button'
                    className='btn btn-outline btn-primary rounded-l-none'
                  >
                    Browse
                  </button>
                </div>
                <div className='border rounded-md w-36 h-36 mt-2 border-gray-300 flex justify-center'>
                  <IoImageOutline className='text-gray-400 text-8xl self-center' />
                </div>
              </div>
              <div className='text-center mt-8 mb-4'>
                <button className='btn btn-primary px-5 w-full' type='submit'>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
