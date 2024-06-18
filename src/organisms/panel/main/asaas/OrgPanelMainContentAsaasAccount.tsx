import { AtomTitle } from "@atom/AtomTitle";
import { IAsaasAccount, MolAsaasAccountCreateForm } from "@mols/panel/MolAsaasAccountCreateForm";
import { MolImportantExtraInfoAsaasAccountCreate } from "@mols/panel/MolImportantInfoAsaasAccountCreate";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServerApi } from "resources/api/server/ServerApi";
import { commonPromiseHandle } from "../commonPromiseHandle";
import { IDefaultProps } from "../default-props-main_content";

const serverApi = new ServerApi()

interface IOrgPanelMainContentAsaasAccountProps extends IDefaultProps {}

export const OrgPanelMainContentAsaasAccount = ({
    setIsLoading,
}: IOrgPanelMainContentAsaasAccountProps): ReactElement => {
    const navigate = useNavigate()

    const [isCreating, setIsCreating] = useState(false)

    const registerAsaasAccount = (data: IAsaasAccount): void => {
        setIsCreating(true)
        const prom = serverApi.createNewAsaasAccount(data)
        commonPromiseHandle(
            prom,
            undefined,
            "Não foi possível cadastrar a conta asaas.",
            "Conta asaas criada com sucesso",
            undefined,
            () => {
                setTimeout(() => {
                    navigate("/panel/payment/account")
                })
            }
        )
            .catch(() => {})
            .finally(() => {
                setIsCreating(false)
            })
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    });
    return (
        <>
            <MolMainContentWrapper>
                <AtomTitle
                    className=""
                    title="Preencha os campos para vincular a sua conta à Asaas."
                />
                <MolImportantExtraInfoAsaasAccountCreate/>
                <MolAsaasAccountCreateForm
                    isCreating={isCreating}
                    onRegisterAsaasAccount={registerAsaasAccount}
                />
            </MolMainContentWrapper>
        </>
    );
};
