import { fluid } from "@/utils/fluid";

interface Props {
  message: string;
}

export const NoDataMessage = ({ message }: Props) => {
  return (
    <div
      className=" text-[18px] leading-[120%] text-primary-black-gray font-medium"
      style={{ fontSize: fluid(18, 24, 1280) }}
    >
      {message}
    </div>
  );
};
