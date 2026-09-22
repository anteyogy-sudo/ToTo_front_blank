import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useFavoritesStore } from "@/features/favorites/stores/useFavoritesStore";
import { useIsMounted } from "@/hooks/useIsMounted";
import { PrimaryBlueFilledHeartIcon } from "@/icons/primary-blue-filled-heart";
import { PrimaryBlueOutlinedHeartIcon } from "@/icons/primary-blue-outlined-heart";
import { ProductProps } from "@/types/product.types";
import { useMemo } from "react";

interface Props {
  id: ProductProps["id"];
}

export const ProductLikeButton = ({ id }: Props) => {
  const hasMounted = useIsMounted();
  const { favorites, onToggleFavorite } = useFavoritesStore();

  const isFavorite = useMemo(() => {
    return hasMounted && favorites.some((favId) => favId === id);
  }, [id, favorites, hasMounted]);

  return (
    <button
      onClick={() => onToggleFavorite(id)}
      className="flex items-center justify-center rounded-2xl min-w-[52px] min-h-[52px] bg-blue-lightBlue"
    >
      {!hasMounted ? (
        <LoadingSpinner size={32} />
      ) : isFavorite ? (
        <PrimaryBlueFilledHeartIcon />
      ) : (
        <PrimaryBlueOutlinedHeartIcon />
      )}
    </button>
  );
};
