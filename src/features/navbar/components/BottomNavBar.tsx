"use client";
import { AuthButton } from "@/features/navbar/components/AuthButton";
import { FavoritesLink } from "@/features/navbar/components/FavoritesLink";
import { CartLink } from "@/features/navbar/components/cart-link";
import { MobileCatalogsDialog } from "./MobileCatalogsDialog";
import React, {FC} from "react";
import CardIcon from "@/icons/CardIcon";
import { useMobileMenuStore } from "@/features/navbar/stores/useMobileMenuStore";

interface BottomNavBarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomNavBar: FC<BottomNavBarProps> = ({open, setOpen}) => {
    const { setOpenCatalog } = useMobileMenuStore();

    const closeCatalog = () => setOpenCatalog(false);

    const onClickBonus = () => {
        closeCatalog();
        setOpen((prev) => !prev);
    };


    return (
        <div className="1144:hidden fixed inset-x-0 bottom-0 z-[120] flex h-[calc(79px+env(safe-area-inset-bottom))] items-center justify-between bg-white-500 px-6 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
            <MobileCatalogsDialog />
            <div onClick={onClickBonus} className="cursor-pointer w-fit flex flex-col items-center text-center">
                <CardIcon variant={open ? "siren" : "cloud"} />
                <span className="text-sm text-primary-gray font-medium">Карта</span>
            </div>

            <FavoritesLink onNavigate={closeCatalog} />
            <CartLink onNavigate={closeCatalog} />
            <AuthButton onNavigate={closeCatalog} />
        </div>
    );
};

export default BottomNavBar;