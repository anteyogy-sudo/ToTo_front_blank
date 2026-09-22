import { MyOrders } from "src/features/account/orders/components/MyOrders";
import {Suspense} from "react";

export default function MyOrdersPage() {
  return (
      <Suspense fallback={<div></div>}>
        <MyOrders />
      </Suspense>
  );
}
