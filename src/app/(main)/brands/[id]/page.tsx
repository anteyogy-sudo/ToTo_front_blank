import React from 'react';
import BrandSinglePage from "src/features/Brands/components/BrandSinglePage";

interface PageProps {
    params: Promise<{
        id: number;
    }>;
}
const Page = async (props: PageProps) => {
    const params = await props.params;
    return <BrandSinglePage id={params.id} />
};

export default Page;