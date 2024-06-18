import { AtomCard } from "@atom/AtomCard";
import { ReactElement } from "react";

interface IMolMonthInsightsProps {
    activeMembersCount: number
    activeBotsCount: number
    salesPercent: number
}

export const MolMonthInsights = (props: IMolMonthInsightsProps): ReactElement => {
    return (
        <>
            <AtomCard
                className={"bg-white h-[360px] w-full md:w-[332px] py-4 flex flex-wrap flex-row md:flex-col md:px-0 !justify-center !items-center !px-10"}
            >
                <div className="flex flex-col items-center sm:pl-10 md:pl-0">
                    <div className="text-fuchsia-900 text-xl font-medium font-['Geologica'] leading-7">Seus resultados neste mês</div>
                    <div className="w-[218px] h-[68px] justify-start items-start gap-8 inline-flex">
                        <div className="w-[110px] h-[68px] relative">
                            <div className="w-6 h-6 left-[86px] top-[13px] absolute" />
                            <div className="left-0 top-[48px] absolute text-neutral-600 text-sm font-normal font-['Geologica'] leading-tight">membros ativos</div>
                            <div className="left-0 top-0 absolute text-neutral-600 text-[32px] font-medium font-['Geologica'] leading-[44.80px]">{props.activeMembersCount}</div>
                        </div>
                        <div className="w-[76px] h-[68px] relative">
                            <div className="left-0 top-[48px] absolute text-neutral-600 text-sm font-normal font-['Geologica'] leading-tight">bots ativos</div>
                            <div className="left-[1px] top-0 absolute text-neutral-600 text-[32px] font-medium font-['Geologica'] leading-[44.80px]">{props.activeBotsCount}</div>
                            <div className="w-6 h-6 left-[52px] top-[12px] absolute" />
                        </div>
                    </div>
                </div>
                <>
                    <div className={`c100 p${props.salesPercent} center`}>
                        <>
                            <span>{props.salesPercent}%</span>
                        </>
                        <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>
                </>
            </AtomCard>
        </>
    )
}