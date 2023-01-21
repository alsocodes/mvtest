import React, { useEffect } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { selectHome, useAppDispatch, useAppSelector } from '../../app/hooks';
import CardPost from '../../components/CardPost';
import Pagination from '../../components/Pagination';
import { SetMenuActive } from '../../slices/ConfigSlice';
import { GetPosts } from '../../slices/HomeSlice';
import { Post } from '../../slices/PostSlice';

type Props = {
  name: string;
};

const HomePage = ({ name }: Props) => {
  const dispatch = useAppDispatch();
  const { data, pagination } = useAppSelector(selectHome);

  useEffect(() => {
    dispatch(SetMenuActive(name));
  }, [dispatch, name]);

  useEffect(() => {
    dispatch(GetPosts({ page: 1, limit: 8 }));
  }, [dispatch]);

  const OnPaginationAction = () => {};
  return (
    <div className='h-full w-full'>
      <div>
        <input
          type='text'
          placeholder='Search by Tag or Caption'
          className='input w-full max-w-xs input-bordered'
        />
      </div>
      {pagination?.total === 0 ? (
        <div className='flex gap-4 justify-center align-middle items-center h-full'>
          <IoWarningOutline size={40} />
          <span className='text-2xl text-error'>No Data Availabel</span>
        </div>
      ) : (
        // </div>
        <div>
          <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {data?.map((row: Post) => {
              return <CardPost {...row} />;
            })}
          </div>
          <Pagination {...pagination} action={OnPaginationAction} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
