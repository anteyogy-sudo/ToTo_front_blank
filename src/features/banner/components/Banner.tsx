"use client";

import {Container} from "@/components/Container";
import {ErrorBoundaryWrapper} from "@/components/ErrorBoundaryWrapper";
import {BannerCarousel} from "./BannerCarousel";
import {BannerProduct} from "./BannerProduct";
import {renderBannerErrorFallbackComponent} from "./renderBannerErrorFallbackComponent";
import {renderBannerProductCardErrorFallback} from "./renderBannerProductCardErrorFallback";

export const Banner = () => {
    return (
        <Container className=" w-full flex justify-center gap-2 1144:gap-[40px]">
            <ErrorBoundaryWrapper
                fallbackRender={(fallback) =>
                    renderBannerErrorFallbackComponent(fallback)
                }
            >
                <BannerCarousel/>
            </ErrorBoundaryWrapper>
            <ErrorBoundaryWrapper
                fallbackRender={(fallback) =>
                    renderBannerProductCardErrorFallback(fallback)
                }
            >
                <BannerProduct/>
            </ErrorBoundaryWrapper>
        </Container>
    );
};
