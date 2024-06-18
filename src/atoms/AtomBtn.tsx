import { ReactElement, ReactNode } from "react";

interface IButtonProps {
    isDisable?: boolean;
    className?: string;
    children?: ReactNode;
    btnType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
    onClick?: () => unknown;
}

export const AtomBtn = ({
    isDisable,
    className,
    children,
    btnType,
    onClick,
}: IButtonProps): ReactElement => {
    const defaultStyle =
		" h-[45px] rounded-[50px] font-geo tracking-wide font-medium text-light-blue-lv1 w-[250px]";
    return (
        <button
            onClick={onClick}
            disabled={isDisable}
            type={btnType}
            className={defaultStyle + " " + className}>
            {children}
        </button>
    );
};
