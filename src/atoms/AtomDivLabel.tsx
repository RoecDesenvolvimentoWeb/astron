import { ReactElement, ReactNode } from "react";

interface IAtomDivRegisterUser {
    children: ReactNode
    className?: string
}

export const AtomDivLabel = (props: IAtomDivRegisterUser): ReactElement => {
    return (
        <div className={"flex flex-col items-start gap-[12px] " + props.className}>
            {props.children}
        </div>
    )
}