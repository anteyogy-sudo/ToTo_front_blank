import { api } from "@/configs/axios"
import { CartItemProps } from "@/types/cart.types"
import {useUserStore} from "@/stores/useUserStore";
import {useCityStore} from "@/features/navbar/stores/useCityStore";
import {usePharmacyStore} from "@/stores/usePharmacyStore";

export const cartApi = {
    async get() {
        const {token} = useUserStore.getState();
        if (!token) return;

        const resp = await api.get("/cart", {
            headers: {Authorization: `Bearer ${token}`}
        })

        return resp.data?.data ?? [];
    },

    async put(items: CartItemProps[]) {
        const {token} = useUserStore.getState();
        if (!token) return;

        return api.put(
            "/cart",
            {goods: items},
            {headers: {Authorization: `Bearer ${token}`}}
        )
    },

    async post(items: CartItemProps[]) {
        const {confirmedCity} = useCityStore.getState();
        const {confirmedPharmacy} = usePharmacyStore.getState();
        if (!confirmedCity) return;
        const locationId = confirmedPharmacy?.id ?? confirmedCity.id;
        const locationType = confirmedPharmacy ? "store" : "city";

        return api.post("/cart", {
            [locationType]: locationId,
            goods: items,
        });
    },

    async delete(items: number[]) {
        const {token} = useUserStore.getState();
        if (!token) return

        return api.delete("/cart", {
            headers: {Authorization: `Bearer ${token}`},
            data: {goods: items}
        })
    },

    async clearFull() {
        const {token} = useUserStore.getState();
        if (!token) return

        return api.delete("/cart", {
            headers: {Authorization: `Bearer ${token}`},
        }).catch(e => console.error("Clear cart error: " ,e));
    },

    async clearSelected(items: CartItemProps[]) {
        const {token} = useUserStore.getState();
        if (!token) return;

        return api.put(
            "/cart",
            {goods: items.map(item => ({
                    id: item.id,
                    amount: 0,
            }))}, {headers: {Authorization: `Bearer ${token}`},}
        ).catch(e => console.error("Clear selected error:", e));
    },
}