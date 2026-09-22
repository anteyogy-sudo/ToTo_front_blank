import React, {useState} from 'react';
import Image, { ImageProps } from 'next/image';
import NoPhoto from "@/assets/icons/NoPhoto.svg"

interface ImageWithFallbackProps extends ImageProps {
    fallback_src?: string,
    fallback_text?: string,
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
    const { src, alt, ...rest } = props;

    const fallbackSrc = props.fallback_src || NoPhoto;

    const fallbackText = props.fallback_text || null;

    const [error, setError] = useState(false);

    const validSrc = () => {
        if (!src || (typeof src === "string" && src.trim() === "")) {
            return "";
        }
        return src;
    };

    return (
        <>
            {!error && validSrc() !== "" ? (
                <Image
                    {...rest}
                    alt={alt}
                    src={src}
                    onError={() => setError(true)}
                />
            ) : fallbackText ? (
                <div className="flex items-center justify-center w-full h-full text-center select-none">
                    {fallbackText}
                </div>
            ) : (
                <Image
                    {...rest}
                    alt={alt}
                    src={fallbackSrc}
                />
            )}
        </>
    );
};

export default ImageWithFallback;