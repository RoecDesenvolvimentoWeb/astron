import { ReactElement, ReactNode } from "react";

interface IMolActionLayerWrapperProps {
    className?: string
    children?: ReactNode
}

export const MolActionLayerWrapper = (props: IMolActionLayerWrapperProps): ReactElement => {
    return (
        <div className={"w-screen h-screen min-w-fit min-h-fit fixed left-0 top-0 bg-[#7A7A7A66] !mt-0 z-[50] overscroll-contain " + (props?.className ?? "")}>
            {props.children}
        </div>
    )
}