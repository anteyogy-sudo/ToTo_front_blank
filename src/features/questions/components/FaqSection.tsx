"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { fetchFaq, FaqItem } from "@/features/questions/services/faq.service";

interface AccordionItemCustomProps {
    item: FaqItem;
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItemCustom = ({ item, isOpen, onToggle }: AccordionItemCustomProps) => {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between font-bold lg:leading-[100%] leading-[120%] lg:text-[24px] text-[18px] text-black-100 hover:no-underline py-4 hover:text-primary-blue transition-colors text-left"
            >
                {item.title}
                <span className="ml-4 text-primary-blue transform transition-transform duration-200">
                    {isOpen ? '−' : '+'}
                </span>
            </button>
            {isOpen && (
                <div className="text-black-100 font-normal leading-[140%] lg:text-[18px] text-[16px] pb-4 animate-in fade-in duration-200">
                    <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                </div>
            )}
        </div>
    );
};

const FaqSection = () => {
    const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const loadFaq = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await fetchFaq();
            setFaqItems(data);
        } catch (err) {
            console.error('Failed to load FAQ:', err);
            setError('Не удалось загрузить FAQ');
            setFaqItems([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadFaq().catch((err) => {
            console.error('Failed to load FAQ in useEffect:', err);
        });
    }, [loadFaq]);

    const handleToggle = useCallback((index: number) => {
        setOpenIndexes(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            } else {
                return [...prev, index];
            }
        });
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-8 text-red-500">
                    <p>{error}</p>
                    <Button
                        onClick={loadFaq}
                        variant="outline"
                        className="mt-4"
                    >
                        Повторить попытку
                    </Button>
                </div>
            );
        }

        if (faqItems.length === 0) {
            return (
                <div className="text-center py-8 text-gray-500">
                    Вопросы отсутствуют
                </div>
            );
        }

        return (
            <div className="space-y-0">
                {faqItems.map((item, index) => (
                    <AccordionItemCustom
                        key={index}
                        item={item}
                        isOpen={openIndexes.includes(index)}
                        onToggle={() => handleToggle(index)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className='flex flex-col gap-4 bg-white-500 lg:p-6 p-4 rounded-[16px]'>
            {renderContent()}
        </div>
    );
};

export default FaqSection;