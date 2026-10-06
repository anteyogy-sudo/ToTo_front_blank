"use client";
import { useState, useEffect, useCallback, type TouchEvent } from "react";
import Image from "next/image";
import LeftArrow from "@/assets/icons/leftarrow.svg";
import RightArrow from "@/assets/icons/rightarrow.svg";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import ImageWithFallback from "@/utils/ImageWithFallBack";

interface ImageCarouselProps {
    images: string[];
    className?: string;
}

export const ImageCarousel = ({ images, className }: ImageCarouselProps) => {
    // Индекс текущего изображения
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Свайп
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    // Первый индекс картинки
    const [visibleStartIndex, setVisibleStartIndex] = useState(0);

    const isMobile = useMediaQuery("(max-width: 768px)");

    // Сбрасываем индекс при изменении товара
    useEffect(() => {
        setCurrentImageIndex(0);
        setVisibleStartIndex(0);
    }, [images]);

    // Активная картинка всегда видна
    useEffect(() => {
        if (!images || images.length <= 3) return;

        if (currentImageIndex < visibleStartIndex) {
            setVisibleStartIndex(currentImageIndex);
            return;
        }

        if (currentImageIndex > visibleStartIndex + 2) {
            setVisibleStartIndex(Math.min(currentImageIndex - 2, images.length - 3));
        }
    }, [currentImageIndex, visibleStartIndex, images.length, images]);

    // Меняем главное изображение
    const handleThumbnailClick = useCallback(
        (index: number) => {
            if (index === currentImageIndex) return;
            setCurrentImageIndex(index);
        },
        [currentImageIndex]
    );

    // Переход к следующему изображению
    const goToNext = useCallback(() => {
        if (!images || images.length <= 1) return;
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, [images]);

    // Переход к предыдущему изображению
    const goToPrev = useCallback(() => {
        if (!images || images.length <= 1) return;
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images]);

    // Обработчики для свайпа
    const handleTouchStart = (e: TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    // Определяем направление свайпа
    const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
        if (touchStartX === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        // Минимальная дистанция свайпа
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Свайп влево следующее изображение
                goToNext();
            } else {
                // Свайп вправо предыдущее изображение
                goToPrev();
            }
        }

        setTouchStartX(null);
    };

    const currentImage = images[currentImageIndex];
    const showArrows = images.length > 1;
    const canMoveThumbnails = images.length > 3;

    // Показываем 3 картинки
    const visibleImages = canMoveThumbnails
        ? images.slice(visibleStartIndex, visibleStartIndex + 3)
        : images;

    return (
        <div className={cn("flex flex-col items-center w-full", className)}>
            {/* Основное большое изображение */}
            <div className="flex bg-white-500 w-fit">
                <div className="flex justify-center w-full rounded-[48px] relative lg:size-[335px] aspect-square size-[300px] "
                     onTouchStart={handleTouchStart}
                     onTouchEnd={handleTouchEnd}
                >
                    <ImageWithFallback
                        src={currentImage}
                        alt="Изображение товара"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 389px"
                    />
                </div>
            </div>
            {/* Миниатюры и стрелки на десктопе */}
            {images.length > 1 && !isMobile && (
                <div className="mt-4 flex items-center justify-center gap-2 w-full max-w-[389px]">
                    {showArrows && (
                        <button
                            type="button"
                            onClick={goToPrev}
                            className="shrink-0 p-0 bg-transparent border-0 flex items-center justify-center"
                            aria-label="Предыдущее изображение"
                        >
                            <Image
                                src={LeftArrow}
                                alt=""
                                width={12}
                                height={12}
                                className="block"
                            />
                        </button>
                    )}

                    <div className="flex items-center gap-2 overflow-hidden">
                        {visibleImages.map((image, index) => {
                            const realIndex = canMoveThumbnails ? visibleStartIndex + index : index;

                            return (
                                <button
                                    key={`${image}-${realIndex}`}
                                    type="button"
                                    onClick={() => handleThumbnailClick(realIndex)}
                                    className={cn(
                                        "flex-shrink-0 w-12 h-12 rounded-lg border-2 transition-all duration-200 hover:border-primary-blue overflow-hidden",
                                        realIndex === currentImageIndex
                                            ? "border-primary-blue shadow-md"
                                            : "border-gray-200"
                                    )}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={image}
                                            alt={`Миниатюра ${realIndex + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="48px"
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {showArrows && (
                        <button
                            type="button"
                            onClick={goToNext}
                            className="shrink-0 p-0 bg-transparent border-0 flex items-center justify-center"
                            aria-label="Следующее изображение"
                        >
                            <Image
                                src={RightArrow}
                                alt=""
                                width={12}
                                height={12}
                                className="block"
                            />
                        </button>
                    )}
                </div>
            )}

            {/* Точки индикаторы для мобильной версии */}
            {images.length > 1 && isMobile && (
                <div className="mt-4 flex justify-center gap-2 pb-2 w-full">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-200",
                                index === currentImageIndex
                                    ? "bg-primary-blue scale-125"
                                    : "bg-gray-300 hover:bg-gray-400"
                            )}
                            aria-label={`Перейти к изображению ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            <span className="mt-3 flex justify-center text-center text-[14px] font-regular leading-[120%] mx-auto w-[290px] text-balance">
                Внешний вид товара может не совпадать с изображениями, представленными на сайте
            </span>
        </div>
    );
};