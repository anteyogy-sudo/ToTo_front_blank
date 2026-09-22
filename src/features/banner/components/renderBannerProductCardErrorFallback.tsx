"use client";

import {FallbackProps} from "react-error-boundary";

export const renderBannerProductCardErrorFallback = ({ error, }: FallbackProps) => {
    console.error("Error renderBannerProductCard: " + error?.name);
    return (
        <div className="lg:flex hidden min-w-[260px] max-w-[260px] 1144:h-[440px] md:h-[380px] h-[240px] rounded-2xl
                        bg-red-200 items-center justify-center flex-col gap-1 text-center text-primary-red p-4">
            <p className="text-xl font-bold">
                {error?.title}
            </p>
            <span className="font-medium">
                {error?.description}
            </span>
        </div>
    );
};
