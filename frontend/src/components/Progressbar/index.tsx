import React, { FC, useEffect, useState } from 'react';

type Props = {
  progress: boolean;
};
const Progressbar: FC<Props> = ({ progress }) => {
  const [progressValue, setProgressValue] = useState(0);
  useEffect(() => {
    if (progress === true) {
      setProgressValue(20);
      let timer = setTimeout(() => {
        setProgressValue(85);
      }, 100);
      return () => {
        setProgressValue(0);
        clearTimeout(timer);
      };
    } else {
      const to = setTimeout(() => setProgressValue(100), 200);
      return () => {
        clearTimeout(to);
      };
    }
  }, [progress]);
  // console.log(progressValue, progress);
  return (
    <div
      className={`${
        progressValue === 100 && 'hidden'
      } absolute top-0 -left-1 -right-1 bg-base-100 rounded-full h-1.5 mb-4 `}
    >
      <div className={`bg-primary h-1.5 rounded-full w-[100%]`}></div>
    </div>
  );
};

export default Progressbar;
