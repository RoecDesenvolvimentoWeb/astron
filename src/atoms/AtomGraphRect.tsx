import { ReactElement } from "react";

interface IAtomRectGraphProps {
    className?: string
    style?: React.CSSProperties
    onHoverIn?: () => unknown
    onHoverOut?: () => unknown
    isHovering: boolean
}

export const AtomGraphRect = (props: IAtomRectGraphProps): ReactElement => {
    return (
        <>
            <div
                onMouseOver={props.onHoverIn}
                onMouseOut={props.onHoverOut}
                style={{
                    ...props.style,
                }}
                className={`${props.isHovering ? "bg-[#B468C2] ": ""} bg-[#E7DFE9] w-[25px] sm:w-[30px] md:w-[49px] max-w-[49px] delay-150 hover:bg-[#B468C2] ` + props.className}/>
        </>
    )
}