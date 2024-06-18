import { ReactElement, ReactNode } from "react";

interface IMolMainContentWrapperProps {
    className?: string;
    children?: ReactNode | ReactNode[];
}

export const MolMainContentWrapper = (
    props: IMolMainContentWrapperProps
): ReactElement => {
    return (
        <>
            <div
                className={
                    "flex flex-col space-y-[24px] pl-2 sm:pl-0 overflow-x-hidden overflow-y-hidden md:overflow-x-auto sm:overflow-y-auto min-w-[320px] sm:pb-10 md:w-full mt-20 md:mt-0 " +
          props.className
                }
            >
                {props.children}
            </div>
        </>
    );
};
