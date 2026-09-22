import PromotionsAllPage from "src/features/promotions/components/PromotionsAllPage";
import { CatalogsTicket } from "src/features/catalogs/components/CatalogsTicket";
import {Suspense} from "react";

const Page = () => {
    return (
        <>
            <CatalogsTicket />
            <Suspense fallback={"Загрузка..."}><PromotionsAllPage /></Suspense>
        </>
    );
};

export default Page;