import React from 'react';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { Post } from '../../slices/PostSlice';

const CardPost = ({
  id,
  caption,
  image,
  likes,
  tags,
  user,
  liked,
  action,
  upOrDel,
}: Post) => {
  return (
    <div className='border rounded-md overflow-hidden'>
      <img src={image} alt={caption} />
      <div className='p-2'>
        <div className='flex gap-1 align-middle items-center'>
          <button
            className='btn btn-ghost btn-sm px-2'
            onClick={() =>
              action({
                type: liked ? 'unlike' : 'like',
                data: { id },
              })
            }
          >
            {liked ? (
              <IoHeartSharp color='#f00' size={20} />
            ) : (
              <IoHeartOutline size={20} />
            )}
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
          {upOrDel && (
            <div className='flex-shrink-0'>
              <div className='flex flex-col gap-1'>
                <button
                  className='btn btn-xs btn-outline'
                  onClick={() =>
                    action({
                      type: 'delete',
                      data: { id, caption, image, tags },
                    })
                  }
                >
                  delete
                </button>
                <button
                  className='btn btn-xs btn-outline'
                  onClick={() =>
                    action({
                      type: 'edit',
                      data: { id, caption, image, tags },
                    })
                  }
                >
                  edit
                </button>
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
