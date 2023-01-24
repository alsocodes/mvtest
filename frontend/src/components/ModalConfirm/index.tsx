import React from 'react';

interface Props {
  checked: boolean;
  yesAction: () => any;
  noAction: () => any;
  message: string;
  title?: string;
}
const ModalConfirm = ({ checked, message, noAction, yesAction }: Props) => {
  return (
    <>
      <input
        type='checkbox'
        id='my-modal-confirm'
        className='modal-toggle'
        checked={!!checked}
        onChange={() => console.log('ok')}
      />
      <div className='modal'>
        <div className='modal-box'>
          <div className='py-4 text-center'>{message}</div>
          <div className='modal-action justify-center'>
            <button
              type='button'
              className='btn btn-ghost btn-md'
              onClick={() => noAction()}
            >
              No
            </button>
            <button
              onClick={() => yesAction()}
              type='submit'
              className={`btn btn-primary btn-md`}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalConfirm;
