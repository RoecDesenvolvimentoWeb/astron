import { AtomBtn } from "@atom/AtomBtn";
import { AtomDivLabel } from "@atom/AtomDivLabel";
import { AtomForm } from "@atom/AtomForm";
import { AtomInputField } from "@atom/AtomInputField";
import { AtomLabel } from "@atom/AtomLabel";
import { AtomSelect } from "@atom/AtomSelect";
import { ReactElement, useEffect, useState } from "react";
import { RewardTaskOut } from "resources/api/server/contracts/ServerApiModel";

interface IMolCreateUpdateGlobalRewardTaskFormProps {
    type: "create" | "update"
    data?: RewardTaskOut
    onClose: () => void
    onCreateOrUpdate: (data: RewardTaskOut) => unknown
}

const INITIAL_STATUS: RewardTaskOut = {
    active: true,
    isIndividual: false,
    taskId: 0,
    taskName: "Sua tarefa",
    taskType: "INVITE",
    clientPhone: "",
    quanty: 1,
    reward: {
        cycle: 0,
        period: "DAY"
    }
}

export const MolCreateUpdateGlobalRewardTaskForm = (props: IMolCreateUpdateGlobalRewardTaskFormProps): ReactElement => {
    const [rewardTask, setRewardTask] = useState<RewardTaskOut>(props.data ? {...props.data, isIndividual: false} : INITIAL_STATUS)
    useEffect(() => {
        setRewardTask(props.data ? {...props.data, isIndividual: false} : INITIAL_STATUS)
    }, [props.data])
    return (
        <>
            <AtomForm
                onSubmit={(e): void => {
                    e.preventDefault()
                    console.log(rewardTask)
                    props.onCreateOrUpdate(rewardTask)
                }}
                className="min-w-full gap-y-[32px]">
                <div className="w-full min-w-fit">
                    <AtomDivLabel className="w-full">
                        <AtomLabel>
                            <div className="w-full md:w-[251px] h-[11px] text-[#4F4D56] text-sm font-normal font-['Geologica'] leading-tight">Título da tarefa</div>
                        </AtomLabel>
                        <AtomInputField
                            onChange={(v): void => {
                                setRewardTask({
                                    ...rewardTask,
                                    taskName: v
                                })
                            }}
                            className="w-full"
                            placeHolder={rewardTask.taskName}
                            inputType={"text"}
                        />
                    </AtomDivLabel>
                </div>
                <div className="flex flex-col md:flex-row gap-y-[25px] md:gap-y-0 md:gap-x-[25px] w-full min-w-fit">
                    <AtomDivLabel className="w-full md:w-1/2">
                        <AtomLabel>
                            <div className="w-full md:w-[251px] h-[11px] text-[#4F4D56] text-sm font-normal font-['Geologica'] leading-tight">Tipo de tarefa</div>
                        </AtomLabel>
                        <AtomSelect
                            defaultValue={rewardTask.taskType === "PURCHASE" ? "buy" : "invite"}
                            onChange={(v): void => {
                                setRewardTask({
                                    ...rewardTask,
                                    taskType: v === "buy" ? "PURCHASE" : "INVITE"
                                })
                            }}
                            className="mt-auto"
                            options={[
                                {
                                    text: "Comprar",
                                    value: "buy"
                                },
                                {
                                    text: "Convidar",
                                    value: "invite"
                                }
                            ]}
                        />
                    </AtomDivLabel>
                    <AtomDivLabel className="w-full md:w-1/2">
                        <AtomLabel>
                            <div className="text-[#4F4D56] text-sm font-normal font-['Geologica'] leading-tight">Quantidade a ser comprado / convidado</div>
                        </AtomLabel>
                        <AtomInputField
                            onChange={(v): void => {
                                setRewardTask({
                                    ...rewardTask,
                                    quanty: Number(v)
                                })
                            }}
                            className="w-full"
                            placeHolder={rewardTask.quanty.toString()}
                            inputType={"number"}
                        />
                    </AtomDivLabel>
                </div>
                <div className="flex flex-col md:flex-row gap-y-[25px] md:gap-y-0 md:gap-x-[25px] w-full min-w-fit">
                    <AtomDivLabel className="w-full md:w-1/2">
                        <AtomLabel>
                            <div className="w-full md:w-[251px] h-[11px] text-[#4F4D56] text-sm font-normal font-['Geologica'] leading-tight">Período da recompensa</div>
                        </AtomLabel>
                        <AtomSelect
                            defaultValue={
                                rewardTask.reward.period === "DAY" ?
                                    "daily"
                                    :
                                    rewardTask.reward.period === "HOUR" ?
                                        "hour"
                                        :
                                        rewardTask.reward.period === "MONTH" ?
                                            "montly"
                                            :
                                            rewardTask.reward.period === "WEEK" ?
                                                "weekly": "yearly"
                            }
                            onChange={(v): void => {
                                setRewardTask({
                                    ...rewardTask,
                                    reward: {
                                        ...rewardTask.reward,
                                        period:
                                        v === "weekly" ?
                                            "WEEK"
                                            :
                                            v === "monthly" ?
                                                "MONTH"
                                                :
                                                v === "daily" ?
                                                    "DAY"
                                                    :
                                                    v === "yearly" ?
                                                        "YEAR"
                                                        : "HOUR"
                                    }
                                })
                            }}
                            className="mt-auto"
                            options={[
                                {
                                    text: "Semanal",
                                    value: "weekly"
                                },
                                {
                                    text: "Mensal",
                                    value: "monthly"
                                },
                                {
                                    text: "Diario",
                                    value: "daily"
                                },
                                {
                                    text: "Anual",
                                    value: "yearly"
                                },
                                {
                                    text: "Hora",
                                    value: "hour"
                                }
                            ]}
                        />
                    </AtomDivLabel>
                    <AtomDivLabel className="w-full md:w-1/2">
                        <AtomLabel>
                            <div className="text-[#4F4D56] text-sm font-normal font-['Geologica'] leading-tight">Ciclos da recompensa</div>
                        </AtomLabel>
                        <AtomInputField
                            className="w-full"
                            onChange={(v): void => {
                                setRewardTask({
                                    ...rewardTask,
                                    reward: {
                                        ...rewardTask.reward,
                                        cycle: Number(v)
                                    }
                                })
                            }}
                            placeHolder={rewardTask.reward.cycle ? rewardTask.reward.cycle.toString() : "0"}
                            inputType={"number"}
                        />
                    </AtomDivLabel>
                </div>
                <div className="flex w-full flex-col md:flex-row justify-end gap-y-[16px] md:gap-y-0 md:gap-x-[16px] !text-[#6C037D]">
                    <AtomBtn
                        btnType="submit"
                        className={"bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 w-full md:w-[270px] h-[52px]"}>
                        {props.type === "create" ? "Criar tarefa" : "Atualizar tarefa"}
                    </AtomBtn>
                    <AtomBtn
                        onClick={props.onClose}
                        btnType={"button"}
                        className="border-[1px] border-[#6C037D] w-full md:w-[219px] h-[20px] md:h-[52px] !text-[#6C037D]">Cancelar</AtomBtn>
                </div>
            </AtomForm>
        </>
    )
}