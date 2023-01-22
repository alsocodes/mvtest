import React, { useState } from 'react';

interface Props {
  action: (object: any) => any;
}
const Search = ({ action }: Props) => {
  const [onTypeSearch, setOnTypeSearch] = useState<string>('');
  const [searchBy, setSearchBy] = useState('caption');
  const [focus, setFocus] = useState(false);

  const OnSearchBy = (val: string) => {
    // console.log(val);
    let tmpSearch = onTypeSearch;
    if (val === 'tag' && !onTypeSearch.startsWith('#'))
      tmpSearch = `#${onTypeSearch}`;
    if (val === 'caption' && onTypeSearch.startsWith('#'))
      tmpSearch = onTypeSearch.replace('#', '');

    setOnTypeSearch(tmpSearch);
    setSearchBy(val);
    action({ search: tmpSearch, searchBy: val });
  };

  const hidden = onTypeSearch?.length > 0 && focus ? '' : 'hidden';
  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 
        bottom-0 bg-gray-600 bg-opacity-50 transition-all duration-300 
        ${hidden}
        `}
      ></div>
      <div className='relative'>
        <input
          onFocus={() => setFocus(true)}
          onBlur={() =>
            setTimeout(() => {
              setFocus(false);
            }, 100)
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const by = onTypeSearch.startsWith('#') ? 'tag' : 'caption';
              setSearchBy(by);
              action({
                search: onTypeSearch,
                searchBy: by,
              });
              e.currentTarget.blur();
            }
          }}
          onChange={(e) => setOnTypeSearch(e.target.value)}
          value={onTypeSearch}
          type='text'
          placeholder='Search by Tag or Caption'
          className='input w-full input-bordered'
        />
        <div className={`bg-base-100 absolute shadow-md w-full mt-1 ${hidden}`}>
          <div
            className={`flex p-2 items-center gap-2  cursor-pointer hover:bg-base-300 ${
              searchBy === 'caption' && 'bg-base-200'
            }`}
            onClick={() => OnSearchBy('caption')}
          >
            <span className='text-xs text-gray-500 flex-shrink-0'>
              by Caption :
            </span>
            <span className='font-semibold text-gray-700 flex-grow'>
              {onTypeSearch?.replace('#', '')}
            </span>
          </div>
          <div
            className={`flex p-2 items-center gap-2 cursor-pointer hover:bg-base-300 ${
              searchBy === 'tag' && 'bg-base-200'
            }`}
            onClick={() => OnSearchBy('tag')}
          >
            <span className='text-xs text-gray-500 flex-shrink-0'>
              by Tags : #
            </span>
            <span className='font-semibold text-gray-700 flex-grow'>
              {onTypeSearch?.replace('#', '')}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
