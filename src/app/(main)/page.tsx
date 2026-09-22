import Brands from "src/features/Brands/components/Brands";
import { Banner } from "src/features/banner/components/Banner";
// import Collections from "src/features/collections/components/Collections";
import DownloadAntey from "@/components/DownloadAntey";
import { ProductsOfTheDay } from "src/features/products/components/ProductsOfTheDay";
import Promotions from "src/features/promotions/components/Promotions";
// import SecondBanner from "@/features/second-banner/components/SecondBanner";
// import { SupportChatButton } from "@/features/support-chat/components/SupportChatButton";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <Banner />
      {/*<DiscountedProducts />*/}
      <ProductsOfTheDay />
      {/*<SecondBanner />*/}
      <Suspense>
        <Promotions />
        {/*<Collections />*/}
        <Brands />
      </Suspense>
      <DownloadAntey />

      {/*<SupportChatButton />*/}
    </>
  );
}
