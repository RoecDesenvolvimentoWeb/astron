import { AtomTitle } from "@atom/AtomTitle";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { MolUpdateOrBindExistentAsaasAccount } from "@mols/panel/MolUpdateOrBindExistentAsaasAccount";
import { useQueryParameters } from "hooks/useQueryParameters";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServerApi } from "resources/api/server/ServerApi";
import { IAsaasAccount, IAsaasAccountGet, TCommonServerResponse } from "resources/api/server/contracts/ServerApiModel";
import { commonPromiseHandle } from "../../commonPromiseHandle";
import { IDefaultProps } from "../../default-props-main_content";
import loadPageResoucers from "../../loadPageResoucers";

const serverApi = new ServerApi()

interface IOrgPanelMainContentPaymentAccountUpdateBindProps extends IDefaultProps {}

export const OrgPanelMainContentPaymentAccountUpdateBind = ({
    setIsLoading
}: IOrgPanelMainContentPaymentAccountUpdateBindProps): ReactElement => {
    const [action, setAction] = useState<"BIND" | "UPDATE">("BIND")
    const [asaasAccount, setAsaasAccount] = useState<IAsaasAccountGet>()
    const navigate = useNavigate()

    const type = useQueryParameters("type")

    const loadAsaasAccount = async (): Promise<void> => {
        const prom = serverApi.getAsaasAccount()
        await commonPromiseHandle(
            prom,
            setAsaasAccount
        )
    }

    const onBindOrUpdateAccount = (type: "BIND" | "UPDATE", data: IAsaasAccount): void => {
        let prom: TCommonServerResponse<string>
        if (type === "BIND") {
            prom = serverApi.bindExistentAsaasAccount(data)
        } else {
            prom = serverApi.updateAsaasAccount(data)
        }
        commonPromiseHandle(
            prom,
            undefined,
            `Não foi possível ${type === "BIND" ? "vincular" : "atualizar"} a conta asaas`,
            `Conta asaas ${type === "BIND" ? "vinculada" : "atualizada"} com sucesso`,
            undefined,
            () => {
                setTimeout(() => {
                    navigate("/panel/payment/account")
                }, 500)
            }
        ).catch(() => {})
    }

    useEffect(() => {
        loadPageResoucers(
            setIsLoading,
            loadAsaasAccount()
        ).catch(() => {});
    }, [])

    useEffect(() => {
        setAction(type === "bind" ? "BIND" : "UPDATE")
    }, [type])
    return (
        <MolMainContentWrapper>
            <AtomTitle title={`${action === "BIND" ? "Vincular" : "Atualizar"} conta de pagamento ASAAS`}/>
            <MolUpdateOrBindExistentAsaasAccount
                onSubmit={onBindOrUpdateAccount}
                asaasAccount={asaasAccount}
                type={action}
            />
        </MolMainContentWrapper>
    )
}