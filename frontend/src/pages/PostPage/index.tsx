import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoAddSharp, IoImageOutline, IoWarningOutline } from 'react-icons/io5';
import { selectPost, useAppDispatch, useAppSelector } from '../../app/hooks';
import CardPost from '../../components/CardPost';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import TextInput from '../../components/TextInput';
import { SetMenuActive } from '../../slices/ConfigSlice';
import {
  ClearLink,
  DeleteDelPost,
  GetPosts,
  Post,
  PostCreatePost,
  PostUpload,
  PutLikePost,
  PutUnLikePost,
  PutUpdatePost,
} from '../../slices/PostSlice';
import { createFormData } from '../../utils/Helper';

type Props = {
  name: string;
};

interface IFormPost {
  id: number | null;
  image: string;
  caption: string;
  tags: string;
}
const PostPage = ({ name }: Props) => {
  const dispatch = useAppDispatch();
  const { data, pagination, formResult, uploading, linkUploaded, loading } =
    useAppSelector(selectPost);

  useEffect(() => {
    dispatch(SetMenuActive(name));
  }, [dispatch, name]);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const inputFileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    dispatch(GetPosts({ page: page, limit: 8, search, searchBy }));
    setModalForm(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  }, [formResult, dispatch, page, search, searchBy]);

  const OnPaginationAction = (p: number) => {
    setPage(p);
  };

  const [modalForm, setModalForm] = useState<null | Post | any>(null);
  const [modalDelete, setModalDelete] = useState<null | Post | any>(null);

  const {
    register,
    handleSubmit,
    // watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IFormPost>();

  const [dispImage, setDispImage] = useState<any>(null);
  const browseFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const OnAddButtonPress = () => {
    setModalForm({
      id: null,
      caption: '',
      tags: '',
      image: '',
    });
    dispatch(ClearLink());
    setDispImage(null);
  };

  const OnFileChange = (e: any) => {
    e.preventDefault();

    var file = e.target?.files ? e.target.files[0] : null;
    if (!file) {
      setError('image', {
        message: 'image harus diisi',
      });
      return;
    }

    const { name, type, size } = file;

    if (!type?.startsWith('image/')) {
      return setError('image', { message: 'Hanya file gambar' });
    }

    const ext = name.split('.');
    // console.log(ext);
    if (ext[1] !== 'png' && ext[1] !== 'jpg' && ext[1] !== 'jpeg') {
      setError('image', {
        message: 'Hanya .png, .jpg, and .jpeg yang diperbolehkan',
      });
      return;
    }

    if (size > 700000) {
      setError('image', {
        message: 'Ukuran gambar maksimal 700KB',
      });
      return;
    }

    setDispImage(URL.createObjectURL(file));

    clearErrors('image');
    const formData = createFormData({ file: file });
    dispatch(PostUpload(formData));
  };

  useEffect(() => {
    setValue('image', linkUploaded);
    if (linkUploaded) setDispImage(linkUploaded);
  }, [linkUploaded, setValue]);

  const OnSubmit = (data: IFormPost) => {
    if (!data.id) {
      dispatch(PostCreatePost(data));
    } else {
      dispatch(PutUpdatePost(data));
    }
  };

  useEffect(() => {
    setValue('id', modalForm?.id || null);
    setValue('caption', modalForm?.caption || '');
    setValue('tags', modalForm?.tags || '');
    setValue('image', modalForm?.image || '');
    if (modalForm?.image) setDispImage(modalForm?.image);
  }, [modalForm, setValue]);

  const OnSearch = ({ searchBy, search }: any) => {
    // console.log(searchBy, search);
    setSearch(search);
    setSearchBy(searchBy);
  };

  const CardAction = ({ type, data }: any) => {
    const { id, caption, tags, image } = data;
    if (type === 'edit') {
      setModalForm({ id, caption, tags, image });
    }

    if (type === 'delete') {
      setModalDelete({ id, caption, tags, image });
    }

    if (type === 'like') {
      dispatch(PutLikePost(id));
    }

    if (type === 'unlike') {
      dispatch(PutUnLikePost(id));
    }
  };

  const OnConfirmDelete = () => {
    if (!modalDelete?.id) return;
    dispatch(DeleteDelPost(modalDelete?.id));
    setModalDelete(null);
  };

  return (
    <div className='h-full w-full relative'>
      <button
        className='absolute bottom-0 right-0 btn btn-circle btn-primary'
        onClick={() => OnAddButtonPress()}
      >
        <IoAddSharp />
      </button>
      <div className='flex flex-col justify-between h-full overflow-hidden'>
        <div className='mb-3 p-1 w-full max-w-xs'>
          <Search action={OnSearch} />
        </div>
        {pagination?.total === 0 ? (
          <div className='flex gap-4 justify-center align-middle items-center h-full'>
            <IoWarningOutline size={40} />
            <span className='text-2xl text-error'>No Data Availabel</span>
          </div>
        ) : (
          <>
            <div className='flex-grow h-80 overflow-y-auto pr-4'>
              <div className='grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                {data?.map((row: Post) => {
                  return (
                    <CardPost
                      key={row.id}
                      {...row}
                      action={CardAction}
                      upOrDel={true}
                    />
                  );
                })}
              </div>
            </div>
            <Pagination {...pagination} action={OnPaginationAction} />
          </>
        )}
      </div>

      <input
        type='checkbox'
        id='my-modal-delete'
        className='modal-toggle'
        checked={modalDelete !== null}
        onChange={() => console.log('ok')}
      />
      <div className='modal'>
        <div className='modal-box'>
          <div className='py-4 text-center'>
            Are you sure want to delete this data ?
          </div>
          <div className='modal-action justify-center'>
            <button
              type='button'
              className='btn btn-ghost btn-md'
              onClick={() => setModalDelete(null)}
            >
              No
            </button>
            <button
              onClick={() => OnConfirmDelete()}
              type='submit'
              className={`btn btn-primary btn-md ${loading && 'loading'}`}
            >
              Yes
            </button>
          </div>
        </div>
      </div>

      <input
        type='checkbox'
        id='my-modal'
        className='modal-toggle'
        checked={modalForm !== null}
        onChange={() => console.log('ok')}
      />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg text-center'>
            {modalForm && modalForm?.id ? 'Edit Post' : 'Create Post'}
          </h3>
          <div className='py-4'>
            <form onSubmit={handleSubmit(OnSubmit)}>
              <div className='form-control w-full'>
                <label className='label'></label>
                <div className='flex'>
                  <input
                    type={'text'}
                    placeholder={'Image'}
                    id={'image'}
                    readOnly={true}
                    {...register('image', { required: 'Image harus diisi' })}
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
                  onChange={(e) => OnFileChange(e)}
                  type='file'
                  accept='images/*'
                  ref={inputFileRef}
                  hidden
                />
                <label className='label '>
                  {errors['image'] && (
                    <span className='label-text-alt text-red-500'>
                      {errors['image'].message}
                    </span>
                  )}
                </label>
                <div className='border rounded-md overflow-hidden w-36 h-36 mt-2 border-gray-300 flex justify-center'>
                  {dispImage ? (
                    <img src={dispImage} alt='disply-tmp' />
                  ) : (
                    <IoImageOutline className='text-gray-400 text-8xl self-center' />
                  )}
                </div>
                {uploading && <progress className='progress w-36'></progress>}
              </div>
              <TextInput
                placeholder='Caption'
                errors={errors}
                name='caption'
                type='textarea'
                register={register('caption', {
                  required: 'Caption harus diisi',
                })}
              />
              <TextInput
                placeholder='Tags'
                errors={errors}
                name='tags'
                type='text'
                register={register('tags', {
                  required: 'Tags harus diisi',
                })}
              />
              <div className='modal-action'>
                <button
                  type='button'
                  className='btn btn-ghost btn-md'
                  onClick={() => setModalForm(null)}
                >
                  Close
                </button>
                <button
                  type='submit'
                  className={`btn btn-primary btn-md ${loading && 'loading'}`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
