import { MolBiggestSalesMonthCard } from "@mols/panel/MolBiggestSalesMonthCard";
import { MolCurrentMonthSalesCard } from "@mols/panel/MolCurrentMonthSalesCard";
import { MolMembersActiveCard } from "@mols/panel/MolMembersActiveCard";
import { MolPreviousMonthSalesCard } from "@mols/panel/MolPreviousMonthSalesCard";
import { ReactElement } from "react";


interface IOrgStatisticsProps {
    membersActiveCount: number
    biggestMonthSales: {
        name: string
        salesCount: number
    }
    currentMonthSales: {
        percent: number
        sales: number
    }
    previousMonthSales: number
}

export const OrgStatistics = (props: IOrgStatisticsProps): ReactElement => {
    return (
        <>
            <div className="min-w-[300px] w-full h-full min-h-fit flex flex-col gap-y-[24px] overflow-x-auto flex-wrap">
                <div className="flex flex-col gap-y-[24px] md:gap-y-0 md:flex-row md:gap-x-[24px]">
                    <MolMembersActiveCard
                        membersActiveCount={props.membersActiveCount}
                    />
                    <MolBiggestSalesMonthCard
                        month={props.biggestMonthSales.name}
                        salesCount={props.biggestMonthSales.salesCount}
                    />
                </div>
                <div className="flex flex-col gap-y-[24px] md:gap-y-0 md:flex-row md:gap-x-[24px]">
                    <MolCurrentMonthSalesCard
                        percent={props.currentMonthSales.percent}
                        currentMonthSales={props.currentMonthSales.sales}
                    />
                    <MolPreviousMonthSalesCard
                        previousMonthSales={props.previousMonthSales}
                    />
                </div>
            </div>
        </>
    )
}