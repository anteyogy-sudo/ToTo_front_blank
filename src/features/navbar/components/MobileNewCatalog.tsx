import React, {useMemo, useState} from 'react';
import {useWindowDimension} from "@/hooks/useWindowDimension";
import {useMobileMenuStore} from "@/features/navbar/stores/useMobileMenuStore";
import {useFetchCatalogsQuery} from "@/features/navbar/hooks/queries/useFetchCatalogsQuery";
import {useIsomorphicLayoutEffect} from "@/hooks/useIsomorphicLayoutEffect";
import Image from "next/image";
import {useFetchCatalogSubitems} from "@/features/navbar/hooks/queries/useFetchCatalogSubitems";
import Link from "next/link";
import {MoveLeft, X} from "lucide-react";

const MobileNewCatalog = () => {
    const {width} = useWindowDimension();
    const {openCatalog, setOpenCatalog} = useMobileMenuStore();
    const {data: catalogs, status: catalogsStatus} = useFetchCatalogsQuery({enabled: true});
    const [selectedCatalogId, setSelectedCatalogId] = useState<number | null>(null);
    const {data: catalogSubitems, status: subItemsStatus} = useFetchCatalogSubitems(selectedCatalogId);
    // ToDo: please to use statuses for showing loading and errors components

    const countOfSlice = useMemo(() => {
        return width >= 560 ? 2 : 2;
    }, [width]);

    useIsomorphicLayoutEffect(() => {
        if (width > 1144) {
            setOpenCatalog(false);
        }
    }, [width]);

    useIsomorphicLayoutEffect(() => {
        if (openCatalog) {
            document.body.style.setProperty('overflow', 'hidden', 'important');
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [openCatalog]);

    if (!openCatalog) return null;

    const categories = catalogSubitems?.data?.categories ?? [];

    const handleForwardBtnClick = () => {
        if (selectedCatalogId) setSelectedCatalogId(null)
        else (setOpenCatalog(false))
    }


    return (
        <div
            data-open={openCatalog}
            className={`fixed top-[139px] bottom-[calc(79px+env(safe-area-inset-bottom))] left-0 w-full overflow-y-auto custom-scroll 1144:hidden flex flex-col gap-4 bg-white-500 px-6 py-1 z-60`}
        >
            <div className="flex flex-row w-full gap-2 justify-between items-center">
                <button
                    className="flex w-fit h-fit p-2 rounded-full"
                    onClick={handleForwardBtnClick}
                >
                    <MoveLeft className='text-gray-400 hover:text-primary-blue transition-colors duration-500' />
                </button>
                <div className={"w-full flex flex-row gap-2 justify-center items-center"} >
                    { selectedCatalogId && catalogSubitems?.data && (
                        <Image
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px]"
                            src={catalogSubitems?.data?.image}
                            alt="catalog"
                        />
                    )}
                    <span className={"w-fit text-[22px] font-bold leading-[95%] text-balance items-center text-center"}>
                        {catalogSubitems?.data?.name || "Каталог"}
                    </span>
                </div>
                <button
                    className="flex w-fit h-fit p-2 rounded-full"
                    onClick={() => setOpenCatalog(false)}
                >
                    <X className='text-gray-400 hover:text-primary-blue transition-colors duration-500' />
                </button>
            </div>
            <hr />
            {selectedCatalogId ? (
                <div className="h-full w-full flex flex-col pt-[10px] gap-4">
                    {categories.map((subItem) => (
                        <Link
                            href={`/catalog/${subItem.id}?catalog=${catalogSubitems?.data?.name}&category=${subItem.name}`}
                            key={subItem.id}
                            onClick={() => setOpenCatalog(false)}
                            className="font-medium text-[16px] leading-[120%] text-primary-gray hover:text-primary-blue transition-colors duration-500"
                        >
                            {subItem.name}
                        </Link>
                    ))}
                </div>
            ) : (
                <ul className="grid flex-col gap-[3px]"
                    style={{ gridTemplateColumns: `repeat(${countOfSlice}, minmax(0, 1fr))`, }}>
                    {catalogs?.data?.map((item) => (
                        <div key={item.id}
                             onClick={() => setSelectedCatalogId(item.id)}
                             className="relative min-h-[140px] cursor-pointer p-3 ">
                            <Image
                                src={item.image}
                                alt="catalog"
                                fill
                                draggable={false}
                                className="object-cover select-none rounded-2xl p-1 opacity-[80%] hover:opacity-[50%] transition duration-300"
                            />
                            <span className="absolute p-1 text-balance break-normal text-[18px] font-medium pointer-events-none"
                                  style={{ color: '#'+item.text_color }}>
                                {item.name}
                            </span>
                        </div>

                        // <li
                        //     onClick={() => setSelectedCatalogId(item.id)}
                        //     key={item.id}
                        //     className={`h-[56px] font-bold break-all leading-[120%] flex gap-3 cursor-pointer items-center rounded-[16px] hover:text-primary-blue transition-colors duration-500 ${
                        //         item.id === selectedCatalogId && 'bg-[#EEF7FF] text-primary-blue'
                        //     } p-4`}
                        // >
                        //     <Image
                        //         width={18}
                        //         height={18}
                        //         className="w-[18px] h-[18px]"
                        //         src={item.image}
                        //         alt="catalog"
                        //     />
                        //     <span className="text-balance break-normal">{item.name}</span>
                        // </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MobileNewCatalog;