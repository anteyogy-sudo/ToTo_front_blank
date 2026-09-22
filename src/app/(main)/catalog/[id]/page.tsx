import { Catalogs } from "src/features/catalogs/components/Catalogs";
import { CatalogsTicket } from "src/features/catalogs/components/CatalogsTicket";

export default async function CatalogWithIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <section>
      <CatalogsTicket />
      <Catalogs catalog_id={Number(id)} />
    </section>
  );
}
