import { AtomBtn } from "@atom/AtomBtn";
import { AtomDivLabel } from "@atom/AtomDivLabel";
import { AtomForm } from "@atom/AtomForm";
import { AtomInputField } from "@atom/AtomInputField";
import { AtomLabel } from "@atom/AtomLabel";
import { AtomSelect } from "@atom/AtomSelect";
import { ReactElement, useState } from "react";

interface IFilter { botId: number | undefined, clientId: number | undefined}

interface IMolMemberFilterProps {
    bots: { botId: number, botName: string }[]
    onChange: (filter: IFilter) => unknown
}

export const MolMemberFilter = (props: IMolMemberFilterProps): ReactElement => {
    const [filter, setFilter] = useState<IFilter>({
        botId: undefined,
        clientId: undefined
    })
    return (
        <>
            <div className="pt-[36px] pb-[31px] px-[25px]">
                <AtomForm
                    onSubmit={(e): void => {
                        e.preventDefault()
                        props.onChange(filter)
                    }}
                    className="flex !flex-col md:!flex-row text-[#9EA1A2] gap-x-[24px] w-full md:w-fit items-end">
                    <AtomDivLabel className="w-full md:w-auto">
                        <AtomLabel>
                            Procure um membro por id
                        </AtomLabel>
                        <AtomInputField
                            onChange={(e): void => {
                                if (Number.isNaN(Number(e))) {
                                    setFilter({
                                        ...filter,
                                        clientId: Number(e)
                                    })
                                    return
                                }
                                setFilter({
                                    ...filter,
                                    clientId: Number(e)
                                })

                            }}
                            className="form v3 max-w-full w-full min-h-0 !h-[45px] bg-[z-index-10] text-black"
                            placeHolder={"Insira o #id"}
                            inputType={"number"}
                        />
                    </AtomDivLabel>
                    <AtomDivLabel className="w-full md:w-auto">
                        <AtomLabel>
                            Selecionar por bot
                        </AtomLabel>
                        <AtomSelect
                            onChange={(e): void => {
                                if (Number.isNaN(Number(e))) {
                                    setFilter({
                                        ...filter,
                                        botId: Number(e)
                                    })
                                    return
                                }
                                setFilter({
                                    ...filter,
                                    botId: Number(e)
                                })

                            }}
                            defaultValue={""}
                            className={
                                "v2 !w-full md:min-w-[317px] md:!w-[390px] md:max-w-[317px] !min-h-0 h-[45px]"}
                            defaultNotInteractive="Nome do bot"
                            options={props.bots.map(v => ({
                                value: v.botId,
                                text: v.botName
                            }))}
                        />
                    </AtomDivLabel>
                    <AtomBtn
                        className={"bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 px-[15px] min-h-0 h-10 w-full md:w-auto md:min-w-[140px]"}
                    >Aplicar</AtomBtn>
                </AtomForm>
            </div>
        </>
    )
}