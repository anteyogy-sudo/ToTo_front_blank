import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";

interface BreadcrumbItem {
    label: string | React.ReactNode;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    {index > 0 && <ChevronRight className="h-4 w-4" />}
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-primary-blue transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
};