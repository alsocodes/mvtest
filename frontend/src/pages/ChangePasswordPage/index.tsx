import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { SetMenuActive } from '../../slices/ConfigSlice';

type Props = {
  name: string;
};
const ChangePasswordPage = ({ name }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(SetMenuActive(name));
  }, [dispatch, name]);
  return <div>ChangePasswordPage</div>;
};

export default ChangePasswordPage;
