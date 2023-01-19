import React, { useEffect } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { selectHome, useAppDispatch, useAppSelector } from '../../app/hooks';
import { SetMenuActive } from '../../slices/ConfigSlice';
import { Post } from '../../slices/HomeSlice';

type Props = {
  name: string;
};

const HomePage = ({ name }: Props) => {
  const dispatch = useAppDispatch();
  const { data, total, page, limit } = useAppSelector(selectHome);

  useEffect(() => {
    dispatch(SetMenuActive(name));
  }, [dispatch, name]);

  return (
    <div className='h-full w-full'>
      <div>
        <input
          type='text'
          placeholder='Search by Tag or Caption'
          className='input w-full max-w-xs input-bordered'
        />
      </div>
      {total === 0 ? (
        <div className='flex gap-4 justify-center align-middle items-center h-full'>
          <IoWarningOutline size={40} />
          <span className='text-2xl text-error'>No Data Availabel</span>
        </div>
      ) : (
        // </div>
        <div>
          <div className='flex flex-wrap  w-full max-w-full border-red-500 overflow-hidden border'>
            {data?.map(({ caption, image, like, tags }: Post) => {
              return (
                <div className='border rounded-md w-1/4'>
                  <img src={image} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
