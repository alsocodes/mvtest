import React from 'react';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { Post } from '../../slices/PostSlice';

const CardPost = ({
  caption,
  image,
  likes,
  tags,
  user,
  liked,
  hasAction,
}: Post) => {
  return (
    <div className='border rounded-md overflow-hidden'>
      <img src={image} alt={caption} />
      <div className='p-2'>
        <div className='flex gap-1 align-middle items-center'>
          <button className='btn btn-ghost btn-sm px-2'>
            {liked ? <IoHeartSharp color='#f00' /> : <IoHeartOutline />}
          </button>
          <span className='text-xs'>{likes}</span>
        </div>
        <div className='flex gap-2'>
          <div className='flex-grow'>
            <h2 className='font-semibold text-sm'>{user.username}</h2>
            <p className='text-sm text-gray-700 w-full line-clamp-2 h-10'>
              {caption}
            </p>
          </div>
          {hasAction && (
            <div className='flex-shrink-0'>
              <div className='flex flex-col gap-1'>
                <button className='btn btn-xs btn-outline'>delete</button>
                <button className='btn btn-xs btn-outline'>edit</button>
              </div>
            </div>
          )}
        </div>
        <p className='text-primary'>{tags}</p>
      </div>
    </div>
  );
};

export default CardPost;
