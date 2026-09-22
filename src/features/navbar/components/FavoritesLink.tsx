import {useIsMounted} from "@/hooks/useIsMounted";
import { WidePrimaryBlueOutlinedHeartIcon } from "@/icons/wide-primary-blue-outlined-heart";
import Link from "next/link";
import {useFavoritesStore} from "@/features/favorites/stores/useFavoritesStore";

type Props = {
    onNavigate?: () => void;
};

export const FavoritesLink = ({ onNavigate }: Props) => {
    return (
        <Link
            href="/favorites"
            onClick={onNavigate}
            className="w-fit flex flex-col relative h-[50px] max-h-[50px] hover:opacity-80 text-primary-gray hover:text-primary-blue transition-colors duration-300"
        >
            <div className="flex flex-col items-center justify-center h-[50px]">
                <WidePrimaryBlueOutlinedHeartIcon />
                <span className="select-none text-[14px] font-medium">Избранное</span>
            </div>
            <FavoritesCountBadge />
        </Link>
    );
};

const FavoritesCountBadge = () => {
  const hasMounted = useIsMounted();
  const favorites = useFavoritesStore(state => state.favorites);

  if (!hasMounted || !favorites.length) return null;

  return (
    <div className=" w-[18px] h-[18px] aspect-square rounded-full bg-primary-red flex items-center justify-center text-xs leading-[100%] tracking-[-0.4%] absolute top-0.5 right-3 text-white-500">
      {favorites.length}
    </div>
  );
};
