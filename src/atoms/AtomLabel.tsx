import { ReactElement, ReactNode } from "react";

interface IAtomLabelProps {
    isRequired?: boolean
    children?: ReactNode
    className?: string
}

export const AtomLabel = (props: IAtomLabelProps): ReactElement => {
    const isRequired = !!props.isRequired
    return (
        <label className={`font-geo text-[16px] font-light leading-[140%] ${isRequired && "after:text-[#CD5656] after:content-['*']"} ` + props.className}>
            {props.children}
        </label>
    )
}