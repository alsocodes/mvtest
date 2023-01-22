import React, { useEffect, useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { selectPost, useAppDispatch, useAppSelector } from '../../app/hooks';
import CardPost from '../../components/CardPost';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import { SetMenuActive } from '../../slices/ConfigSlice';
import {
  GetAllPosts,
  Post,
  PutLikePost,
  PutUnLikePost,
} from '../../slices/PostSlice';

type Props = {
  name: string;
};

const HomePage = ({ name }: Props) => {
  const dispatch = useAppDispatch();
  const { allPost, allPagination, formResult } = useAppSelector(selectPost);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');

  useEffect(() => {
    dispatch(SetMenuActive(name));
  }, [dispatch, name]);

  useEffect(() => {
    dispatch(GetAllPosts({ page: page, limit: 8, search, searchBy }));
  }, [dispatch, formResult, page, search, searchBy]);

  const OnPaginationAction = (p: number) => {
    setPage(p);
  };

  const OnSearch = ({ searchBy, search }: any) => {
    // console.log(searchBy, search);
    setSearch(search);
    setSearchBy(searchBy);
  };

  const CardAction = ({ type, data }: any) => {
    const { id } = data;

    if (type === 'like') {
      dispatch(PutLikePost(id));
    }

    if (type === 'unlike') {
      dispatch(PutUnLikePost(id));
    }
  };

  return (
    <div className='h-full w-full relative'>
      <div className='flex flex-col justify-between h-full overflow-hidden'>
        <div className='mb-3 p-1 w-full max-w-xs'>
          <Search action={OnSearch} />
        </div>
        {allPagination?.total === 0 ? (
          <div className='flex gap-4 justify-center align-middle items-center h-full'>
            <IoWarningOutline size={40} />
            <span className='text-2xl text-error'>No Data Availabel</span>
          </div>
        ) : (
          <>
            <div className='flex-grow h-80 overflow-y-auto pr-4'>
              <div className='grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                {allPost?.map((row: Post) => {
                  return (
                    <CardPost
                      key={row.id}
                      {...row}
                      action={CardAction}
                      upOrDel={false}
                    />
                  );
                })}
              </div>
            </div>
            <Pagination {...allPagination} action={OnPaginationAction} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
