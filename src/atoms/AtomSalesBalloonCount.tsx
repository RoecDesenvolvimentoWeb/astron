import { ReactElement } from "react";

interface IAtomSalesBalloonCount {
    salesCount: number
}

export const AtomSalesBalloonCount = (props: IAtomSalesBalloonCount): ReactElement => {
    return (
        <>
            <div className={"flex items-center justify-center rounded-[16px] bg-[#F6F6F9] min-w-fit w-[70px] sm:w-[80px] md:w-[104px] max-w-[104px] h-[33px] max-h-[33px] shrink-0"}>
                <p className={"font-geo text-[#32063D] text-[10px] sm:text-[13px] md:text-[16px] font-medium leading-[140%]"}>
                    <span>R$ </span>
                    {props.salesCount}
                </p>
            </div>
        </>
    )
}