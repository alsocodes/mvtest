import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoImageOutline } from 'react-icons/io5';
import { selectUser, useAppDispatch, useAppSelector } from '../../app/hooks';
import ModalConfirm from '../../components/ModalConfirm';

import TextInput from '../../components/TextInput';
import { PostUpload } from '../../slices/AuthSlice';
import { SetMenuActive } from '../../slices/ConfigSlice';
import { GetUser, PutUpdateUser } from '../../slices/UserSlice';
import { createFormData } from '../../utils/Helper';

export interface IFormUpdateUser {
  name: string;
  username: string;
  email: string;
  photo: string;
}

type Props = {
  name: string;
};

const UserPage = ({ name }: Props) => {
  const dispatch = useAppDispatch();
  const { data, linkUploaded, uploading, formResult } =
    useAppSelector(selectUser);

  useEffect(() => {
    dispatch(SetMenuActive(name));
  }, [dispatch, name]);

  useEffect(() => {
    dispatch(GetUser());
    if (formResult?.success) {
      setIsEditing(false);
    }
  }, [dispatch, formResult]);

  const {
    register,
    handleSubmit,
    // watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IFormUpdateUser>();

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
  ];

  const [modalConfirm, setModalConfirm] = useState<any | null>(null);

  const formSubmit: SubmitHandler<IFormUpdateUser> = (data) => {
    setModalConfirm({
      message: 'Are you sure want to update this data?',
      yesAction: () => {
        setModalConfirm(null);
        dispatch(PutUpdateUser(data));
      },
      noAction: () => setModalConfirm(null),
      checked: true,
    });
  };

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [dispImage, setDispImage] = useState<any>(null);

  useEffect(() => {
    if (data) {
      setValue('email', data.email);
      setValue('username', data.username);
      setValue('name', data.name);
      setValue('photo', data.photo);
      setDispImage(data.photo);
    }
  }, [setValue, data]);

  const [isEditing, setIsEditing] = useState(false);

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
    setValue('photo', linkUploaded);
    if (linkUploaded) setDispImage(linkUploaded);
  }, [linkUploaded, setValue]);

  return (
    <div className='flex justify-center'>
      <form className='w-full max-w-lg' onSubmit={handleSubmit(formSubmit)}>
        <div className='flex flex-row items-center justify-center lg:justify-start mb-2'>
          <p className='text-xl text-center w-full text-black py-2'>
            Detail User
          </p>
        </div>
        {inputs.map((item) => {
          return <TextInput key={item.name} {...item} disabled={!isEditing} />;
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
              className={`input flex-grow input-bordered w-full rounded-r-none ${
                !isEditing && 'input-disabled'
              }`}
            />
            <button
              onClick={() => browseFile()}
              type='button'
              className={`btn btn-outline btn-primary rounded-l-none ${
                !isEditing && 'btn-disabled'
              }`}
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

        <div className='flex justify-center gap-2 mt-8 mb-2 w-full'>
          <button
            className='btn btn-outline px-5 mb-2'
            type='button'
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            className={`btn btn-primary px-5 mb-2 ${
              !isEditing && 'btn-disabled'
            }`}
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>

      <ModalConfirm {...modalConfirm} />
    </div>
  );
};

export default UserPage;
