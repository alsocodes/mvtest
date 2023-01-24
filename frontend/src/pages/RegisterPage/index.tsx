import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoImageOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { selectAuth, useAppDispatch, useAppSelector } from '../../app/hooks';

import TextInput from '../../components/TextInput';
import {
  ClearFormResult,
  PostRegister,
  PostUpload,
} from '../../slices/AuthSlice';
import { createFormData } from '../../utils/Helper';
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
  const dispatch = useAppDispatch();
  const { linkUploaded, uploading, formResult } = useAppSelector(selectAuth);

  const {
    register,
    handleSubmit,
    // watch,
    setError,
    setValue,
    clearErrors,
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
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Password tidak sesuai' });
      return;
    }
    dispatch(PostRegister(data));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (formResult?.success) {
      dispatch(ClearFormResult());
      navigate('/login');
    }
  }, [formResult, dispatch, navigate]);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [dispImage, setDispImage] = useState<any>(null);
  const browseFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const onFileChange = (e: any) => {
    e.preventDefault();

    var file = e.target?.files ? e.target.files[0] : null;
    if (!file) {
      setError('photo', {
        message: 'Photo harus diisi',
      });
      return;
    }

    const { name, type, size } = file;

    if (!type?.startsWith('image/')) {
      return setError('photo', { message: 'Hanya file gambar' });
    }

    const ext = name.split('.');
    // console.log(ext);
    if (ext[1] !== 'png' && ext[1] !== 'jpg' && ext[1] !== 'jpeg') {
      setError('photo', {
        message: 'Hanya .png, .jpg, and .jpeg yang diperbolehkan',
      });
      return;
    }

    if (size > 700000) {
      setError('photo', {
        message: 'Ukuran gambar maksimal 700KB',
      });
      return;
    }

    setDispImage(URL.createObjectURL(file));

    clearErrors('photo');
    const formData = createFormData({ file: file });
    dispatch(PostUpload(formData));
    // console.log(formData);
  };

  useEffect(() => {
    dispatch(ClearFormResult());
  }, [dispatch]);

  useEffect(() => {
    setValue('photo', linkUploaded);
    if (linkUploaded) setDispImage(linkUploaded);
  }, [linkUploaded, setValue]);
  return (
    <section className='h-screen'>
      <div className='flex justify-center items-center flex-wrap h-full g-6 py-4'>
        <div className='w-full max-w-lg py-6 md:py-10 px-6 md:px-20 mx-6 md:mx-0 border border-primary rounded-lg'>
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
              <div className='form-control w-full'>
                <label className='label'></label>
                <div className='flex'>
                  <input
                    type={'text'}
                    placeholder={'Photo'}
                    id={'photo'}
                    readOnly={true}
                    {...register('photo', { required: 'Photo harus diisi' })}
                    className={`input flex-grow input-bordered w-full rounded-r-none`}
                  />
                  <button
                    onClick={() => browseFile()}
                    type='button'
                    className='btn btn-outline btn-primary rounded-l-none'
                  >
                    Browse
                  </button>
                </div>
                <input
                  onChange={(e) => onFileChange(e)}
                  type='file'
                  accept='images/*'
                  ref={inputFileRef}
                  hidden
                />
                <label className='label '>
                  {errors['photo'] && (
                    <span className='label-text-alt text-red-500'>
                      {errors['photo'].message}
                    </span>
                  )}
                </label>
                <div className='border rounded-md overflow-hidden w-36 h-36 mt-2 border-gray-300 flex justify-center'>
                  {dispImage ? (
                    <img src={dispImage} alt='display-tmp' />
                  ) : (
                    <IoImageOutline className='text-gray-400 text-8xl self-center' />
                  )}
                </div>
                {uploading && <progress className='progress w-36'></progress>}
              </div>

              <div className='text-center mt-8 mb-2'>
                <button
                  className='btn btn-primary px-5 w-full mb-2'
                  type='submit'
                >
                  Register
                </button>
                <Link
                  to={'/login'}
                  className='text-sm link link-hover link-primary'
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
