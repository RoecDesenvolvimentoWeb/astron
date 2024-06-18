import { MolBoostSales } from "@mols/panel/MolBoostSales";
import { ReactElement, useState } from "react";

export const OrgPanelBoostSales = (): ReactElement => {
    const [molBoostSalesIsClosed, setMolBoostSalesClosed] = useState(false)
    return (
        <>
            {!molBoostSalesIsClosed ? <div className="min-w-fit md:w-[512px] h-fit md:h-[309px] min-h-fit bg-white rounded-[16px] flex flex-col items-start px-[30px] py-[30px] gap-y-[16px]">
                <div className="w-full">
                    <div className="text-fuchsia-950 text-2xl font-medium font-['Geologica'] leading-[31.20px] text-left">Impulsione suas vendas</div>
                </div>
                <MolBoostSales onCloseCard={(): void => {
                    setMolBoostSalesClosed(true)
                }}/>
            </div> : <></>}
        </>
    )
}