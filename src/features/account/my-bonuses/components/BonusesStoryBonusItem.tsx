import { BlueBonusIcon } from "@/icons/BlueBonusIcon";
import {Loyalty_history} from "@/types/bonuses.types";
import {RedBonusIcon} from "@/icons/RedBonusIcon";
import {formatDate} from "@/utils/formatDate";

interface Props {
    history: Loyalty_history;
}

export const BonusesStoryBonusItem = ({history}: Props) => {
  return (
    <div className="flex w-fit flex-col gap-1">
        { history.points > 0 && (
            <div className="flex items-center gap-2">
                <BlueBonusIcon />
                <span className=" text-black-100/70 text-[18px] leading-[120%]">
                    +{history.points} бонусов {formatDate(history.date)}
                </span>
            </div>
        )}

        { history.amount > 0 && (
            <div className="flex items-center gap-2">
                <RedBonusIcon />
                <span className=" text-black-100/70 text-[18px] leading-[120%]">
                    -{history.amount} бонусов {formatDate(history.date)}
                </span>
            </div>
        )}
    </div>
  );
};
