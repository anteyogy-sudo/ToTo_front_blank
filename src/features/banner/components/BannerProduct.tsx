"use client";
import {BannerProductCard} from "./BannerProductCard";
import {useFetchGoodsDaysOneProduct} from "@/features/goods-day/hooks/queries/useFetchGoodsDaysOneProduct";

export const BannerProduct = () => {
    const {data: popular, status, error} = useFetchGoodsDaysOneProduct();

    if (status === "pending")
        return (
            <div className="1144:flex hidden min-w-[293px] max-w-[293px] max-h-[440px] min-h-[440px] rounded-2xl bg-loading-skeleton animate-pulse shadow-sm"/>
        );

    if (status === "error") throw {
        name: error,
        title: "Не удалось загрузить рекомендацию месяца",
        message: "Проверьте подключение к интернету или повторите попытку позднее.",
    };

    const product = popular?.data?.[0] || null;

    if (status === "success" && !product) throw {
        name: "!product",
        title: "Товар рекомендации месяца недоступен.",
        message: "Приносим свои извинения, попробуйте позднее.",
    };

    return (
        product ?
            (
                <BannerProductCard product={product}/>
            ) : (
                <div
                    className="1144:flex hidden min-w-[260px] shadow-[0px_0px_20px_0px_#00000014] max-w-[260px] h-[440px] rounded-2xl bg-red-200 items-center justify-center flex-col gap-1 text-center text-primary-red p-4">
                    <p className="text-xl font-bold">Произошла ошибка</p>
                    <span className=" font-medium">Не удалось получить товар</span>
                </div>
            )
    );
};
