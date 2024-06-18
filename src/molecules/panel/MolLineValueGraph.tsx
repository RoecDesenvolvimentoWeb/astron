import { AtomLine } from "@atom/AtomLine";
import { ReactElement } from "react";

interface IMolLineValueGraphProps {
    value: string
    className?: string
}

export const MolLineValueGraph = ({ value, className }: IMolLineValueGraphProps): ReactElement => {
    return (
        <>
            <div className={"relative " + className}>
                <span className="absolute -left-6 -top-[0.55rem] text-[#8A8D8F] font-mono text-[11px] md:text-[12px] font-extralight">{value}k</span>
                <AtomLine/>
            </div>
        </>
    )
}