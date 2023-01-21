import React from 'react';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { paginationGenerator } from '../../utils/Helper';

interface Props {
  page: number;
  total: number;
  limit: number;
  action: (props: any) => any;
}
const Pagination = ({ page, total, limit, action }: Props) => {
  const pageingButtons = paginationGenerator(page, Math.ceil(total / limit));
  const pageInt = Number(page);

  return (
    <div className='flex justify-center mt-3'>
      <div className='btn-group'>
        <button
          onClick={() => action(pageInt - 1)}
          className={`btn btn-sm btn-outline ${
            pageInt === 1 && 'btn-disabled'
          }`}
        >
          <IoChevronBackSharp /> Prev
        </button>
        {pageingButtons.map((p: any, i: number) => {
          const active = p === pageInt ? 'btn-active' : '';
          return (
            <button
              onClick={() => {
                if (active) return;
                action(p);
              }}
              key={`p-${i}`}
              className={`btn btn-sm btn-outline ${active}`}
            >
              {p}
            </button>
          );
        })}
        <button
          onClick={() => action(pageInt + 1)}
          className={`btn btn-outline btn-sm ${
            pageInt === pageingButtons.length && 'btn-disabled'
          }`}
        >
          Next {'  '}
          <IoChevronForwardSharp />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
