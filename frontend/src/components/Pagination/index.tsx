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
  return (
    <div className='flex justify-center my-4'>
      <div className='btn-group'>
        <button className='btn'>
          <IoChevronBackSharp /> Prev
        </button>
        {pageingButtons.map((p: any, i: number) => {
          const active = p === page ? 'btn-active' : '';
          return (
            <button key={`p-${i}`} className={`btn btn-md ${active}`}>
              {p}
            </button>
          );
        })}
        <button className='btn'>
          Next {'  '}
          <IoChevronForwardSharp />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
