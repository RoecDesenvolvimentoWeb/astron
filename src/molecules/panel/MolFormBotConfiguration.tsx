import { AtomBtn } from "@atom/AtomBtn";
import { AtomCheckBox } from "@atom/AtomCheckBox";
import { AtomDivLabel } from "@atom/AtomDivLabel";
import { AtomForm } from "@atom/AtomForm";
import { AtomInputField } from "@atom/AtomInputField";
import { AtomLabel } from "@atom/AtomLabel";
import { AtomLoading } from "@atom/AtomLoading";
import { ReactElement, useState } from "react";
import { IBotInfo } from "resources/api/server/contracts/ServerApiModel";
import { BotCreationOut } from "./MolFormBotCreation";

export interface BotConfigurationOut extends BotCreationOut {
    initialMessage: string
    upperMessage: string
    btnMessage: string
}

interface IMolFormBotConfigurationProps {
    botData?: IBotInfo
    currentBotId?: number
    onUpdate: (botData: BotConfigurationOut) => unknown
    onActiveBot: (status: boolean, botId?: number) => unknown
    isLoading?: boolean
}

export const MolFormBotConfiguration = ({ botData: currentBotData, onActiveBot, onUpdate, currentBotId, isLoading}: IMolFormBotConfigurationProps): ReactElement => {
    const [botData, setBotData] = useState<BotConfigurationOut>({
        name: currentBotData?.botName ?? "",
        token: currentBotData?.token ?? "",
        groupId: currentBotData?.groupId ?? 0,
        initialMessage: currentBotData?.initialMessage ?? "",
        upperMessage: currentBotData?.upperMessage ?? "",
        btnMessage: currentBotData?.btnMessage ?? "",
        emailRequired: currentBotData?.clientEmailRequired ?? true,
        cardRequired: currentBotData?.cardIsActive ?? true,
        phoneRequired: currentBotData?.clientPhoneRequired ?? true
    })
    return (
        <>
            <AtomForm
                onSubmit={(e): void => {
                    e.preventDefault()
                    onUpdate(botData)
                }}
                className={"bg-white rounded-[16px] w-full min-w-[300px] flex items-start md:items-start md:w-[703px] h-fit min-h-fit px-[28px] py-[32px]"}
            >
                <div className="top-6 right-16 absolute">
                    <AtomLoading isInView={!!isLoading}/>
                </div>
                <div className={"flex-col space-y-[20px] w-full"}>
                    <AtomDivLabel className={"gap-y-[16px] w-full"}>
                        <AtomLabel className="text-[#9EA1A2]">Nome do bot</AtomLabel>
                        <AtomInputField
                            placeHolder={botData.name}
                            className={"min-w-full"}
                            onChange={(data): void => {
                                setBotData({
                                    ...botData,
                                    name: data
                                })
                            }}
                            inputType="text"
                        />
                    </AtomDivLabel>
                    <AtomDivLabel className={"gap-y-[16px] w-full"}>
                        <AtomLabel className="text-[#9EA1A2]">Token do bot</AtomLabel>
                        <AtomInputField
                            placeHolder={botData.token}
                            className={"min-w-full"}
                            onChange={(data): void => {
                                setBotData({
                                    ...botData,
                                    token: data
                                })
                            }}
                            inputType="text"
                        />
                    </AtomDivLabel>
                    <AtomDivLabel className={"gap-y-[16px] w-full"}>
                        <AtomLabel className="text-[#9EA1A2]">Id do grupo no telegram</AtomLabel>
                        <AtomInputField
                            placeHolder={botData.groupId.toString()}
                            value={botData.groupId.toString()}
                            className={"min-w-full"}
                            onChange={(data): void => {
                                setBotData({
                                    ...botData,
                                    groupId: Number(data)
                                })
                            }}
                            inputType={"number"}
                        />
                    </AtomDivLabel>
                </div>
                <div className="py-[40px] flex flex-row gap-x-[32px]">
                    <div className="flex flex-col-reverse md:flex-row gap-y-[4px] md:gap-y-0 md:gap-x-[12px] items-start md:items-center">
                        <AtomCheckBox
                            isActive={botData.emailRequired}
                            onChange={(isActive): void => {
                                setBotData({
                                    ...botData,
                                    emailRequired: isActive
                                })
                            }}
                            version="v2"
                        />
                        <div className="text-[#9EA1A2] text-base font-light font-['Geologica'] leading-snug">Exigir e-mail</div>
                    </div>
                    <div className="flex flex-col-reverse md:flex-row gap-y-[4px] md:gap-y-0 md:gap-x-[12px] items-start md:items-center">
                        <AtomCheckBox
                            isActive={botData.phoneRequired}
                            onChange={(isActive): void => {
                                setBotData({
                                    ...botData,
                                    phoneRequired: isActive
                                })
                            }}
                            version="v2"
                        />
                        <div className="text-[#9EA1A2] text-base font-light font-['Geologica'] leading-snug">Exigir telefone</div>
                    </div>
                    <div className="flex flex-col-reverse md:flex-row gap-y-[4px] md:gap-y-0 md:gap-x-[12px] items-start md:items-center">
                        <AtomCheckBox
                            isActive={botData.cardRequired}
                            onChange={(isActive): void => {
                                setBotData({
                                    ...botData,
                                    cardRequired: isActive
                                })
                            }}
                            version="v2"
                        />
                        <div className="text-[#9EA1A2] text-base font-light font-['Geologica'] leading-snug">Exigir cartão ativo</div>
                    </div>
                </div>
                <div className="gap-y-[16px] md:gap-y-0 md:gap-x-[16px] flex flex-col md:flex-row items-start md:min-w-[400px] w-full md:!w-full md:justify-between">
                    <AtomBtn
                        btnType={"submit"}
                        className="bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 !w-full md:!w-[194px]"
                    >
                        Salvar
                    </AtomBtn>
                    <AtomBtn
                        btnType={"button"}
                        onClick={(): void => {
                            onActiveBot(!currentBotData?.isActive, currentBotId)
                        }}
                        className="!text-[#32063D] border-[#32063D] border-[1px] w-full md:!w-[194px] flex items-center justify-center gap-x-[8px] flex-row"
                    >
                        <span>{currentBotData?.isActive ? "Desligar o bot" : "Ativar o bot"}</span>
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.235 2.24761C18.667 1.05261 17.509 -0.105386 16.314 0.327614L1.70904 5.60961C0.510042 6.04361 0.365042 7.67961 1.46804 8.31861L6.13004 11.0176L10.293 6.85461C10.4816 6.67246 10.7342 6.57166 10.9964 6.57394C11.2586 6.57622 11.5095 6.68139 11.6949 6.8668C11.8803 7.0522 11.9854 7.30302 11.9877 7.56521C11.99 7.82741 11.8892 8.08001 11.707 8.26861L7.54404 12.4316L10.244 17.0936C10.882 18.1966 12.518 18.0506 12.952 16.8526L18.235 2.24761Z" fill="#61296B"/>
                        </svg>

                    </AtomBtn>
                </div>
            </AtomForm>
        </>
    )
}