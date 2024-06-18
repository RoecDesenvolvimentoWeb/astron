import { ReactElement } from "react";

interface AtomCloseCard {
    className?: string
    onClick?: () => unknown
}

export const AtomCloseCard = (props: AtomCloseCard): ReactElement => {
    return (
        <>
            <div onClick={props.onClick} className={"w-[50px] h-[50px] cursor-pointer " + props.className}>
                <div className="min-w-[50px] min-h-[50px] rounded-full border-[2.5px] border-[#4F4D56] border-r-[#D4D6D5] -rotate-[45deg] flex items-center justify-center">
                    <div className={"flex relative rotate-[45deg] w-full h-full items-center justify-center"}>
                        <div className="h-[2.5px] w-[25px] rounded-full bg-[#4F4D56] -rotate-[45deg] absolute"></div>
                        <div className="h-[2.5px] w-[25px] rounded-full bg-[#4F4D56] rotate-[45deg] absolute"></div>
                    </div>
                </div>
            </div>
        </>
    )
}