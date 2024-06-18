import { ReactElement, ReactNode } from "react";
import { getRandomArrayItem } from "utils/getRandomArrayItems";
import { MemeberIcons } from "./resourcers/MemeberIcons";

interface IMolMemberPaymentUpdateProps {
    date: Date
    value: number
    memberName: string
}

export const MolMemberPaymentUpdate = (props: IMolMemberPaymentUpdateProps): ReactElement => {
    const brDate = props.date.toLocaleString().replace("-", ".")
    return (
        <>
            <div className={"flex flex-row bg-white w-fit min-h-[45px] h-fit gap-x-[8px] items-center"}>
                <div className="w-[35.50px] h-[35.50px]">
                    {getRandomArrayItem<ReactNode>(MemeberIcons)}
                </div>
                <div className="flex flex-col w-fit space-y-[8px]">
                    <div className="text-neutral-600 text-base font-medium font-['Geologica'] leading-snug">{props.memberName}</div>
                    <div className="flex flex-row gap-x-[6px] items-center">
                        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.79484 1.11516C9.52129 0.841618 9.07779 0.841618 8.80424 1.11516L3.52055 6.39872L1.19576 4.07405C0.922212 3.80051 0.478711 3.80051 0.205165 4.07406C-0.0683882 4.34761 -0.0683882 4.79112 0.205165 5.06467L3.02525 7.88476C3.16194 8.02158 3.34131 8.08999 3.52055 8.08999C3.69979 8.08999 3.87916 8.02158 4.01585 7.88476L9.79484 2.10577C10.0684 1.83222 10.0684 1.38871 9.79484 1.11516Z" fill="#A09FA5"/>
                        </svg>
                        <div className="w-fit h-[15px] text-neutral-400 text-sm font-normal font-['Geologica'] leading-tight">{brDate} | R$ {props.value}</div>
                    </div>
                </div>
            </div>
        </>
    )
}