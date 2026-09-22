"use client";

import {FallbackProps} from "react-error-boundary";

export const renderBannerErrorFallbackComponent = ({ error, }: FallbackProps) => {
    console.error("Error renderBanner: " + error?.name);
    return (
        <div className="1144:h-[440px] md:h-[380px] h-[240px] flex flex-1 items-center justify-center flex-col
                        text-center gap-1 bg-red-200 text-primary-red rounded-2xl p-4">
            <span className="text-2xl font-bold">
                {error?.title}
            </span>
            <span className="text-lg font-medium text-primary-red">
                {error?.message}
            </span>
        </div>
    );
};
