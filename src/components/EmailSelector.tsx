"use client";

import React, { useState, useRef, useEffect } from 'react';
import { getGmailComposeUrl, getYandexComposeUrl } from '@/utils/mailto';

interface EmailSelectorProps {
    email: string;
    subject?: string;
    body?: string;
    className?: string;
    children?: React.ReactNode;
}

const EmailSelector: React.FC<EmailSelectorProps> = ({
email,
subject,
body,
className,
children, }) => {
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const handleClose = () => setShowPopup(false);

    const handleGmail = () => {
        window.open(getGmailComposeUrl(email, subject, body), '_blank');
        handleClose();
    };

    const handleYandex = () => {
        window.open(getYandexComposeUrl(email, subject, body), '_blank');
        handleClose();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                handleClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <span className="relative inline-block">
            <a
                ref={buttonRef}
                href="#"
                onClick={handleClick}
                className={className}
            >
                {children || email}
            </a>
            {showPopup && (
                <div
                    ref={popupRef}
                    className="absolute z-50 mt-2 bg-white-100 rounded-md shadow-lg border border-gray-200 p-2 min-w-[200px]"
                    style={{ top: '100%', left: 0, backgroundColor: 'white' }}
                >
                    <button
                        onClick={handleGmail}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                        Открыть в Google Mail
                    </button>
                    <button
                        onClick={handleYandex}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                        Открыть в Яндекс.Почте
                    </button>
                    <button
                        onClick={handleClose}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded mt-1 border-t border-gray-200"
                    >
                        Отмена
                    </button>
                </div>
            )}
        </span>
    );
};

export default EmailSelector;