import React, {Suspense} from 'react';
import Order from "src/features/account/orders/components/Order";
import {OrderCardSkeleton} from "src/features/account/orders/components/OrderCardSkeleton";


interface PageProps {
    params: Promise<{
        id: number;
    }>;
}
const Page = async (props: PageProps) => {
    const params = await props.params;
    return (
        <Suspense fallback={<OrderCardSkeleton />}>
            <Order id={params.id}/>
        </Suspense>
    );
};

export default Page;
