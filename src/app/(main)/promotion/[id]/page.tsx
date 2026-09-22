import React from 'react';
import PromotionPage from "src/features/promotion-page/components/PromotionPage";
import { Catalogs } from "src/features/catalogs/components/Catalogs";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const Page = async (props: PageProps) => {
    const params = await props.params;
    return (
        <>
            <PromotionPage id={params.id} />
            <Catalogs catalog_id={0} />
        </>
    );
};

export default Page;