import {Clock4Icon, MapPin, PhoneIcon} from "lucide-react";
import {formatPhone} from "@/utils/formatPhone";
import {groupSchedule} from "@/utils/scheduleTime";
import React from "react";


interface store {
    address?: string;
    phone?: string;
    schedule?: string;
    inscriptions?: boolean;
}

export const PharmacyInfo = (store: store) => {
    return (
        <div className="flex flex-col gap-[10px]">
            { store.address && (
                <div className="flex flex-col gap-[3px]">
                  { store.inscriptions && (
                      <span className="font-bold">Адрес:</span>
                  )}
                      <span className="flex flex-row items-center gap-[5px] text-primary-blue">
                          <MapPin className="min-w-[19px] text-[#656A6D]" />
                          {store.address}
                      </span>
                </div>
            )}
            { store.phone && (
                <div className="flex flex-col gap-[3px]">
                    { store.inscriptions && (
                        <span className="font-bold">Телефон:</span>
                    )}
                    <a href={"tel:" + store.phone} className="flex w-fit flex-row items-center gap-[6px] hover:underline text-primary-blue">
                        <PhoneIcon color="#656A6D" className="min-w-[19px]" size="19px"/>
                        {formatPhone(store.phone)}
                    </a>
                </div>
            )}
            { store.schedule && (
                <div className="flex flex-col gap-[3px]">
                    { store.inscriptions && (
                        <span className="font-bold">Время работы:</span>
                    )}
                    <span className="flex flex-row items-center gap-[6px] text-pretty break-all whitespace-break-spaces">
                        <Clock4Icon color="#656A6D" className="min-w-[19px]" size="19px"/>
                        {groupSchedule(store.schedule)}
                    </span>
                </div>
            )}
        </div>
    );
}



