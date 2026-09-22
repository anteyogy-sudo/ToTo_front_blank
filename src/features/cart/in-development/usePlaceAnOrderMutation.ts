// import { api } from "@/configs/axios";
// import { QUERY_KEYS } from "@/types/query-keys.enum";
// import { useMutation } from "@tanstack/react-query";
// import { PlaceAnOrderPayload } from "@/features/cart/older_cart/types/place-an-order.types";
// import {useUserStore} from "@/stores/useUserStore";
// import {bearerToken} from "@/utils/bearer-token";
//
//
// interface Props {
//   payload: PlaceAnOrderPayload;
// }
//
// export const usePlaceAnOrderMutation = () => {
//   const { token } = useUserStore();
//   return useMutation({
//     mutationKey: [QUERY_KEYS.PLACE_AN_ORDER],
//     mutationFn: async (payload: Props["payload"]) => {
//       try {
//         if (!token) return ;
//         const response = await api.post("/orders", payload, {
//           headers: {
//             Authorization: bearerToken(token)
//           },
//         });
//         return response.data;
//       } catch (error) {
//         console.error(error);
//       }
//     },
//   });
// };
