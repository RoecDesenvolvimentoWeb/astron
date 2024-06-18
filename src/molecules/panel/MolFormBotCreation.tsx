import { AtomBtn } from "@atom/AtomBtn";
import { AtomCheckBox } from "@atom/AtomCheckBox";
import { AtomDivLabel } from "@atom/AtomDivLabel";
import { AtomForm } from "@atom/AtomForm";
import { AtomInputField } from "@atom/AtomInputField";
import { AtomLabel } from "@atom/AtomLabel";
import { ReactElement, useState } from "react";

export interface BotCreationOut {
    name: string;
    token: string;
    groupId: number;
    emailRequired: boolean;
    phoneRequired: boolean;
    cardRequired: boolean;
}

interface IMolFormBotCreationProps {
    onCreate: (bot: BotCreationOut) => unknown;
    onValidate: (bot: BotCreationOut) => unknown;
}

export const MolFormBotCreation = (
    props: IMolFormBotCreationProps
): ReactElement => {
    const [botData, setBotData] = useState<BotCreationOut>({
        name: "",
        token: "",
        groupId: 0,
        emailRequired: true,
        phoneRequired: true,
        cardRequired: true,
    });
    return (
        <>
            <AtomForm
                onSubmit={(e): void => {
                    e.preventDefault();
                    props.onCreate(botData);
                }}
                className={
                    "bg-white rounded-[16px] w-full min-w-[300px] flex items-start md:items-start md:w-[703px] min-h-fit h-[532px] px-[28px] py-[32px]"
                }
            >
                <div className={"flex-col space-y-[20px] w-full"}>
                    <AtomDivLabel className={"gap-y-[16px] w-full"}>
                        <AtomLabel className="text-[#9EA1A2]">Nome do bot</AtomLabel>
                        <AtomInputField
                            className={"min-w-full"}
                            onChange={(data): void => {
                                setBotData({
                                    ...botData,
                                    name: data,
                                });
                            }}
                            inputType="text"
                        />
                    </AtomDivLabel>
                    <AtomDivLabel className={"gap-y-[16px] w-full"}>
                        <AtomLabel className="text-[#9EA1A2]">Token do bot</AtomLabel>
                        <AtomInputField
                            className={"min-w-full"}
                            onChange={(data): void => {
                                setBotData({
                                    ...botData,
                                    token: data,
                                });
                            }}
                            inputType="text"
                        />
                    </AtomDivLabel>
                    <AtomDivLabel className={"gap-y-[16px] w-full"}>
                        <AtomLabel className="text-[#9EA1A2]">
              Id do grupo no telegram
                        </AtomLabel>
                        <AtomInputField
                            className={"min-w-full"}
                            onChange={(data): void => {
                                setBotData({
                                    ...botData,
                                    groupId: Number(data),
                                });
                            }}
                            inputType={"number"}
                        />
                    </AtomDivLabel>
                </div>
                <div className="py-[40px] flex flex-row gap-x-[32px]">
                    <div className="flex flex-col-reverse md:flex-row gap-y-[4px] md:gap-y-0 md:gap-x-[12px] items-start md:items-center">
                        <AtomCheckBox
                            isActive={true}
                            onChange={(isActive): void => {
                                setBotData({
                                    ...botData,
                                    emailRequired: isActive,
                                });
                            }}
                            version="v2"
                        />
                        <div className="text-[#9EA1A2] text-base font-light font-['Geologica'] leading-snug">
                        Exigir e-mail
                        </div>
                    </div>
                    <div className="flex flex-col-reverse md:flex-row gap-y-[4px] md:gap-y-0 md:gap-x-[12px] items-start md:items-center">
                        <AtomCheckBox
                            isActive={true}
                            onChange={(isActive): void => {
                                setBotData({
                                    ...botData,
                                    phoneRequired: isActive,
                                });
                            }}
                            version="v2"
                        />
                        <div className="text-[#9EA1A2] text-base font-light font-['Geologica'] leading-snug">
              Exigir telefone
                        </div>
                    </div>
                    <div className="flex flex-col-reverse md:flex-row gap-y-[4px] md:gap-y-0 md:gap-x-[12px] items-start md:items-center">
                        <AtomCheckBox
                            isActive={true}
                            onChange={(isActive): void => {
                                setBotData({
                                    ...botData,
                                    cardRequired: isActive,
                                });
                            }}
                            version="v2"
                        />
                        <div className="text-[#9EA1A2] text-base font-light font-['Geologica'] leading-snug">
              Exigir cartão ativo
                        </div>
                    </div>
                </div>
                <div className="gap-y-[16px] md:gap-y-0 md:gap-x-[16px] flex flex-col md:flex-row items-start w-full md:w-fit">
                    <AtomBtn
                        btnType={"submit"}
                        className="bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 !w-full md:w-auto"
                    >
            Criar novo bot
                    </AtomBtn>
                    <AtomBtn
                        btnType={"button"}
                        onClick={(): void => {
                            props.onValidate(botData);
                        }}
                        className="bg-[#32063D] w-full md:!w-[194px]"
                    >
            Validar
                    </AtomBtn>
                </div>
            </AtomForm>
        </>
    );
};
