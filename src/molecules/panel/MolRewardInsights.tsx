import { AtomCard } from "@atom/AtomCard";
import { ReactElement } from "react";

interface IMolRewardInsightsProps {
    percentageComparasionToLastMonth: number
    acquiredCustomersCurrentMonth: number
    tasksCompletedCurrentMonth: number
}

export const MolRewardInsights = ({ percentageComparasionToLastMonth, acquiredCustomersCurrentMonth, tasksCompletedCurrentMonth }: IMolRewardInsightsProps): ReactElement => {
    return (
        <>
            <AtomCard
                className="items-center flex-col gap-y-[20px] py-[17px] px-[21px] w-full flex-1 md:w-fit md:min-w-[142px] min-h-[208px] bg-white h-fit"
            >
                <div className="flex flex-col items-center gap-y-[18px]">
                    <div>
                        <div className="w-fit h-fit rounded-[50px] bg-[#D25AC47A] px-[8px]">
                            <div className="text-[#61296B] text-sm font-normal font-['Geologica'] leading-tight">+{percentageComparasionToLastMonth}%</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-[12px] items-center h-fit w-fit">
                        <div className="flex flex-row items-center gap-x-[8px] h-fit w-fit">
                            <div className="w-[46px] h-[21px] text-center text-[#32063D] text-[28px] font-medium font-['Geologica'] leading-9">{tasksCompletedCurrentMonth}</div>
                            <svg className="mt-2" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.3452 3.07169H11.1507V2.43561C11.1507 2.30909 11.1004 2.18774 11.011 2.09828C10.9215 2.00881 10.8001 1.95855 10.6736 1.95855H9.67179C9.53686 1.67192 9.32317 1.42959 9.05567 1.25986C8.78817 1.09013 8.47791 1 8.16111 1C7.8443 1 7.53404 1.09013 7.26654 1.25986C6.99904 1.42959 6.78535 1.67192 6.65042 1.95855H5.66449C5.53797 1.95855 5.41663 2.00881 5.32716 2.09828C5.2377 2.18774 5.18743 2.30909 5.18743 2.43561V3.07169H2.97706C2.85054 3.07169 2.72919 3.12195 2.63973 3.21142C2.55026 3.30088 2.5 3.42222 2.5 3.54875V15.5229C2.5 15.6495 2.55026 15.7708 2.63973 15.8603C2.72919 15.9497 2.85054 16 2.97706 16H13.3452C13.4717 16 13.593 15.9497 13.6825 15.8603C13.7719 15.7708 13.8222 15.6495 13.8222 15.5229V3.54875C13.8222 3.42222 13.7719 3.30088 13.6825 3.21142C13.593 3.12195 13.4717 3.07169 13.3452 3.07169ZM10.1966 4.12122H6.14155V2.91267H7.00026C7.10914 2.91124 7.21426 2.8726 7.29815 2.80317C7.38204 2.73375 7.43965 2.63771 7.46142 2.53102C7.48689 2.36157 7.57232 2.20689 7.70218 2.09509C7.83204 1.9833 7.9977 1.92181 8.16906 1.92181C8.34041 1.92181 8.50607 1.9833 8.63593 2.09509C8.76579 2.20689 8.85122 2.36157 8.87669 2.53102C8.89846 2.63771 8.95608 2.73375 9.03997 2.80317C9.12386 2.8726 9.22897 2.91124 9.33785 2.91267H10.1966V4.12122Z" fill="#9EA1A2"/>
                            </svg>
                        </div>
                        <div className="w-[126px] h-[31px] text-center text-[#8A8D8F] text-sm font-normal font-['Geologica'] leading-tight">Tarefas realizadas esse mês </div>
                    </div>
                </div>
                <div>
                    <div className="w-[142px] h-px opacity-20 bg-[#A09FA5]" />
                </div>
                <div className="flex flex-col gap-y-[12px] justify-center">
                    <div className="flex flex-row gap-x-2 items-center justify-center">
                        <div className="w-20 h-[21px] text-center text-fuchsia-950 text-[28px] font-medium font-['Geologica'] leading-9">{acquiredCustomersCurrentMonth}</div>
                        <svg className="mt-3" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5833 5.58333C11.5833 4.31742 11.07 3.17158 10.2413 2.34292C9.41175 1.51333 8.26592 1 7 1C5.73408 1 4.58825 1.51333 3.75867 2.34292C2.93 3.17158 2.41667 4.31742 2.41667 5.58333C2.41667 6.84925 2.93 7.99508 3.75867 8.82375C4.58825 9.65333 5.73408 10.1667 7 10.1667C8.26592 10.1667 9.41175 9.65333 10.2413 8.82375C10.6674 8.39865 11.0054 7.89355 11.2357 7.33745C11.466 6.78135 11.5841 6.18523 11.5833 5.58333ZM1.5 14.75C1.5 15.6667 3.5625 16.5833 7 16.5833C10.2248 16.5833 12.5 15.6667 12.5 14.75C12.5 12.9167 10.3422 11.0833 7 11.0833C3.5625 11.0833 1.5 12.9167 1.5 14.75Z" fill="#9EA1A2"/>
                        </svg>
                    </div>
                    <div>
                        <div className="w-[137px] h-[31px] text-center text-[#8A8D8F] text-sm font-normal font-geo leading-tight">Clientes alcançados esse mês</div>
                    </div>
                </div>
            </AtomCard>
        </>
    )
}