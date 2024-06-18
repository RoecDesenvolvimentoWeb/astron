import { ReactElement } from "react";

interface IPolicyTemplateProps {
    orgPolicy: ReactElement
}

export const PolicyTemplate = ({ orgPolicy }: IPolicyTemplateProps): ReactElement => {
    return (
        <>
            {orgPolicy}
        </>
    )
}