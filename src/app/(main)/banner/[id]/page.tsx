import React from 'react';
import BannerSinglePage from "@/features/banner/components/BannerSinglePage";

interface PageProps {
    params: Promise<{
        id: number;
    }>;
}
const Page = async (props: PageProps) => {
    const params = await props.params;
    return <BannerSinglePage id={params.id} />
};

export default Page;