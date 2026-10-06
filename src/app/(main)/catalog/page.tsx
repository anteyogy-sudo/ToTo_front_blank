import { Suspense } from "react";
import { Container } from "@/components/Container";
import { CatalogListContainer } from "@/features/catalogs/components/CatalogListContainer";

/**
 * Каталог с клиентской фильтрацией.
 *
 * Всё состояние (категория, фильтры, сортировка, вид) живёт в URL, поэтому
 * серверный рендер читает те же параметры. Suspense обязателен: `useSearchParams`
 * в дереве требует boundary.
 */
const Page = () => {
    return (
        <Container className="py-6">
            <Suspense fallback={null}>
                <CatalogListContainer/>
            </Suspense>
        </Container>
    );
};

export default Page;
