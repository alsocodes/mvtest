import React, { FC } from 'react';
type Props = {
  progressValue: number;
};
const Progressbar: FC<Props> = ({ progressValue }) => {
  // console.log(progressValue);
  return (
    <div
      className={`${
        progressValue === 0 && 'hidden'
      } fixed top-0 -left-1 -right-1 z-50 bg-base-100 rounded-full h-1.5 mb-4 `}
    >
      <div
        style={{ marginLeft: `${-100 + progressValue}%` }}
        className={`bg-primary h-1.5 rounded-full transition-all duration-300 w-full`}
      ></div>
    </div>
  );
};

export default Progressbar;
