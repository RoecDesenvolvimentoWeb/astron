import { ReactElement, ReactNode } from "react";

interface IAtomCardProps {
    className?: string;
    children?: ReactNode | ReactNode[];
    onClick?: () => void
}

export const AtomCard = ({
    children,
    className,
    onClick
}: IAtomCardProps): ReactElement => {
    return (
        <div
            onClick={onClick}
            className={
                "rounded-[16px]  max-md:px-[0px] flex justify-start  items-center h-fit gap-[10px] shrink-0 font-geo " +
        className
            }
        >
            {children}
        </div>
    );
};
