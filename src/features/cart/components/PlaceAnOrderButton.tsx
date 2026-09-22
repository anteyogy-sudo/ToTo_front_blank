"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuthDialogStore } from "@/stores/useAuthDialogStore";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import {useMemo, useState} from "react";
import { useCartStore } from "@/stores/useCartStore";
import { usePharmacyStore } from "@/stores/usePharmacyStore";
import {toast} from "sonner";
import {api} from "@/configs/axios";

export const PlaceAnOrderButton = () => {
  const { user, token } = useUserStore();
  const { setIsOpenLoginDialog, setWithRedirect } = useAuthDialogStore();
  const selectedIds = useCartStore(state => state.selectedItems)
  const products = useCartStore(state => state.items);
  const getSelectedItems = useCartStore(state => state.selectedItems);
  const selectedCart = useCartStore(state => state.selectedCart)

  const selectedItems = getSelectedItems();

  const { confirmedPharmacy } = usePharmacyStore();
  const router = useRouter();

  const disabled = useMemo(() => {
    return (
      !selectedIds.length ||
      !products.length ||
      !confirmedPharmacy ||
      !selectedCart?.total?.amount
    );
  }, [confirmedPharmacy, selectedIds, products.length, selectedCart]);

  const [loading, setLoading] = useState(false);

  const handlePlaceAnOrder = async () => {
    setWithRedirect(false);

    if (!user || !confirmedPharmacy?.id) {
      setIsOpenLoginDialog(true);
      return;
    }

    setWithRedirect(true);
    try {
      setLoading(true);

      const { data } = await api.put("/orders",
          {goods: selectedItems, store: confirmedPharmacy?.id},
          {headers: {Authorization: `Bearer ${token}`}}
      )

      router.replace(`/account/orders/${data?.data?.[0]?.id}`);
    } catch (e) {
      console.error(e);
      toast.error("Не удалось оформить заказ, попробуйте позднее");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handlePlaceAnOrder}
      disabled={disabled || loading}
      className=" h-[62px] disabled:bg-blue-lightBlue shadow-none disabled:text-blue-light-gray rounded-2xl font-bold text-[18px]"
    >
      {loading && <LoadingSpinner />}
      Оформить заказ
    </Button>
  );
};
