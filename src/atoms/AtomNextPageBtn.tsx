import { ReactElement } from "react";

interface IAtomNextPageBtnProps {
    page: number
    onClick: () => unknown
}

export const AtomNextPageBtn = (props: IAtomNextPageBtnProps): ReactElement => {
    return (
        <div onClick={props.onClick} className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer">
            <div className="text-[#32063D] text-base font-medium font-geo leading-snug">
                {props.page}
            </div>
        </div>
    )
}