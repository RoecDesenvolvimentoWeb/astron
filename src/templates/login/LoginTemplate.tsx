import { ReactElement } from "react";

interface ILoginTemplateProps {
    orgLogin: ReactElement
    title: ReactElement
}

export const LoginTemplate = (
    {
        orgLogin,
        title
    }: ILoginTemplateProps
): ReactElement => {
    return (
        <div>
            {title}
            {orgLogin}
        </div>
    )
}