import { ReactElement } from "react";

interface IAtomTitleProps {
    title: string;
    className?: string;
}

export const AtomTitle = (props: IAtomTitleProps): ReactElement => {
    return (
        <>
            <h1
                className={
                    "w-full h-fit text-[#32063D] max-sm:mt-[20px] text-[22px] sm:text-[25px] md:text-[28px] font-geo md:font-medium  " +
          props.className
                }
            >
                {props.title}
            </h1>
        </>
    );
};
