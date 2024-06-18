import loginRecovery from "@asset/loginrecoveryimg.png"
import { AtomBtn } from "@atom/AtomBtn"
import { AtomCloseBtn } from "@atom/AtomCloseBtn"
import { AtomDivLabel } from "@atom/AtomDivLabel"
import { AtomForm } from "@atom/AtomForm"
import { AtomInputField } from "@atom/AtomInputField"
import { AtomLabel } from "@atom/AtomLabel"
import { ReactElement, useState } from "react"
import { ILoginCodeServerProperties } from "resources/api/server/contracts/ServerApiModel"

interface IMolUserLoginCodeProps {
    loginCode: (data: ILoginCodeServerProperties) => unknown
    onCloseCode: () => unknown
    isLoggingInWithCode: boolean
}

export const MolUserLoginCode = (props: IMolUserLoginCodeProps): ReactElement => {
    const [loginCodeData, setLoginCodeData] = useState<ILoginCodeServerProperties>({
        recaptcha: "",
        code: ""
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (props.isLoggingInWithCode) return
        props.loginCode(loginCodeData)
    }

    return (<div
        style={{
            background: "rgba(122, 122, 122, 0.40)"
        }}
        className={"w-full h-screen z-10 absolute left-0 top-0 flex items-center justify-center"}>
        <div className={"bg-white flex flex-col items-center gap-[50px] pt-24 px-[32px] pb-[32px] rounded-[16px] h-fit w-[470px] relative"}>
            <div
                className={"h-fit absolute top-0 right-0 pr-5 pt-5"}
            >
                <AtomCloseBtn
                    onClick={(): void => {
                        props.onCloseCode()
                    }}
                />
            </div>
            <div className="flex flex-col">
                <img
                    width={"352px"}
                    height={"254.058px"}
                    src={loginRecovery}/>
            </div>
            <AtomForm
                onSubmit={handleSubmit}
                className="bg-[#FEFEFE] items-center gap-[32px]"
            >
                <div className={"flex flex-col gap-[44px]"}>
                    <div className="flex flex-col gap-[24px]">
                        <AtomDivLabel
                            className={"w-full"}
                        >
                            <div>
                                <AtomLabel
                                    className={"text-[#8A8D8F]"}
                                    isRequired={false}>
                                Informe o código
                                </AtomLabel>
                                <AtomInputField
                                    onChange={(e): void => {
                                        setLoginCodeData({
                                            ...loginCodeData,
                                            code: e
                                        })
                                    }}
                                    inputType={"text"}
                                    placeHolder={"Seu código aqui"}
                                    className="w-full border-[#EFEAF0]"
                                />
                            </div>
                        </AtomDivLabel>
                    </div>
                </div>
                <AtomBtn
                    isDisable={props.isLoggingInWithCode}
                    className={"cursor-pointer w-full min-h-[52px] bg-gradient-to-r from-lilas-lv1 to-lilas-lv5"}
                >
                Entrar
                </AtomBtn>
            </AtomForm>
        </div>
    </div>)
}