import React, {Suspense} from 'react';
// import SuccessfulOrder from "./SuccessfulOrder";

const Page = () => {
    return (
        <Suspense fallback={<span></span>}>
            {/* ToDo: Successful order */}
            {/*<SuccessfulOrder />*/}
        </Suspense>
    );
};

export default Page;



