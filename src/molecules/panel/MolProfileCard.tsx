import { AtomCard } from "@atom/AtomCard";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface IMolProfileCardProps {
    name: string
    career: string
    createdDateYear: string
    botsActiveCount: number
    totalSales: number
}

export const MolProfileCard = (props: IMolProfileCardProps): ReactElement => {
    const navigate = useNavigate()
    return (
        <>
            <AtomCard
                className={"w-full min-w-full md:min-w-[387px] min-h-[449px] h-fit justify-start bg-white pt-[36px] pb-[45px]"}
            >
                <div className="flex min-w-full flex-col justify-center">
                    <div className="flex flex-col w-full h-fit items-center gap-y-[8px]">
                        <div className="h-fit w-fit">
                            <div className="border-[1px] border-[#451C7B] p-[4px] rounded-full relative">
                                <div className="w-[90px] h-[90px] bg-no-repeat bg-cover bg-[-7px_2px] rounded-full bg-[url('/src/assets/bot-icon.svg')]"/>
                                <div className="w-4 h-4 bg-[#04C000] rounded-full absolute right-4 bottom-0" />
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-neutral-600 text-xl font-normal font-['Geologica'] leading-relaxed">{props.name}</div>
                            <div className="text-neutral-400 text-base font-normal font-['Geologica'] leading-snug">{props.career}</div>
                        </div>
                    </div>
                    <div className="flex min-w-full flex-row justify-center gap-x-[16px] h-fit pt-[41.43px]">
                        <>
                            <div
                                onClick={(): void => {
                                    navigate("/panel/account")
                                }}
                                className="cursor-pointer bg-[url('/src/assets/profile.svg')] w-[48px] h-[48px] bg-center bg-cover"/>
                        </>
                        <>
                            <div
                                onClick={(): void => {
                                    navigate("/panel/bot/config")
                                }}
                                className="cursor-pointer relative flex items-center justify-center h-fit w-fit">
                                <div className="bg-[url('/src/assets/robot.svg')] w-[48px] h-[48px] bg-center bg-cover"/>
                                <div className="absolute my-auto mx-auto pb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
                                        <path d="M16.7304 10.3565H5.42665C4.94643 10.3565 4.55713 10.7907 4.55713 11.3264V21.0248C4.55713 21.5604 4.94643 21.9947 5.42665 21.9947H16.7304C17.2106 21.9947 17.5999 21.5604 17.5999 21.0248V11.3264C17.5999 10.7907 17.2106 10.3565 16.7304 10.3565Z" stroke="#61296B" stroke-width="1.8"/>
                                        <mask id="path-2-inside-1_191_2527" fill="white">
                                            <path d="M8.03504 15.2057C8.51527 15.2057 8.90456 14.7715 8.90456 14.2359C8.90456 13.7003 8.51527 13.2661 8.03504 13.2661C7.55482 13.2661 7.16553 13.7003 7.16553 14.2359C7.16553 14.7715 7.55482 15.2057 8.03504 15.2057Z"/>
                                        </mask>
                                        <path d="M8.03504 15.2057C8.51527 15.2057 8.90456 14.7715 8.90456 14.2359C8.90456 13.7003 8.51527 13.2661 8.03504 13.2661C7.55482 13.2661 7.16553 13.7003 7.16553 14.2359C7.16553 14.7715 7.55482 15.2057 8.03504 15.2057Z" fill="#61296B"/>
                                        <path d="M7.10456 14.2359C7.10456 14.068 7.16584 13.8805 7.30966 13.7201C7.45628 13.5566 7.71013 13.4057 8.03504 13.4057V17.0057C9.6892 17.0057 10.7046 15.5757 10.7046 14.2359H7.10456ZM8.03504 13.4057C8.35996 13.4057 8.61381 13.5566 8.76043 13.7201C8.90425 13.8805 8.96553 14.068 8.96553 14.2359H5.36553C5.36553 15.5757 6.38089 17.0057 8.03504 17.0057V13.4057ZM8.96553 14.2359C8.96553 14.4038 8.90425 14.5913 8.76043 14.7517C8.61381 14.9152 8.35996 15.0661 8.03504 15.0661V11.4661C6.38089 11.4661 5.36553 12.8961 5.36553 14.2359H8.96553ZM8.03504 15.0661C7.71013 15.0661 7.45628 14.9152 7.30966 14.7517C7.16584 14.5913 7.10456 14.4038 7.10456 14.2359H10.7046C10.7046 12.8961 9.6892 11.4661 8.03504 11.4661V15.0661Z" fill="#61296B" mask="url(#path-2-inside-1_191_2527)"/>
                                        <mask id="path-4-inside-2_191_2527" fill="white">
                                            <path d="M14.122 15.2057C14.6022 15.2057 14.9915 14.7715 14.9915 14.2359C14.9915 13.7003 14.6022 13.2661 14.122 13.2661C13.6417 13.2661 13.2524 13.7003 13.2524 14.2359C13.2524 14.7715 13.6417 15.2057 14.122 15.2057Z"/>
                                        </mask>
                                        <path d="M14.122 15.2057C14.6022 15.2057 14.9915 14.7715 14.9915 14.2359C14.9915 13.7003 14.6022 13.2661 14.122 13.2661C13.6417 13.2661 13.2524 13.7003 13.2524 14.2359C13.2524 14.7715 13.6417 15.2057 14.122 15.2057Z" fill="#61296B"/>
                                        <path d="M13.1915 14.2359C13.1915 14.068 13.2528 13.8805 13.3966 13.7201C13.5432 13.5566 13.797 13.4057 14.122 13.4057V17.0057C15.7761 17.0057 16.7915 15.5757 16.7915 14.2359H13.1915ZM14.122 13.4057C14.4469 13.4057 14.7007 13.5566 14.8473 13.7201C14.9912 13.8805 15.0524 14.068 15.0524 14.2359H11.4524C11.4524 15.5757 12.4678 17.0057 14.122 17.0057V13.4057ZM15.0524 14.2359C15.0524 14.4038 14.9912 14.5913 14.8473 14.7517C14.7007 14.9152 14.4469 15.0661 14.122 15.0661V11.4661C12.4678 11.4661 11.4524 12.8961 11.4524 14.2359H15.0524ZM14.122 15.0661C13.797 15.0661 13.5432 14.9152 13.3966 14.7517C13.2528 14.5913 13.1915 14.4038 13.1915 14.2359H16.7915C16.7915 12.8961 15.7761 11.4661 14.122 11.4661V15.0661Z" fill="#61296B" mask="url(#path-4-inside-2_191_2527)"/>
                                        <path d="M11.9173 18.1851H10.2392V18.0454H11.9173V18.1851Z" fill="#61296B" stroke="#61296B" stroke-width="1.8"/>
                                        <path d="M11.0785 6.47711V10.3565M2.3833 14.2359V18.1153M19.7737 14.2359V18.1153" stroke="#61296B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M11.0785 6.47711C11.5587 6.47711 11.948 6.04289 11.948 5.50726C11.948 4.97163 11.5587 4.53741 11.0785 4.53741C10.5983 4.53741 10.209 4.97163 10.209 5.50726C10.209 6.04289 10.5983 6.47711 11.0785 6.47711Z" stroke="#61296B" stroke-width="1.8"/>
                                    </svg>
                                </div>
                            </div>
                        </>
                        <>
                            <div
                                onClick={(): void => {
                                    navigate("/panel/payment/account")
                                }}
                                className="cursor-pointer relative flex items-center justify-center h-fit w-fit">
                                <div className="bg-[url('/src/assets/robot.svg')] w-[48px] h-[48px] bg-center bg-cover"/>
                                <div className="absolute my-auto mx-auto pb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path d="M17.1263 14.8631C16.688 15.7239 15.9594 16.4726 15.0316 17.0378L15.4533 18.429C15.4769 18.507 15.482 18.5893 15.468 18.6696C15.4541 18.7498 15.4216 18.8257 15.3731 18.8911C15.3246 18.9565 15.2614 19.0096 15.1887 19.0463C15.1159 19.0829 15.0356 19.102 14.9542 19.102H13.4204C13.3075 19.102 13.1977 19.0654 13.1074 18.9977L11.8944 18.0873H9.77536L8.56238 18.9977C8.47208 19.0654 8.36224 19.102 8.24936 19.102H6.71553C6.63409 19.102 6.55379 19.0829 6.48106 19.0463C6.40832 19.0096 6.34517 18.9565 6.29666 18.8911C6.24815 18.8257 6.21563 18.7498 6.2017 18.6696C6.18776 18.5893 6.19281 18.507 6.21642 18.429L6.63814 17.0378C5.0817 16.0891 4.0835 14.6231 4.0835 12.9789C4.0835 10.1182 7.10594 7.79829 10.8353 7.79829C11.5909 7.79829 12.5352 8.05741 13.2134 8.23305L17.1263 6.92877L17.0532 10.0834L18.8653 10.8416V13.8849L17.1906 14.7544" stroke="#61296B" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M14.0827 12.1459C13.9674 12.1459 13.8568 12.1001 13.7753 12.0185C13.6938 11.937 13.6479 11.8264 13.6479 11.7111C13.6479 11.5958 13.6938 11.4852 13.7753 11.4037C13.8568 11.3222 13.9674 11.2764 14.0827 11.2764C14.198 11.2764 14.3086 11.3222 14.3901 11.4037C14.4717 11.4852 14.5175 11.5958 14.5175 11.7111C14.5175 11.8264 14.4717 11.937 14.3901 12.0185C14.3086 12.1001 14.198 12.1459 14.0827 12.1459Z" fill="#61296B" stroke="#61296B" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M2.34424 9.53729C2.34424 9.53729 2.34424 11.6241 4.08327 12.1458" stroke="#61296B" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M11.735 7.5835C11.848 7.26004 11.9089 6.91223 11.9089 6.55051C11.9089 4.83843 10.5464 3.45068 8.86558 3.45068C7.1848 3.45068 5.82227 4.83843 5.82227 6.55051C5.82227 7.36873 6.13355 8.11391 6.64309 8.66779" stroke="#61296B" stroke-width="1.7" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </>
                    </div>
                    <div className="flex w-full justify-center pt-[32.84px]">
                        <div className="w-[267px] h-[1.50px] opacity-20 bg-[#A09FA5]" />
                    </div>
                    <div className="pt-[20.5px] w-full flex flex-col gap-y-[8px] items-center">
                        <div className="w-3/4 flex justify-start">
                            <div className="text-[#4F4D56] text-sm font-medium font-['Geologica'] leading-tight">Membro desde {props.createdDateYear}</div>
                        </div>
                        <div className="w-3/4 flex justify-start">
                            <div className="w-[267px] opacity-80">
                                <span className="text-zinc-500 text-sm font-normal font-['Geologica'] leading-tight">Você tem</span>
                                <span className="text-zinc-500 text-sm font-normal font-['Geologica'] leading-tight"> </span>
                                <span className="text-neutral-600 text-sm font-medium font-['Geologica'] leading-tight">{props.botsActiveCount} bots ativos</span>
                                <span className="text-zinc-500 text-sm font-normal font-['Geologica'] leading-tight"> </span>
                                <span className="text-zinc-500 text-sm font-normal font-['Geologica'] leading-tight">no momento e mais de</span>
                                <span className="text-zinc-500 text-sm font-normal font-['Geologica'] leading-tight"> </span>
                                <span className="text-neutral-600 text-sm font-medium font-['Geologica'] leading-tight">${props.totalSales.toFixed(2)}</span>
                                <span className="text-zinc-500 text-sm font-normal font-['Geologica'] leading-tight"> </span>
                                <span className="text-zinc-500 text-sm font-normal font-['Geologica'] leading-tight">em faturamento acumulados até hoje</span>
                                <span className="text-zinc-500 text-sm font-normal font-['Geologica'] leading-tight">.</span></div>

                        </div>
                    </div>
                </div>
            </AtomCard>
        </>
    )
}