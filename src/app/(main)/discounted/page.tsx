import React, {Suspense} from 'react';
import DiscountedPage from "src/features/products/components/DiscountedPage";

const Page = () => {
    return (
        <Suspense fallback={<div></div>} >
            <DiscountedPage/>
        </Suspense>
    )


};

export default Page;