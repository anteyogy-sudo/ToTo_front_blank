import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const AccountSectionTitle = ({ children }: Props) => {
  return (
    <p className=" 1144:text-[40px] text-[32px] font-bold leading-[100%] text-nowrap">
      {children}
    </p>
  );
};
