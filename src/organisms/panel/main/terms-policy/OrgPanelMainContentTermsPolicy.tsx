import { AtomTitle } from "@atom/AtomTitle";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { MolTermsAndPolicy } from "@mols/panel/MolTermsAndPolicy";
import { ReactElement, useEffect } from "react";
import { IDefaultProps } from "../default-props-main_content";

interface IOrgPanelMainContentTermsPolicyProps extends IDefaultProps {}

export const OrgPanelMainContentTermsPolicy = ({ setIsLoading }: IOrgPanelMainContentTermsPolicyProps): ReactElement => {
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 300)
    }, [])
    return (
        <>
            <MolMainContentWrapper>
                <AtomTitle title="Políticas de Privacidade e Termos de uso"/>
                <div>
                    <MolTermsAndPolicy/>
                </div>
            </MolMainContentWrapper>
        </>
    )
}