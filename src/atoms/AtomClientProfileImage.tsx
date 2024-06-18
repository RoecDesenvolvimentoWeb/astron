import { ReactElement } from "react";

interface IAtomClientProfileImageProps {
    imgSrc: string
    className?: string
}

export const AtomClientProfileImage = ({ imgSrc, className = "" }: IAtomClientProfileImageProps): ReactElement => {
    return (
        <>
            <img src={imgSrc} className={"rounded-full bg-cover " + className} alt={"Profile"}/>
        </>
    )
}