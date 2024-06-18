import loginRecovery from "@asset/loginrecoveryimg.png"
import { AtomBtn } from "@atom/AtomBtn"
import { AtomCloseBtn } from "@atom/AtomCloseBtn"
import { AtomDivLabel } from "@atom/AtomDivLabel"
import { AtomForm } from "@atom/AtomForm"
import { AtomInputField } from "@atom/AtomInputField"
import { AtomLabel } from "@atom/AtomLabel"
import { ReactElement, useState } from "react"
import { ILoginRecoveryPasswordServerProperties } from "resources/api/server/contracts/ServerApiModel"

interface IMolUserLoginRecoveryProps {
    recoveryData: (data: ILoginRecoveryPasswordServerProperties) => unknown
    onCloseRecovery: () => unknown
    isRecoveringData: boolean
}

export const MolUserLoginRecovery = (props: IMolUserLoginRecoveryProps): ReactElement => {
    const [recoveryData, setRecoveryData] = useState<ILoginRecoveryPasswordServerProperties>({
        recaptcha: "",
        email: ""
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (props.isRecoveringData) return
        props.recoveryData(recoveryData)
    }

    return (<div
        style={{
            background: "rgba(122, 122, 122, 0.40)"
        }}
        className={"w-full h-screen z-10 absolute left-0 top-0 flex items-center justify-center"}>
        <div className={"bg-white flex flex-col items-center gap-[50px] pt-24 px-[32px] pb-[32px] rounded-[16px] h-fit w-full md:w-[470px] relative"}>
            <div
                className={"h-fit absolute top-0 right-0 pr-5 pt-5"}
            >
                <AtomCloseBtn
                    onClick={(): void => {
                        props.onCloseRecovery()
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
                                Informe o e-mail disponibilizado no cadastro
                                </AtomLabel>
                                <AtomInputField
                                    onChange={(e): void => {
                                        setRecoveryData({
                                            ...recoveryData,
                                            email: e
                                        })
                                    }}
                                    inputType={"email"}
                                    placeHolder={"usuario@email.com"}
                                    className="w-full border-[#EFEAF0]"
                                />
                            </div>
                        </AtomDivLabel>
                        <div className="w-full md:w-[406px] h-fit">
                            <span className="text-neutral-400 text-base font-normal font-['Geologica'] leading-snug">Para recuperarmos sua senha, </span>
                            <span className="text-neutral-600 text-base font-normal font-['Geologica'] leading-snug">enviaremos um link para o e-mail cadastrado</span>
                        </div>
                    </div>
                </div>
                <AtomBtn
                    isDisable={props.isRecoveringData}
                    className={"cursor-pointer w-full min-h-[52px] bg-gradient-to-r from-lilas-lv1 to-lilas-lv5"}
                >
                Enviar
                </AtomBtn>
            </AtomForm>
        </div>
    </div>)
}