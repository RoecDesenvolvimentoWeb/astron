import { MolRewardTaskViewMobile } from "@mols/panel/MolRewardTaskViewMobile";
import { ReactElement } from "react";
import { RewardTaskOut } from "resources/api/server/contracts/ServerApiModel";


interface IOrgPanelRewardTaskListProps {
    tasks: RewardTaskOut[]
    onAction: (type: "create" | "update", application: "all" | "individual", taskId: number) => unknown
    onChangeStatus: (paused: boolean, rewardTaskId: number) => unknown
    onDelete: (rewardId: number) => unknown
}


export const OrgPanelRewardTaskList = (props: IOrgPanelRewardTaskListProps): ReactElement => {
    return (
        <>
            <div className="flex flex-col w-full h-full gap-y-[20px]">
                {props.tasks.map((v, i) => {
                    const taskPeriod = v.reward.period === "MONTH" ? "Mensal"
                        :
                        v.reward.period === "DAY" ? "Diario"
                            :
                            v.reward.period === "HOUR" ? "Horas"
                                :
                                v.reward.period === "WEEK" ? "Semanal"
                                    :
                                    v.reward.period === "YEAR" ? "Anual" : ""
                    return <MolRewardTaskViewMobile
                        key={i}
                        onDelete={(): void => {
                            props.onDelete(v.taskId)
                        }}
                        onEditAction={(application): void => {
                            props.onAction("update", application, v.taskId)
                        }}
                        onChangeStatus={(s): void => {
                            props.onChangeStatus(s, v.taskId)
                        }}
                        isActive={v.active}
                        title={v.taskName}
                        application={v.isIndividual ? "individual" : "all"}
                        period={taskPeriod}
                        cycle={v.reward.cycle ?? 0}
                        taskType={v.taskType === "INVITE" ? "Convidar" : "Convidar + Comprar"}
                    />
                })}
            </div>
        </>
    )
}