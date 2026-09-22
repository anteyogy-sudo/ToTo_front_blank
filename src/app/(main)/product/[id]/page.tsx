import Product from "src/features/product/components/Product";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async (props: PageProps) => {
  const params = await props.params;
  return (
      <div className='max-w-base w-full mx-auto'>
          <Product id={params.id} />
      </div>
  );
};

export default Page;
