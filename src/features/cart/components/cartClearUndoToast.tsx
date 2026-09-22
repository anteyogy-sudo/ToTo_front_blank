'use client'

import {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import {ArrowSpinIcon} from "@/icons/arrow-spin";

interface Props {
    toastId: string;
    onUndo: () => void;
    onConfirm: () => void;
    duration?: number;
}

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export const UndoClearToast = ({ toastId, onUndo, onConfirm, duration = 5000 }: Props) => {
    const [seconds, setSeconds] = useState(Math.ceil(duration / 1000));
    const [progress, setProgress] = useState(0);

    const finishedRef = useRef(false);
    const onConfirmRef = useRef(onConfirm);
    const onUndoRef = useRef(onUndo);

    useEffect(() => {
        onConfirmRef.current = onConfirm;
    }, [onConfirm]);

    useEffect(() => {
        onUndoRef.current = onUndo;
    }, [onUndo]);

    useEffect(() => {
        const startedAt = Date.now();

        const intervalId = window.setInterval(() => {
            const elapsed = Date.now() - startedAt;
            const remaining = Math.max(duration - elapsed, 0);

            setProgress(Math.min(elapsed / duration, 1));
            setSeconds(Math.ceil(remaining / 1000));

            if (remaining <= 0) {
                window.clearInterval(intervalId);

                if (!finishedRef.current) {
                    finishedRef.current = true;

                    onConfirmRef.current();

                    toast.dismiss(toastId);
                }
            }
        }, 1000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [duration, toastId]);

    const handleUndo = () => {
        if (finishedRef.current) {
            return;
        }

        finishedRef.current = true;

        onUndoRef.current();
        toast.dismiss(toastId);
    };

    const strokeDashoffset =
        CIRCUMFERENCE - CIRCUMFERENCE * progress;

    return (
        <div className="flex w-[360px] flex-col gap-3 rounded-xl bg-white-500 p-4 shadow-lg">
            <div className="text-sm text-gray-700">
                Товары удалены
            </div>

            <div className="flex items-center justify-between gap-3">
                <button
                    type="button"
                    onClick={handleUndo}
                    className="flex items-center gap-1 font-bold text-[#828086]"
                >
                    Вернуть
                    <ArrowSpinIcon />
                </button>

                <div className="relative h-10 w-10">
                    <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r={RADIUS} stroke="#E5E7EB" strokeWidth="3" fill="none" />
                        <circle cx="20" cy="20" r={RADIUS} stroke="#3B82F6" strokeWidth="3" fill="none"
                            strokeDasharray={CIRCUMFERENCE} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
                        />
                    </svg>

                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {seconds}
                    </span>
                </div>
            </div>
        </div>
    );
};