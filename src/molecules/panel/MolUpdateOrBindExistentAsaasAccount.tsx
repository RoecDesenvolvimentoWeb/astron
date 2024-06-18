import { AtomBtn } from "@atom/AtomBtn";
import { AtomDivLabel } from "@atom/AtomDivLabel";
import { AtomForm } from "@atom/AtomForm";
import { AtomInputField } from "@atom/AtomInputField";
import { AtomLabel } from "@atom/AtomLabel";
import { ReactElement, useEffect, useState } from "react";
import { IAsaasAccount, IAsaasAccountGet } from "resources/api/server/contracts/ServerApiModel";

interface IMolUpdateOrBindExistentAsaasAccountProps {
    type: "UPDATE" | "BIND"
    asaasAccount: IAsaasAccountGet | undefined
    onSubmit: (type: this["type"], data: IAsaasAccount) => unknown
}

const INITIAL_ASAAS_ACCOUNT: IAsaasAccount = {
    token: "",
    walletId: ""
}

export const MolUpdateOrBindExistentAsaasAccount = ({
    type,
    asaasAccount,
    onSubmit
}: IMolUpdateOrBindExistentAsaasAccountProps): ReactElement => {
    const [data, setData] = useState<IAsaasAccount>(asaasAccount ? {
        token: asaasAccount.apiKey,
        walletId: asaasAccount.walletId
    } : INITIAL_ASAAS_ACCOUNT)

    useEffect(() => {
        setData(asaasAccount ? {
            token: asaasAccount.apiKey,
            walletId: asaasAccount.walletId
        } : INITIAL_ASAAS_ACCOUNT)

        console.log(asaasAccount)
    }, [asaasAccount])
    return (
        <>
            <div className="bg-white rounded-[16px] flex flex-col pt-[30px] pb-[30px] px-[43px] w-full md:w-fit h-full md:min-w-[812px] max-lg:max-w-[100%] max-lg:w-[100%] max-lg:min-w-[100%]">
                <AtomForm
                    className="w-full"
                    onSubmit={(e): void => {
                        e.preventDefault()
                        onSubmit(type, data)
                    }}
                >
                    <AtomDivLabel className="w-full">
                        <AtomLabel>Token asaas</AtomLabel>
                        <AtomInputField
                            onChange={(token): void => {
                                setData({
                                    ...data,
                                    token
                                })
                            }}
                            className="w-full"
                            placeHolder={data.token ?? "Token asaas"}
                            value={data.token}
                            inputType="text"
                        />
                    </AtomDivLabel>
                    <AtomDivLabel className="w-full">
                        <AtomLabel>Id da carteira asaas</AtomLabel>
                        <AtomInputField
                            onChange={(walletId): void => {
                                setData({
                                    ...data,
                                    walletId
                                })
                            }}
                            className="w-full md:w-1/2"
                            placeHolder={data.walletId ?? "Id da carteira asaas"}
                            value={data.walletId}
                            inputType="text"
                        />
                    </AtomDivLabel>
                    <AtomBtn
                        className="bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 ml-auto"
                    >{type === "BIND" ? "Vincular" : "Atualizar"}</AtomBtn>
                </AtomForm>
            </div>
        </>
    )
}