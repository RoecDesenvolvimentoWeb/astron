import { ReactElement } from "react";

interface IRegisterTemplateProps {
    orgRegister: ReactElement
    title: ReactElement
}

export const RegisterTemplate = (
    {
        orgRegister,
        title
    }: IRegisterTemplateProps
): ReactElement => {
    return (
        <div>
            {title}
            {orgRegister}
        </div>
    )
}