import React from 'react';

interface IndicatorProps {
    available: boolean;
    variant?: "default" | "bestPrice";
}

const Indicator: React.FC<IndicatorProps> = ({ available, variant = "default" }) => {
    const fill =
        variant === "bestPrice"
            ? "hsl(var(--brand-success))"
            : available
              ? "hsl(var(--brand))"
              : "hsl(var(--brand-warning))";

    return (
        <svg
            width="10"
            height="6"
            viewBox="0 0 10 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.5 12L0.00480938 0.75L12.9952 0.75L6.5 12Z"
                fill={fill}
            />
        </svg>
    );
};

export default Indicator;
