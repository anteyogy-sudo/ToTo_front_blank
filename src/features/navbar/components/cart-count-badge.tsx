"use client";

import { useIsMounted } from "@/hooks/useIsMounted";

export const CartCountBadge = ({total_count} : {total_count : number}) => {
  const hasMounted = useIsMounted();


  if (!hasMounted) return null;



  return (
    <div className=" w-[18px] h-[18px] aspect-square rounded-full bg-primary-red flex items-center justify-center text-xs leading-[100%] tracking-[-0.4%] absolute top-0.5 right-2 text-white-500">
      {total_count ? total_count : 0}
    </div>
  );
};
