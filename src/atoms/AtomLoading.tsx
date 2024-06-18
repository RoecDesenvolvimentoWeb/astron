import { ReactElement } from "react";

interface IAtomLoadingProps {
    isInView: boolean
    className?: string
}

export const AtomLoading = ({ isInView, className }: IAtomLoadingProps): ReactElement => {
    return (
        <>
            <div className={(isInView ? "absolute" : "hidden") + " bg-gradient-to-r from-lilas-lv1 to-lilas-lv4 animate-spin w-10 h-10 rounded-full flex items-center justify-center " + className}>
                <div className="w-[1.8rem] h-[1.8rem] bg-white rounded-full"/>
            </div>
        </>
    )
}
