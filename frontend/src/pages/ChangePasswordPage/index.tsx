import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { selectUser, useAppDispatch, useAppSelector } from '../../app/hooks';
import ModalConfirm from '../../components/ModalConfirm';
import TextInput from '../../components/TextInput';
import { SetMenuActive } from '../../slices/ConfigSlice';
import { PutChangePassword } from '../../slices/UserSlice';

export interface IFormChange {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

type Props = {
  name: string;
};

const ChangePasswordPage = ({ name }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(SetMenuActive(name));
  }, [dispatch, name]);
  const { formResult } = useAppSelector(selectUser);

  const {
    register,
    handleSubmit,
    setError,
    // watch,
    setValue,
    formState: { errors },
  } = useForm<IFormChange>();

  const inputs = [
    {
      name: 'oldPassword',
      type: 'password',
      // label: 'What is your username, ',
      placeholder: 'Old Password',
      register: register('oldPassword', {
        required: 'Old Password harus diisi',
      }),
      errors: errors,
      // defaultValue: 'superadmin',
    },
    {
      name: 'newPassword',
      type: 'password',
      // label: 'and your password?',
      placeholder: 'New Password',
      register: register('newPassword', {
        required: 'New Password harus diisi',
      }),
      errors: errors,
      // defaultValue: '123456',
    },
    {
      name: 'confirmNewPassword',
      type: 'password',
      // label: 'and your password?',
      placeholder: 'Confirm New Password',
      register: register('confirmNewPassword', {
        required: 'Confirm New Password harus diisi',
      }),
      errors: errors,
      // defaultValue: '123456',
    },
  ];

  useEffect(() => {
    if (formResult?.success) {
      setValue('oldPassword', '');
      setValue('newPassword', '');
      setValue('confirmNewPassword', '');
    }
  }, [formResult, setValue]);

  const [modalConfirm, setModalConfirm] = useState<any | null>(null);
  const formSubmit: SubmitHandler<IFormChange> = (data) => {
    if (data?.newPassword !== data?.confirmNewPassword) {
      setError('confirmNewPassword', { message: 'Password tidak sesuai' });
      return;
    }
    setModalConfirm({
      message: 'Are you sure want to update this data?',
      yesAction: () => {
        setModalConfirm(null);
        dispatch(PutChangePassword(data));
      },
      noAction: () => setModalConfirm(null),
      checked: true,
    });
  };

  return (
    <div className='flex justify-center h-full overflow-y-auto'>
      <form className='w-full max-w-lg' onSubmit={handleSubmit(formSubmit)}>
        <div className='flex flex-row items-center justify-center lg:justify-start mb-2'>
          <p className='text-xl text-center w-full text-black py-2'>
            Change Password
          </p>
        </div>
        {inputs.map((item) => {
          return <TextInput key={item.name} {...item} />;
        })}

        <div className='text-center mt-4 mb-2'>
          <button className='btn btn-primary px-5 w-full mb-2' type='submit'>
            Update
          </button>
        </div>
      </form>
      <ModalConfirm {...modalConfirm} />
    </div>
  );
};

export default ChangePasswordPage;
