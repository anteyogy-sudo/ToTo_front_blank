import React from "react";

export const CollectionsLoadingSkeleton = () => {
  return (
      <div className='flex flex-col gap-2' >
        <div className='md:h-[500px] h-[350px] grid grid-cols-2 gap-2'>
          <div className='relative rounded-[16px] p-6 shadow-sm bg-loading-skeleton animate-pulse' />
          <div className='relative rounded-[16px] p-6 shadow-sm bg-loading-skeleton animate-pulse' />
        </div>
      </div>
  );
};
