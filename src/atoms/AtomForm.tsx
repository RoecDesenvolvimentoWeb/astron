import { ReactElement, ReactNode } from "react";

interface IAtomFormProps {
    children: ReactNode;
    className?: string;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => unknown;
}

export const AtomForm = ({
    className,
    onSubmit,
    children
}: IAtomFormProps): ReactElement => {
    return (
        <form
            onSubmit={onSubmit}
            className={
                "flex flex-col shrink-0 items-start gap-[16px] w-[100%] relative " + className
            }
        >
            {children}
        </form>
    );
};
